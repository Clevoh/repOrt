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
    const [studentInfo, setStudentInfo] = useState({})

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
    
    // fetch students information as teacher logs in
    useEffect(() => {
      const fetchStudentInfo = async () => {
        try {
            // fetches fname, lname of a particular class
            response = await fetch(`/student-info/${teacherInfo["class-assigned"]}`)
            result = await response.json()
            setStudentInfo(result)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
        fetchStudentInfo();
      }
    }, [])
    

    
    return(
        <div class="container-fluid">
            <div className=" row teacher-container">
                <div className="col- 6 teacher-info">
                    <div className="infor-teach">
                        {/* {display teachers information} */}
                        {Object.keys(teacherInfo).map((key, i) => {
                            <p key={i}>{key} : {teacherInfo[key]}</p>
                        })}
                    </div>
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
        <div className="form-container">
            <form method="post" onsubmit={handleSubmit}>
            <table>
                <thead>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Present</th>
                    <th>Absent</th>
                    <th>Date</th>
                </thead>
                {/* {from the array of all students in a class display the names
                    and mark the attendance state
                }*/}
                <tbody>
                   
                {(studentInfo).map((el, i) => {
                    // studentinfo is an array of objects
                     <tr>
                        <td key={i}> <input type="text" defaultValue={el[firstname]} name="firstname" id="firstname" /></td>
                        <td key={i}><input type="text" defaultValue={el[lastname]} name="lastname" id="lastname" /></td>
                        <td key={i}><input type="radio" name="present" id="present" /></td>
                        <td key={i}><input type="radio" name="absent" id="absent" /></td>
                        <td key={i}><input type="date" defaultValue={currentDate} name="todaydate" id="todaydate" /></td>
                    </tr>
                })}
                    
                </tbody>
            </table>
            </form>
        </div>

    </div>
    )

}

export default Teacher