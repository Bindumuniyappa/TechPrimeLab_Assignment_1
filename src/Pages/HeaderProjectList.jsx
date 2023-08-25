import React from 'react';
import headerBackground from "../Source_images/Header-bg.png";
import logo from "../Source_images/Logo.png";
import "../styling/ProjectListing.css";

const HeaderProjectListing = () => {
  return (
     <div id="header_container">
            <img id="header_img" src={headerBackground} alt={headerBackground} />
            <p id="headerProjectL_p">{"<  Project Listing"}</p>
            <div id="logo_img">
              <img src={logo} alt={logo} />
            </div>
         </div>
  );
}

export default HeaderProjectListing;
