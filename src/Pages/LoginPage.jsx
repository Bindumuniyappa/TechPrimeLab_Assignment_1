import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import "../styling/LoginStyle.css";
import psw_eye from "../Source_images/hide-password.png"
import LogoImg from "../Source_images/Logo.png";
import LoginBgImg from "../Source_images/login-bg-1.png"
import {UserAuthContext} from "../Context/UserAuthContext"; 

const LoginPage = () => {
  const initialValues = {
    emailAddress: "",
    userPassword: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState(initialValues);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const { isUserLoggedIn, loginUser, logoutUser } = useContext(UserAuthContext);
  const navigateToDashboard = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (userCredentials.emailAddress === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (userCredentials.userPassword === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (userCredentials.emailAddress !== "" && userCredentials.userPassword !== "") {
      try {
        const response = await axios.post("http://localhost:8080/login", userCredentials);
        console.log(response.data);
        if (response.data.Message === "Invalid Response") {
          setInvalidLogin(true);
        } else if (response.data.Message === "Valid Response") {
          setInvalidLogin(false);
          loginUser(response.data.Message);
          localStorage.setItem("msg", response.data.Message);
          setTimeout(() => navigateToDashboard("/dashboard"), 1000);
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };


  return ( 
    <>
    <div className='Login_Container'>
      <div className='Image-Container'>
        <img src={LoginBgImg} alt='LoginBgImg' className='LoginBgImage'/>
        <div className='Login_Footer'></div>
      </div>
      <div className='LogoImgContainer'>
        <img src={LogoImg} alt='Logoimg' className='LogoImg'/>
        <p className='Project_title'>Online Project Management</p>
      </div>
      <div className='login_card'>
        <form onSubmit={handleFormSubmit} >
        <p className='loginCard_title'>Login to get started</p>
        <div>
        <p className='input_label'>Email</p>
        <input placeholder='user@gmail.com' onChange={handleInputChange} name='email' type='email'/>
        </div>
        {emailError?<p className="err1">email is required</p>:null}
        <div className="input-container">
          <p className='input_label'>Password</p>
          <div className="input-with-image">
          <input type={showPassword ? 'text' : 'password'} name='password' placeholder='password' onChange={handleInputChange}/>
          <img onClick={() =>setShowPassword((showPassword) => !showPassword)}src={psw_eye} alt='psw_eye' className="input-image"/>
          </div>
        </div>
         {passwordError?<p className="err">password is required</p>:<></>}
        {/* <div>
        <p className='input_label'>Password</p>
        <input type='password' name='password' placeholder='password' onChange={handleInputChange}/>
        <img src={psw_eye} alt='psw_eye'/>
        </div> */}
        <p className='Forgot_pwd'>forgot password ?</p>
        <button type='submit'>login</button>
        </form>
      </div>
      <div className='Invalid_div'>
        {!invalidLogin?<p>Invalid credentials</p>:null}
      </div>
    </div>
    </>
  )
};

export default LoginPage;