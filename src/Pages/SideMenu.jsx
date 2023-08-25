import React, { useContext } from 'react';
import "../styling/MyDashboard.css";
import activeIcon from "../Source_images/Dashboard-active.png";
import unactiveIcon from "../Source_images/Dashboard.png";
import activeProjectListIcon from "../Source_images/Project-list-active.png";
import unactiveProjectListIcon from "../Source_images/Project-list.png";
import activeCreateProjectIcon from "../Source_images/create-project-active.png";
import unactiveCreateProjectIcon from "../Source_images/create-project.png";
import logoutIcon from "../Source_images/Logout.png";
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../Context/UserAuthContext';

const SideMenu = ({ pathname }) => {
    const navigate = useNavigate();
    const { logout } = useContext(UserAuthContext);

    const redirectDashboard = () => {
        setTimeout(() => navigate("/dashboard"), 500);
    }

    const redirectProjectList = () => {
        setTimeout(() => navigate("/projectlist"), 500);
    }

    const redirectCreateProject = () => {
        setTimeout(() => navigate("/createproject"), 500);
    }

    const redirectLogout = () => {
        logout();
        setTimeout(() => navigate("/"), 500);
    }

    return (
        <div id="sidebar">
            <div id="sidebar_menu">
                <div className='sidebar_menu_item'>
                    {pathname === "/dashboard" ?
                        <img onClick={redirectDashboard} src={activeIcon} alt="Active Dashboard Icon" />
                        :
                        <img onClick={redirectDashboard} src={unactiveIcon} alt="Inactive Dashboard Icon" />
                    }
                </div>
                <div className='sidebar_menu_item'>
                    {pathname === "/projectlist" ?
                        <img onClick={redirectProjectList} src={activeProjectListIcon} alt="Active Project List Icon" />
                        :
                        <img onClick={redirectProjectList} src={unactiveProjectListIcon} alt="Inactive Project List Icon" />
                    }
                </div>
                <div className='sidebar_menu_item'>
                    {pathname === "/createproject" ?
                        <img onClick={redirectCreateProject} src={activeCreateProjectIcon} alt="Active Create Project Icon" />
                        :
                        <img onClick={redirectCreateProject} src={unactiveCreateProjectIcon} alt="Inactive Create Project Icon" />
                    }
                </div>
            </div>
            <div id="sidebar_logout">
                <img onClick={redirectLogout} src={logoutIcon} alt="Logout Icon" />
            </div>
        </div>
    );
}

export default SideMenu;
