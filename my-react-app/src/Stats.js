import { useState, useEffect } from 'react';
import './Stat.css'
import {faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Stats () {
    return (
        <div className="container-fluid total-stats">
            <div className="row">
                <div className="col-sm-6 col-md-4 col-3">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <div className="stus-stat">
                        <p>Students</p>
                        <p>12478</p>
                    </div>
                </div>
                
                <div className="col-sm-6 col-md-4 col-3">
                    <FontAwesomeIcon icon={faChalkboardUser} />
                    <div className="teacher-stat">
                        <p>Teachers</p>
                        <p>11005</p>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4 col-3">
                    
                </div>
                <div className="col-sm-6 col-md-4 col-3">
                    
                </div>
            </div>
            
        </div>
    )
}