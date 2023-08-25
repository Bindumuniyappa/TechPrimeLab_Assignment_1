import React, { useContext } from 'react';
import "../styling/NavigationFooter.css";
import headerImage from "../Source_images/Header-bg.png";
import logoutLogo from "../Source_images/Logout.png";
import { UserAuthContext } from '../Context/UserAuthContext';
import { useNavigate } from 'react-router-dom';

const NavigationFooter = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserAuthContext);

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/"), 500);
  };

  return (
    <div id="NavAndFootbar">
        <div id="Nav">
        <img id="NavAndFootbar_img" src={headerImage} alt={headerImage} />
            <div id="NavAndFootbar_div">
              <div><p id="NavAndFootbar_p">{"<  Project Listing"}</p></div>
              <div id="NavAndFootbar_logout">
                  <img onClick={handleLogout} src={logoutLogo} alt={logoutLogo} />
              </div>
            </div>
        </div>
    </div>
  );
};

export default NavigationFooter;
