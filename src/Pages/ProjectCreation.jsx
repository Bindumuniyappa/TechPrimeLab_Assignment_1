import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import "../styling/ProjectCreation.css";
import HeaderCreateProject from './HeaderCreateProject';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MobileCreateProject from './MobileCreateProject';
import { apiUrl } from '../constant';

const ProjectCreation = () => {
    const initialProjectState = {
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

const [projectData, setProjectData] = useState(initialProjectState);
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

    useEffect(() => {
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
        if(e.target.name==="start_date"){
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
         console.log(projectData)
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
  let res = await axios.post(`${apiUrl}/createproject`, projectData);
  alert(res.data.msg);
  setTimeout(() => navigate("/projectlist"), 1000);
}
};

    return (
        <>
            <div id="create_project_project">
        <div id="create_project_project_container">  
        <div id="Dashboard_container">
          <SideMenu pathname={pathname} />
            <div id="child2">
              <HeaderCreateProject />
            <div id="create_project">
              <div id="create_project_child">
                <div id="create_project_child1">
                  <input name="theme" type="text" placeholder='Enter Project Theme' onChange={handleChange}/>
                  {isThemeValid?<p>Project theme required</p>:<></>}
                </div>
                <div id="create_project_child2">
                  <button onClick={handleSubmit}>Save Project</button>
                </div>
              </div>
              <div id='create_project_child_two'>
                <div className='label'>
                     <p>Reason</p>
                     <select name="reason" onChange={handleChange}>
                      <option value="">Reason</option>
                      <option value="Buisness">For Business</option>
                      <option value="Dealership">For Dealership</option>
                      <option value="Tranport">For Transport</option>
                      <option value="Tranport">For Personal</option>
                     </select>
                     {isReasonValid?<p className='input_error'>Project theme required</p>:<></>}
                </div>
                <div className='label'>
                     <p >Type</p>
                     <select name="type" onChange={handleChange} >
                      <option value="">Type</option>
                      <option value="Internal">Internal</option>
                      <option value="Eternal">Eternal</option>
                      <option value="Vendor">Vendor</option>
                     </select>
                     {isTypeValid?<p className='input_error'>Project Type required</p>:<></>}
                </div>
                <div className='label'>
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
                <div className='label'>
                     <p >Category</p>
                     <select name="category" onChange={handleChange} >
                      <option value="">Category</option>
                      <option value="Quality A">Quality A</option>
                      <option value="Quality B">Quality B</option>
                      <option value="Quality C">Quality C</option>
                      <option value="Quality D">Quality D</option>
                     </select>
                     {isCategoryValid?<p className='input_error'>Project Category required</p>:null}
                </div>
                <div className='label'>
                     <p >Priority</p>
                     <select name="priority" onChange={handleChange} >
                      <option value="">Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                     </select>
                     {isPriorityValid?<p className='input_error'>Project Priority required</p>:null}
                </div>
                <div className='label'>
                     <p >Department</p>
                     <select name="department" onChange={handleChange} >
                      <option value="">Department</option>
                      <option value="Statergy">Statergy</option>
                      <option value="Finance">Finance</option>
                      <option value="Qaulity">Quality</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Stores">Stores</option>
                      <option value="HR">HR</option>
                     </select>
                     {isDepartmentValid?<p className='input_error'>Project Department required</p>:null}
                </div>
                <div className='label'>
                     <p >Start Date as per the Project Plan</p>
                     <input className='lable_input' onChange={handleChange} type="date" name="start_date" min={checkedStartDate} />
                     {isStartDateValid?<p className='input_error'>Project Start Date required</p>:null}
                </div>
                <div className='label'>
                     <p >End Date as per the Project Plan</p>
                     <input className='lable_input'onChange={handleChange} type="date" name="end_date" min={checkedDate} />
                     {isEndDateValid?<p className='input_error'>Project End Date required</p>:null}
                </div>
                <div className='label'>
                     <p >Location</p>
                     <select name="location"onChange={handleChange} >
                      <option value="">Location</option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Dilhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                     </select>
                     {isLocationValid?<p className='input_error'>Project Location required</p>:null}
                </div>
              </div>
              <div style={{width:"87%",textAlign:"right",marginLeft:"15px"}}>
              <p>Status :<span style={{fontWeight:"bold",marginRight:"150px"}}> Registered</span></p>
              </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    <div id="create_p_mob">
    <MobileCreateProject />
    </div>
    </>
    );
};

export default ProjectCreation;
