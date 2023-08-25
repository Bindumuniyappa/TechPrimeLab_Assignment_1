import NavigationFooter from './NavigationFooter';
import Footer from './Footer';
import "../styling/MobileCreateProject.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MobileCreateProject = () => {
  const initialProject = {
    theme: "",
    reason: "",
    type: "",
    division: "",
    category: "",
    priority: "",
    department: "",
    start_date: "",
    end_date: "",
    location: ""
  };
  
const [projectData, setProjectData] = useState(initialProject);
const [isThemeValid, setIsThemeValid] = useState(false);
const [isReasonValid, setIsReasonValid] = useState(false);
const [isTypeValid, setIsTypeValid] = useState(false);
const [isDivisionValid, setIsDivisionValid] = useState(false);
const [isCategoryValid, setIsCategoryValid] = useState(false);
const [isStartDateValid, setIsStartDateValid] = useState(false);
const [isEndDateValid, setIsEndDateValid] = useState(false);
const [isPriorityValid, setIsPriorityValid] = useState(false);
const [isDepartmentValid, setIsDepartmentValid] = useState(false);
const [isLocationValid, setIsLocationValid] = useState(false);
const [checkedDate, setCheckedDate] = useState("");
const [checkedStartDate, setCheckedStartDate] = useState("");

  
  const navigate = useNavigate();
  const pathname = window.location.pathname;

      useEffect(()=>{
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const todayDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
      setCheckedStartDate(todayDate)
    },[checkedStartDate])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });

    if (e.target.name === "start_date") {
      let d=e.target.value
        let arr=d.split("-").map(Number)
        arr[2]=arr[2]+1;
        let cdate=arr.join("-")
        let rarr=cdate.split("-").map(Number)
        for(let i=0;i<rarr.length;i++){
          if(rarr[i]>9){
            continue
          }
          else{
            rarr[i]="0"+rarr[i]
          }
        }
        let a=rarr.join("-")
        
        setCheckedDate(a)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectData.theme === "") {
  setIsThemeValid(true);
} else {
  setIsThemeValid(false);
}

if (projectData.reason === "") {
  setIsReasonValid(true);
} else {
  setIsReasonValid(false);
}

if (projectData.type === "") {
  setIsTypeValid(true);
} else {
  setIsTypeValid(false);
}

if (projectData.division === "") {
  setIsDivisionValid(true);
} else {
  setIsDivisionValid(false);
}

if (projectData.category === "") {
  setIsCategoryValid(true);
} else {
  setIsCategoryValid(false);
}

if (projectData.start_date === "") {
  setIsStartDateValid(true);
} else {
  setIsStartDateValid(false);
}

if (projectData.end_date === "") {
  setIsEndDateValid(true);
} else {
  const startDate = new Date(projectData.start_date);
  const endDate = new Date(projectData.end_date);
  if (startDate < endDate) {
    setIsEndDateValid(false);
  } else {
    setIsEndDateValid(true);
  }
}

if (projectData.priority === "") {
  setIsPriorityValid(true);
} else {
  setIsPriorityValid(false);
}

if (projectData.department === "") {
  setIsDepartmentValid(true);
} else {
  setIsDepartmentValid(false);
}

if (projectData.location === "") {
  setIsLocationValid(true);
} else {
  setIsLocationValid(false);
}

