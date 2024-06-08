import {faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import "./Teacher.css"
function Teacher(props) {
    // fetch the teachers information
    // create calender component
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 
                    'Apr', 'May', 'Jun', 'Jul', 'Aug',
                    'Sep', 'Oct', 'Nov', 'Dec'
                ]
    const weekDays = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]
    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [teacherInfo, setTeacherInfo] = useState({})

    const DaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    }
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    
    const handlePrevMonth = () => {
        setCurrentMonth(currentMonth - 1)
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        }
    }
    
    const handleNextMonth = () => {
        setCurrentMonth(currentMonth + 1)
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        }
       
    }
    // make a call to
    // fetch teachers personal information according to the login response
    useEffect(() => {
      const fetchTeacherInfo = async () => {
        try {
            response = await fetch(`/teacher-dashbord/${props.userId}`)
            result = await response.json()
            setTeacherInfo(result)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
        fetchTeacherInfo();
      }
      
      
    }, [])
    
    
    return(
        <div class="container-fluid">
            <div className=" row teacher-container">
                <div className="col- 6 teacher-info">
                    <div className="infor-teach">
                        {Object.keys(teacherInfo).forEach((key, index) => {
                            <p key={index}>{key} : {teacherInfo[key]}</p>
                        })}
                    </div>
                    <p class="list-of-info">
                    </p>
                </div>
                <div class="col-6 calender-comp">
                    <button onClick={handlePrevMonth}> <FontAwesomeIcon icon={faCircleChevronLeft} /></button>
                    <button onClick={handleNextMonth}> <FontAwesomeIcon icon={faCircleChevronRight} /></button>
                    <div className="month">{monthsOfYear[currentMonth]} {currentYear}</div>
                    <table>
                        <thead>
                            <tr>
                            {weekDays.map((day, index) => (
                                <th key={index}>{day}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                                {[...Array(6)].map((_, i) => {
                                    return (<tr key = {i}> 
                                    {[...Array(7)].map((_,j) => {
                                        if (i === 0 && j < firstDay)
                                            return (<td key={j}></td>)
                                        const date = i * 7 + (j - firstDay) + 1
                                        if (date <= (DaysInMonth(currentMonth, currentYear)))
                                            {
                                                return (<td key={j}>{date}</td>)
                                            }
                                        else {
                                            return (<td key={j}></td>)
                                        }})}
                                    </tr>)
                                })}
                                
                        </tbody>
                </table>
            </div>
            
        </div>
    </div>
    )

}

export default Teacher