import {faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import "./Teacher.css"
function Teacher(props) {
    // fetch the teachers information
    // create calender component when they click on a date
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 
                    'Apr', 'May', 'Jun', 'Jul', 'Aug',
                    'Sep', 'Oct', 'Nov', 'Dec'
                ]
    const weekDays = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]
    const today = new Date()
    const currentDate = today.toISOString().split('T')[0];
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [teacherInfo, setTeacherInfo] = useState({})
    const [studentInfo, setStudentInfo] = useState([])
    const [loginResult, setLoginResult] = useState("")
    const [studentAttendance, setStudentAttendance] = useState([])

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
    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        let allStudentDetails = []
        let eachStudent = {}
        for (const [key, val] of formData) {
            // make an array with the studentdetails
            for (let i = 0; i < formData.length; i++) {
                if (i / 4 != 0) {
                    // store all the four information pertaing to each student
                    eachStudent[key] = val
                } else {
                    allStudentDetails.push(eachStudent)
                }
            }
        }
        // post student data
        const postStudentInfo = () => {
            try {
                // post fname, lname of a particular class
                response = fetch('/post-student-info', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(allStudentDetails),
                  })
                result = response.json()
                setLoginResult(result)
            } catch (error) {
                console.log(`Error: ${error}`)
            }
            postStudentInfo();
          }
    }

    // handle getting the attendance of each particular day in a month
    const handleAttendanceInfo = async (date) => {
    // fetch the information from the database according to the date passed
    // it fetches the info base on the class assigned to the teacher
    // the names of student, the attendance status of the student
        try {
            const response = await fetch(`url-studentclass-${date}`)
            const attendance = response.json()
            setStudentAttendance(attendance)
        } catch (error) {
            if (response.status === 400) {
                setStudentAttendance("No attendance to be display")
            }
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
            <div>
                <p>{loginResult}</p>
            </div>
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
                                                return (<button onClick={() => handleAttendanceInfo(date)}><td key={j}>{date}</td></button>)
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
            {/* display students assigned to teachers and allow them submit the day attendance */}
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
                        return (<tr>
                            <td key={i}> <input type="text" defaultValue={el["firstname"]} name="firstname" id="firstname" /></td>
                            <td key={i}><input type="text" defaultValue={el["lastname"]} name="lastname" id="lastname" /></td>
                            <td key={i}><input type="radio" name={`status-${i}`} id="present" value="present" /></td>
                            <td key={i}><input type="radio" name={`status-${i}`} id="absent" value='absent' checked /></td>
                            <td key={i}><input type="date" defaultValue={currentDate} name="todaydate" id="todaydate" /></td>
                        </tr>)
                    })}
        
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </form>
        </div>
            {/* {display attendance according to the date that is clicked} */}

        <div className=" row display-attendance" >
        <table>
        <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Attendance</th>
        </thead>
        <tbody>
            {
                // array of dictionary
                studentAttendance.map((el, i) => (
                    <tr>
                        <td key={i}>{el["firstname"]}</td>
                        <td key={i}>{el["lastname"]}</td>
                        <td key={i}>{e["status"]}</td>
                    </tr>
                ))
            }

        </tbody>
    </table>
            
        </div>

    </div>
    )

}

export default Teacher