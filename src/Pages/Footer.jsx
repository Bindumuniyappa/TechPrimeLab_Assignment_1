import React from 'react';
import '../styling/NavigationFooter.css';
import activeDashboard from "../Source_images/Dashboard-active.png";
import unactiveDashboard from "../Source_images/Dashboard.png";
import activeProjectList from "../Source_images/Project-list-active.png";
import unactiveProjectList from "../Source_images/Project-list.png";
import activeCreateProject from "../Source_images/create-project-active.png";
import unactiveCreateProject from "../Source_images/create-project.png";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const redirectDashboard = () => {
        setTimeout(() => navigate("/dashboard"), 500);
    }

    const redirectProjectList = () => {
        setTimeout(() => navigate("/projectlist"), 500);
    }

    const redirectCreateProject = () => {
        setTimeout(() => navigate("/projectcreation"), 500);
    }

    const pathname = window.location.pathname;

    return (
        <div id="footer">
            <div id="footer_child">
                <div className='footer_child_item'>
                    {pathname === "/dashboard" ? <img onClick={redirectDashboard} src={activeDashboard} alt="Active Dashboard" /> : <img onClick={redirectDashboard} src={unactiveDashboard} alt="Inactive Dashboard" />}
                </div>
                <div className='footer_child_item'>
                    {pathname === "/projectlist" ? <img onClick={redirectProjectList} src={activeProjectList} alt="Active Project List" /> : <img onClick={redirectProjectList} src={unactiveProjectList} alt="Inactive Project List" />}
                </div>
                <div className='footer_child_item'>
                    {pathname === "/projectcreation" ? <img onClick={redirectCreateProject} src={activeCreateProject} alt="Active Create Project" /> : <img onClick={redirectCreateProject} src={unactiveCreateProject} alt="Inactive Create Project" />}
                </div>
            </div>
        </div>
    );
}

export default Footer;
