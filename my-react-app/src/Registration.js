import { useEffect, useState } from 'react';
import './Registration.css'


function Registration() {

    // student with the highest score in rack column that will be updated every end of term
    // the rank will trigger the right value to fill other column
    const parentInfo = {firstname : "",
        lastname : "",
        address : "",
        gender : "",
        phone_number : ""
        }
    const teacherInfo = {id : "",
        firstname : "",
        lastname : "",
        dob : "",
        religion : "",
        bloodgroup : "",
        address : "",
        gender : "" }
    const studentInfo = {id : "",
        firstname : "",
        lastname : "",
        dob : "",
        religion : "",
        bloodgroup : "",
        address : "",
        gender : "",
        sclass : ""
        }

    const [selectted, setSelected] = useState("");
    const [parentValues, setParentValues] = useState(parentInfo)
    const [studentValues, setStudentValues] = useState("")
    const [teacherValues, setTeacherValues] = useState(teacherInfo)
    const regUrl = "/register-student"

    const handleSelect = (e) => {
        setSelected(e.target.value);
    }

    const handleSForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let updateStudentInfo = {...studentInfo}

  // Iterating over the entries to log them
        for (let [key, value] of formData.entries()) {
            updateStudentInfo[key] = value;
    }
    setStudentValues(updateStudentInfo)

    console.log(studentValues)
}


    useEffect(() => {
        const postInfo = async (data) => {
            try {
                const response = await fetch(`${regUrl}`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                });

                const result = await response.json();
                console.log("Success:", result);
            } catch (error) {
                console.error("Error:", error);
            }
    }
        if (studentValues.id !== "") {
            postInfo(studentValues);
            console.log("you have me")
        }
                
    console.log("i ran")
    console.log(studentValues)
}, [studentValues])
    
    
    return (
        
        <div className="container-fluid form-mg" >
            <div className="form-el">
                <form className='select-form select-el'>
                    {/* for drop down */}
                    <label htmlFor="person">Select individual</label>
                    <select name="person" id="person" onChange={handleSelect}>
                    <option defaultValue="Select"></option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    </select> 
                </form>
                {/* student form */}
                <form method='post' onSubmit={handleSForm} className={selectted === "student" ? "student" : "not-active"}>
                <div className="form-t">
                    <div className="first-form">
                    <label htmlFor="id">id:</label><br />
                    <input type="text"  name="id" id="" /><br />
                    <label htmlFor="firstname">firstname:</label><br />
                    <input type="text" name="firstname" id="firstname" /><br />
                    <label htmlFor="lastname">Lastname:</label><br />
                    <input type="text" name="lastname" id="lastname" /><br />
                    <label htmlFor="dob">Date of Birth:</label><br />
                    <input type="text" name="dob" id="dob" /><br />
                    <label htmlFor="id">Religion:</label><br />
                    <input type="text" name="religion" id="religion" /><br />
                    </div>
                    <div className="second-form">
                        <label htmlFor="bloodgroup">bloodgroup:</label><br />
                        <input type="text" name="bloodgroup" id="religion" /><br />
                        <label htmlFor="address">address:</label><br />
                        <input type="text" name="address" id="address" /><br />
                        <label htmlFor="gender">gender:</label><br />
                        <input type="text" name="gender" id="gender" /><br />
                        <label htmlFor="class">Class</label><br />
                        <input type="text" name="sclass" id="class" />
                    </div>
                    </div>
                    <button className="btn-submit" type="submit" name="class" id="class" > Register</button>
                </form>
                {/* parent form */}
                <form method="post" onSubmit={handleSForm} className= {selectted === "parent" ? "parent" : "not-active"}>
                <div className="form-t">
                    <div className="parent-form1">
                        <label htmlFor="id">id:</label><br /> 
                        <input type="text" name="id" id="id" /><br />
                        <label htmlFor="firssname"> firstname:</label> <br />
                        <input type="text" name="fname" id="fname" /><br />
                        <label htmlFor="lname">Lastname:</label> <br />
                        <input type="text" name="lname" id="lname" /><br />
                    </div>
                    <div className="parent-form2">
                        <label htmlFor="id">Religion:</label><br />
                        <input type="text" name="religion" id="religion" /><br />
                        <label htmlFor="address">address:</label> <br />
                        <input type="text" name="address" id="address" /><br />
                        <label htmlFor="gender">gender:</label> <br />
                        <input type="text" name="gender" id="gender" />
                    </div>
                    </div>
                    <button className="btn-submit" type="submit" name="class" id="class"> Register</button>
                </form>
              {/* teachers form */}

                <form method="post" className={selectted === "teacher" ? "teacher" : "not-active"}>
                    <div className="form-t">  
                    <div className="parent-form1">
                        <label htmlFor="id">id:</label> <br />
                        <input type="text" name="id" id="id" /><br />
                        <label htmlFor="fname">firstname:</label><br />
                        <input type="text" name="fname" id="fname" /><br />
                        <label htmlFor="lname">Lastname:</label><br />
                        <input type="text" name="lname" id="lname" /><br />
                        <label htmlFor="dob">Date of Birth:</label>
                        <input type="text" name="dob" id="dob" /><br />
                    </div>
                    <div className="parent-form2">
                        <label htmlFor="id">Religion:</label><br />
                        <input type="text" name="religion" id="religion" /><br />
                        <label htmlFor="bloodgroup">bloodgroup:</label><br />
                        <input type="text" name="address" id="religion" /><br />
                        <label htmlFor="address">address:</label><br />
                        <input type="text" name="address" id="address" /><br />
                        <label htmlFor="gender">gender:</label><br />
                        <input type="text" name="gender" id="gender" />
                    </div>
                    </div>
                    <button className="btn-submit" type="submit" name="class" id="class"> Register</button>
                </form>
            </div>
        </div>
        
    )
}

export default Registration;