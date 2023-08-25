import React from 'react';
import '../styling/MyDashboard.css';
import headerBackground from "../Source_images/Header-bg.png";
import logo from "../Source_images/Logo.png";

const PageHeader = () => {
    return (
        <div id="header_container">
            <img id="header_img" src={headerBackground} alt={headerBackground} />
            <p id="header_p">Dashboard</p>
            <div id="logo_img">
              <img src={logo} alt={logo} />
            </div>
         </div>
    );
}

export default PageHeader;
