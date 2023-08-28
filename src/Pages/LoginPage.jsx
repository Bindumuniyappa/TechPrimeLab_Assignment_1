import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import "../styling/LoginStyle.css";
import psw_eye from "../Source_images/hide-password.png"
import LogoImg from "../Source_images/Logo.png";
import LoginBgImg from "../Source_images/login-bg-1.png"
import {UserAuthContext} from "../Context/UserAuthContext"; 

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState(initialValues);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const {  loginUser } = useContext(UserAuthContext);
  const navigateToDashboard = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (userCredentials.email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (userCredentials.password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (userCredentials.email !== "" && userCredentials.password !== "") {
      try {
        const response = await axios.post("http://localhost:3000/login", userCredentials);
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
    <div id="login_page">
      <div id="login_div">
       <div className="banner_div">
        <img id="banner_img" src={LoginBgImg} alt={LoginBgImg} />
        <img  id="banner_img_small" src={LogoImg} alt={LogoImg} />
       </div>
       <div id="logo_img1">
        <img src={LogoImg} alt={LogoImg} />
        <p >Online Project Management</p>
       </div>
       <div id="login">
         <form onSubmit={handleFormSubmit}>
          <p id="login_title">Login to get started</p>
          <div className='label'>
          <p >Email</p>
          <input className='input' type="email" name="email"  onChange={handleInputChange} />
          </div>
          {emailError?<p className="err1">email is required</p>:<></>}
          <div className='label'>
          <p >Password</p>
          <div id="password_div">
          <input className='pass' type={showPassword ? 'text' : 'password'} name="password" onChange={handleInputChange} /> 
          <img onClick={() =>setShowPassword((showPassword) => !showPassword)} src={psw_eye} alt={psw_eye} /> 
          </div>
          {passwordError?<p className="err">password is required</p>:<></>}
          <p id="forgot">Forgot password ?</p>
          {invalidLogin?<p id="invalid">Invalid credentials</p>:<></>}
        </div>
        <br />
        <br />
        <div>
          <input id="submit" type="submit" value="Login" />
        </div>
      </form>
    </div>
    </div>
    <div id="extra_div">
      {invalidLogin?<p>Invalid credentials</p>:<></>}
    </div>
    </div>
    </>
  )
};

export default LoginPage;