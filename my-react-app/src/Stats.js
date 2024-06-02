import { useState, useEffect } from 'react';
import './Stat.css'
import {faGraduationCap, faPersonBreastfeeding, faChalkboardUser, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Stats () {
    return (
        <div className="container-fluid">
            <div className="row stats-block">
                <div className="col-sm-6 col-3 stud-block">
                    <FontAwesomeIcon className='fa-icon' icon={faGraduationCap} />
                    <div className="stat">
                        <p>Students</p>
                        <p>12477</p>
                    </div>
                </div>
                
                <div className="col-sm-6 col-3 teach-block">
                    <FontAwesomeIcon className='fa-icon' icon={faChalkboardUser} />
                    <div className="stat">
                        <p>Teachers</p>
                        <p>11005</p>
                    </div>
                </div>
                <div className="col-sm-6 col-3 parent-block">
                    <FontAwesomeIcon className='fa-icon' icon={faPersonBreastfeeding} />
                    <div className="stat">
                        <p>Parents</p>
                        <p>85</p>
                    </div>   
                </div>
                <div className="col-sm-6 col-3 earning">
                    <FontAwesomeIcon className='fa-icon' icon={faMoneyBill} />
                    <div className="stat">
                        <p>Earnings</p>
                        <p>$85K</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Stats;