import { useState, useEffect } from 'react';
import './Nav.css'
import {faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Nav() {

    const [toggle, setToggle] = useState(false);

    const toggleBtn = () => {
        setToggle(!toggle);
    }
    const btnDisplay = {
        display : toggle ? 'none' : 'block'
    }
    
    return(
        <div className="container-fluid menu-container">
            <a className="logo" href="#">logo</a>
            <button className='btn-menu' onClick={toggleBtn}><FontAwesomeIcon className='menu-btn' icon={faBars} /></button>
            <div style={btnDisplay} className="navlist">
                <ul className="menu-section">
                    <li className="nav-item"><a href="#">Dashboard</a></li>
                    <li className="nav-item"><a href="#">Teachers</a></li>
                    <li className="nav-item"><a href="#">Student</a></li>
                    <li className="nav-item"><a href="#">Register Teacher</a></li>
                    <li className="nav-item"><a href="#">Enroll Student</a></li>
                    <li className="nav-item"><a href="#">Attendance</a></li>
                </ul>
                <ul>
                    <li className="nav-logout"><a className='log-link' href="#">Logout</a></li>
                </ul>
            </div>
        </div>
    );
}
// Main colours
// F56314 - orange
// 002A22 - darkgreen
// Accent colours
// F5F8DE
export default Nav;