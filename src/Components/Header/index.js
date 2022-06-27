import React from 'react';
import './style.scss';
import useCollapse from "react-collapsed";

const Header = (props, {title, description}) => {
  return (
    <div className="header">
      <img className="logo" src="/images/logo-1366@3x.png" alt="logo-1366@3x.png"/>
      <div className="avatarContainer">
        <img className="avatar" src="/images//user-286.png" alt="/user-286.png"/>
        <span className="caret-down">&#9660;</span>
      </div>
    </div>
  );
};

export default Header;
