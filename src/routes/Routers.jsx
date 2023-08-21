import React from 'react';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import Dashboard from "../Pages/Dashboard";
import ProjectCreation from "../Pages/ProjectCreation";
import ProjectList from "../Pages/ProjectList";

const Routers = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/projectcreation" element={<ProjectCreation/>}/>
            <Route path="/projectlist" element={<ProjectList/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}
export default Routers;