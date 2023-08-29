import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import HeaderProjectList from './HeaderProjectList';
import axios from 'axios';
import "../styling/ProjectListing.css";
import MobileProjectList from './MobileProjectList';
import { apiUrl } from '../constant';

const fetchData = async (page) => {
  return await axios.get(`${apiUrl}/projects`);
};

const ProjectList = () => {
  const currentPath = window.location.pathname;
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage).then((response) => setProjectData(response.data));
  }, [currentPage]);

  const handleSortChange = (e) => {
    const sortBy = e.target.value;

    if (sortBy === 'priority') {
      let high=projectData.filter((el)=>{
          return el.priority==="high"
        })
        let medium=projectData.filter((el)=>{
          return el.priority==="medium"
        })
        let low=projectData.filter((el)=>{
          return el.priority==="low"
        })
        setProjectData([...high,...medium,...low])
    } else if (sortBy === 'status') {
      let registered=projectData.filter((el)=>{
          return el.status==="Registered"
        })
        let running=projectData.filter((el)=>{
          return el.status==="Running"
        })
        let closed=projectData.filter((el)=>{
          return el.status==="Closed"
        })
        let cancled=projectData.filter((el)=>{
          return el.status==="Cancled"
        })
        setProjectData([...registered,...running,...closed,...cancled])
    } else if (sortBy === 'end_date') {
      let end=projectData.filter((el)=>el.end_date).sort((a, b) => new Date(a.end_date)- new Date(b.end_date));
        setProjectData([...end])
    } else if (sortBy === 'start_date') {
      let start=projectData.filter((el)=>el.start_date).sort((a, b) => new Date(a.start_date)- new Date(b.start_date));
        setProjectData([...start])
    }
  };

  const handleFilterChange = (e) => {
    const searchValue = e.target.value;

    if (searchValue) {
      const filteredData = projectData.filter((project) =>
        Object.values(project).some((value) => value.includes(searchValue))
      );
      setProjectData(filteredData);
    } else {
      fetchData().then((response) => setProjectData(response.data));
    }
  };

  const handleCancelFilter = () => {
    setIsFilterActive(false);
    document.getElementById('filter_input').value = '';
    fetchData().then((response) => setProjectData(response.data));
  };

  const handleStart = async (projectId, page) => {
    return await axios.put(`${apiUrl}/projects/${projectId}`,{status:"Running"}).then(()=>fetchData(page).then((res)=>setProjectData(res.data)))
  };

  const handleClose = async (projectId, page) => {
    return await axios.put(`${apiUrl}/projects/${projectId}`,{status:"Closed"}).then(()=>fetchData(page).then((res)=>setProjectData(res.data)))
  };

  const handleCancel = async (projectId, page) => {
    return await axios.put(`${apiUrl}/projects/${projectId}`,{status:"Cancelled"}).then(()=>fetchData(page).then((res)=>setProjectData(res.data)))
  };

  const handleDecrementPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleIncrementPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div id="project_list">
        <div id="project_list_container">
           <div id="Dashboard_container">
             <SideMenu pathname={currentPath} />
             <div id="project_content">
               <HeaderProjectList />
               <div id="filter_sort">
                 <div id="filter_div">
                   <svg id="filter_svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                   <input onChange={handleFilterChange} type="text" id="filter_input" placeholder='Search' />
                   {isFilterActive?<button id="cancle_filter" onClick={handleCancelFilter}>X</button>:null}
                 </div>
                 <div id="sort_div">
                   <p>Sort By : </p>
                   <select onChange={handleSortChange} name="sort" id="sort">
                   <option value="">Sort</option>
                   <option value="priority">Priority</option>
                   <option value="status">Status</option>
                 <option value="start_date">State Date</option>
                 <option value="end_date">End Date</option>
                 </select>
                 </div>
               </div>
              <div id="table_div">
                <table border={1}>
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Reason</th>
                      <th>Type</th>
                      <th>Division</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Dept.</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.map((el) => (
                      <tr className="projectRow" key={el._id}>
                       <td id="them_date">{el.theme}{<br/>}{`${el.start_date} to ${el.end_date}`}</td>
                    <td>{el.reason}</td>
                    <td>{el.type}</td>
                    <td>{el.division}</td>
                    <td>{el.category}</td>
                    <td>{el.priority}</td>
                    <td>{el.department}</td>
                    <td>{el.location}</td>
                    <td>{el.status}</td>
                    <td><button onClick={()=>handleStart(el._id,currentPage)} id="start">Start</button></td>
                    <td><button onClick={()=>handleClose(el._id,currentPage)} id="close">Close</button></td>
                    <td><button onClick={()=>handleCancel(el._id,currentPage)} id="cancle">Cancel</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div id="pagination">
                <button disabled={currentPage===1} onClick={handleDecrementPage}>-</button>
                <button>{currentPage}</button>
                <button onClick={handleIncrementPage}>+</button>
              </div>
            </div>
        </div>
        </div>
    </div>
    <div id="Mobile_project_list" fetchData={fetchData}>
        <MobileProjectList />
        </div>
    </>
  );
};

export default ProjectList;