if (
  !isThemeValid &&
  !isReasonValid &&
  !isTypeValid &&
  !isDivisionValid &&
  !isCategoryValid &&
  !isStartDateValid &&
  !isEndDateValid &&
  !isPriorityValid &&
  !isDepartmentValid &&
  !isLocationValid
) {
  let res = await axios.post("http://localhost:8080/createproject", projectData);
  alert(res.data.msg);
  setTimeout(() => navigate("/projectlist"), 1000);
}

    if (projectData.theme !== "" && projectData.reason !== "" && projectData.type !== "" && projectData.division !== "" && projectData.category !== "" && projectData.start_date !== "" && projectData.end_date !== "" && projectData.priority !== "" && projectData.department !== "" && projectData.location !== "") {
      try {
        const response = await axios.post("http://localhost:8080/createproject", projectData);
        alert(response.data.msg);
        setTimeout(() => navigate("/projectlist"), 1000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(239, 244, 248)" }}>
      <NavigationFooter />
      <div style={{ backgroundColor: "white" }} id="MobileCreateProject">
        <div id="Mobcreatep_child1">
                  <input  name="theme" type="text" placeholder='Enter Project Theme' onChange={handleChange} />
                  {isThemeValid?<p className='input_error'>Project theme required</p>:<></>}
                </div>  
                <div  className='Mobcreatep_child2'>
                     <p >Reason</p>
                     <select  name="reason" onChange={handleChange} >
                      <option value="">Reason</option>
                      <option value="Buisness">For Buisness</option>
                      <option value="Dealership">For Dealership</option>
                      <option value="Tranport">For Tranport</option>
                     </select>
                     {isReasonValid?<p className='input_error'>Project reason required</p>:<></>}
                </div>
                <div className='Mobcreatep_child2'>
                     <p >Type</p>
                     <select name="type" onChange={handleChange} >
                      <option value="">Type</option>
                      <option value="Internal">Internal</option>
                      <option value="Eternal">Eternal</option>
                      <option value="Vendor">Vendor</option>
                     </select>
                     {isTypeValid?<p className='input_error'>Project Type required</p>:<></>}
                </div>
                <div className='Mobcreatep_child2'>
                     <p >Division</p>
                     <select name="division" onChange={handleChange}>
                      <option value="">Division</option>
                      <option value="Filters">Filters</option>
                      <option value="Compressor">Compressor</option>
                      <option value="Pumps">Pumps</option>
                      <option value="Glass">Glass</option>
                      <option value="Water Heater">Water Heater</option>
                     </select>
                     {isDivisionValid?<p className='input_error'>Project Division required</p>:<></>}
                </div>
                <div className='Mobcreatep_child2'>
                     <p >Category</p>
                     <select name="category" onChange={handleChange} >
                      <option value="">Category</option>
                      <option value="Quality A">Quality A</option>
                      <option value="Quality B">Quality B</option>
                      <option value="Quality C">Quality C</option>
                      <option value="Quality D">Quality D</option>
                     </select>
                     {isCategoryValid?<p className='input_error'>Project Category required</p>:<></>}
                </div>
                <div className='Mobcreatep_child2'>
                     <p >Priority</p>
                     <select name="priority" onChange={handleChange} >
                      <option value="">Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                     </select>
                     {isPriorityValid?<p className='input_error'>Project Priority required</p>:<></>}
                </div>
                <div className='Mobcreatep_child2'>
                     <p >Department</p>
                     <select name="department" onChange={handleChange} >
                      <option value="">Department</option>
                      <option value="Statergy">Statergy</option>
                      <option value="Finance">Finance</option>
                      <option value="Qaulity">Qaulity</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Stores">Stores</option>
                      <option value="HR">HR</option>
                     </select>
                     {isDepartmentValid?<p className='input_error'>Project Department required</p>:<></>}
                </div>
                <div className='Mobcreatep_child2'>
                     <p >Start Date as per the Project Plan</p>
                     <input className='lable_input' onChange={handleChange} type="date" name="start_date" min={checkedStartDate} />
                     {isStartDateValid?<p className='input_error'>Project Start Date required</p>:<></>}
                </div>
                <div className='Mobcreatep_child2'>
                     <p >End Date as per the Project Plan</p>
                     <input className='lable_input'onChange={handleChange} type="date" name="end_date" min={checkedDate} />
                     {isEndDateValid?<p className='input_error'>Project End Date required</p>:<></>}
                </div>
                <div className='Mobcreatep_child2'>
                     <p >Location</p>
                     <select name="location"onChange={handleChange} >
                      <option value="">Location</option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Dilhi">Dilhi</option>
                      <option value="Bangalore">Bangalore</option>
                     </select>
                     {isLocationValid?<p className='input_error'>Project Location required</p>:<></>}
                </div>
                <div style={{width:"87%",textAlign:"right"}}>
                  <p>status :<span style={{fontWeight:"bold",marginRight:"150px"}}> Registered</span></p>
                </div>
                <div id="Mobcreatep_child2_button">
                  <button onClick={handleSubmit}>Save Project</button>
                </div>
        <Footer />
      </div>
    </div>
  );
};

export default MobileCreateProject;
