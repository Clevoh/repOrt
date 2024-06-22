import { useState,  } from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'
import {faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Nav() {

    const [toggle, setToggle] = useState(false);

    const toggleBtn = () => {
        setToggle(!toggle);
    }
    const btnDisplay = {
        display : toggle ? 'block' : 'none'
    }
    
    return(
        <div className="container-fluid menu-container">
            <Link className="logo">logo</Link>
            <button className='btn-menu' onClick={toggleBtn}><FontAwesomeIcon className='menu-btn' icon={faBars} /></button>
            <div style={btnDisplay} className="navlist">
                <ul className="menu-section">
                    <li className="nav-item"><Link>Dashboard</Link></li>
                    <li className="nav-item"><Link to="" >Teachers</Link></li>
                    <li className="nav-item"><Link to="" >Students</Link></li>
                    <li className="nav-item"><Link to=""  >Register Teacher</Link></li>
                    <li className="nav-item"><Link to=""  >Enroll Student</Link></li>
                    <li className="nav-item"><Link to=""  >Attendance</Link></li>
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