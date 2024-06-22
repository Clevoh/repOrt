import { useEffect, useState } from 'react';
import './Registration.css'


function Registration() {

    // student with the highest score in rack column that will be updated every end of term
    // the rank will trigger the right value to fill other column

    const [selectted, setSelected] = useState("");
    const [parentValues, setParentValues] = useState({"id": "",
                                                    "firstname": "", 
                                                    "lastname": "",
                                                    "address": "",
                                                    "gender": "",
                                                    "dob": "",
                                                    "bloogroup":"",
                                                    "religion": "",
                                                    "username": "",
                                                    "password": ""
                                                    });
    const [studentValues, setStudentValues] = useState({"id": "",
                                                    "firstname": "", 
                                                    "lastname": "",
                                                    "address": "",
                                                    "gender": "",
                                                    "dob": "",
                                                    "bloogroup":"",
                                                    "religion": "",
                                                    "username": "",
                                                    "password": "",
                                                    "sclass": ""});
    const [teacherValues, setTeacherValues] = useState({"id": "",
                                                    "firstname": "", 
                                                    "lastname": "",
                                                    "address": "",
                                                    "gender": "",
                                                    "dob": "",
                                                    "bloogroup":"",
                                                    "religion": "",
                                                    "username": "",
                                                    "password": "",
                                                    "sclass": "" });
    const [regUrl, setRegUrl] = useState()
    const [id, setId] = useState("")
    const [firstname, setFirstame] = useState("")
    const [lastname, setLastame] = useState("")
    const [dob, setDob] = useState("")
    const [religion, setReligion] = useState("")
    const [address, setAddress] = useState("")
    const [bloodgroup, setBloodgroup] = useState("")
    const [gender, setGender] = useState("")
    const [sclass, setSclass] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    
// get the selected value
    const handleSelect = (e) => {
        setSelected(e.target.value);
    }
   

    const handleForm = (e) => {
        e.preventDefault();
        // const formData = new FormData(e.target);
        // console.log(selectted)
        // console.log("i ran 1")
        // let updateInfo;

        if (selectted === "student") {
            setRegUrl("/register-student")
            setStudentValues(...studentValues, {"id": id,
                                                    "firstname": firstname, 
                                                    "lastname": lastname,
                                                    "address": address,
                                                    "gender": gender,
                                                    "dob": dob,
                                                    "bloogroup": bloodgroup,
                                                    "religion": religion,
                                                    "sclass": sclass,
                                                    "username": username,
                                                    "password": password})
        } else if (selectted === "teacher") {
            setRegUrl("/register-teacher");
            setTeacherValues(...teacherValues, {"id": id,
                                                    "firstname": firstname, 
                                                    "lastname": lastname,
                                                    "address": address,
                                                    "gender": gender,
                                                    "dob": dob,
                                                    "bloogroup": bloodgroup,
                                                    "religion": religion,
                                                    "sclass": sclass,
                                                    "username": username,
                                                    "password": password})
        } else {
            setRegUrl("/register-parent")
            setParentValues(...parentValues, {"id": id,
                                                    "firstname": firstname, 
                                                    "lastname": lastname,
                                                    "address": address,
                                                    "gender": gender,
                                                    "dob": dob,
                                                    "bloogroup": bloodgroup,
                                                    "religion": religion,
                                                    "username": username,
                                                    "password": password})
        }
       
}


    useEffect(() => {
        const postInfo = async (data) => {
            try {
                // console.log(regUrl)
                const response = await fetch(`${regUrl}`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                });
                if (response === 200 ) {
                    const result = await response.json();
                }
            } catch (error) {
                console.error("Error:", error);
            }
    }
        if (selectted === "student") {
            postInfo(studentValues);
        } else if (selectted === "teacher") {
            postInfo(teacherValues);
        } else {
            postInfo(parentValues);
        }            
}, [selectted, studentValues, parentValues, teacherValues, regUrl])
    
    
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
                <form method='post' onSubmit={handleForm} className={selectted === "student" ? "student" : "not-active"}>
                <div className="form-t">
                    <div className="first-form">
                    <label htmlFor="id">id:</label><br />
                    <input type="text"  name="id" value={id} onChange={(e) => setId(e.target.value)} /><br />
                    <label htmlFor="firstname">firstname:</label><br />
                    <input type="text" name="firstname" value={firstname} id="firstname" onChange={(e) => setFirstame(e.target.value)} /><br />
                    <label htmlFor="lastname">Lastname:</label><br />
                    <input type="text" name="lastname" value={lastname} id="lastname" onChange={(e) => setLastame(e.target.value)} /><br />
                    <label htmlFor="dob">Date of Birth:</label><br />
                    <input type="text" name="dob" value={dob} id="dob" onChange={(e) => setDob(e.target.value)} /><br />
                    <label htmlFor="id">Religion:</label><br />
                    <input type="text" name="religion" value={religion} id="religion" onChange={(e) => setReligion(e.target.value)} /><br />
                    <label htmlFor="id">username:</label><br />
                    <input type="text" name="username" value={username} id="username" onChange={(e) => setUsername(e.target.value)} /><br />
                    </div>
                    <div className="second-form">
                        <label htmlFor="bloodgroup">bloodgroup:</label><br />
                        <input type="text" name="bloodgroup" value={bloodgroup} id="bloodgroup" onChange={(e) => setBloodgroup(e.target.value)} /><br />
                        <label htmlFor="address">address:</label><br />
                        <input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} /><br />
                        <label htmlFor="gender">gender:</label><br />
                        <input type="text" name="gender" value={gender} id="gender" onChange={(e) => setGender(e.target.value)} /><br />
                        <label htmlFor="class">Class</label><br />
                        <input type="text" name="sclass" id="class" value={sclass} onChange={(e) => setSclass(e.target.value)} />
                        <label htmlFor="id">Password:</label><br />
                        <input type="text" name="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} /><br />
                    </div>
                    </div>
                    <button className="btn-submit" type="submit" name="submit" id="submit" > Register</button>
                </form>
                {/* parent form */}
                <form method="post" onSubmit={handleForm} className= {selectted === "parent" ? "parent" : "not-active"}>
                <div className="form-t">
                    <div className="parent-form1">
                    <label htmlFor="id">id:</label><br />
                    <input type="text"  name="id" value={id} onChange={(e) => setId(e.target.value)} /><br />
                    <label htmlFor="firstname">firstname:</label><br />
                    <input type="text" name="firstname" value={firstname} id="firstname" onChange={(e) => setFirstame(e.target.value)} /><br />
                    <label htmlFor="lastname">Lastname:</label><br />
                    <input type="text" name="lastname" value={lastname} id="lastname" onChange={(e) => setLastame(e.target.value)} /><br />
                    <label htmlFor="dob">Date of Birth:</label><br />
                    <input type="text" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} /><br />
                    <label htmlFor="id">Religion:</label><br />
                    <input type="text" name="religion" id="religion" value={religion} onChange={(e) => setReligion(e.target.value)} /><br />
                    <label htmlFor="id">username:</label><br />
                    <input type="text" name="username" value={username} id="username" onChange={(e) => setUsername(e.target.value)} /><br />
                    </div>
                    <div className="parent-form2">
                    <label htmlFor="bloodgroup">bloodgroup:</label><br />
                        <input type="text" name="bloodgroup" value={bloodgroup} id="bloodgroup" onChange={(e) => setBloodgroup(e.target.value)} /><br />
                        <label htmlFor="address">address:</label><br />
                        <input type="text" name="address" value={address} id="address" onChange={(e) => setAddress(e.target.value)} /><br />
                        <label htmlFor="gender">gender:</label><br />
                        <input type="text" name="gender" value={gender} id="gender" onChange={(e) => setGender(e.target.value)} /><br />
                        <label htmlFor="id">Password:</label><br />
                        <input type="text" name="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} /><br />
                    </div>
                    </div>
                    <button className="btn-submit" type="submit" name="class" id="class"> Register</button>
                </form>
              {/* teachers form */}

                <form method="post" onSubmit={handleForm} className={selectted === "teacher" ? "teacher" : "not-active"}>
                    <div className="form-t">  
                    <div className="teacher-form1">
                    <label htmlFor="id">id:</label><br />
                    <input type="text"  name="id" value={id} onChange={(e) => setId(e.target.value)} /><br />
                    <label htmlFor="firstname">firstname:</label><br />
                    <input type="text" name="firstname" value={firstname} id="firstname" onChange={(e) => setFirstame(e.target.value)} /><br />
                    <label htmlFor="lastname">Lastname:</label><br />
                    <input type="text" name="lastname" id="lastname" value={lastname} onChange={(e) => setLastame(e.target.value)} /><br />
                    <label htmlFor="dob">Date of Birth:</label><br />
                    <input type="text" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} /><br />
                    <label htmlFor="id">Religion:</label><br />
                    <input type="text" name="religion" id="religion" value={religion} onChange={(e) => setReligion(e.target.value)} /><br />
                    <label htmlFor="id">username:</label><br />
                    <input type="text" name="username" value={username} id="username" onChange={(e) => setUsername(e.target.value)} /><br />
                    </div>
                    <div className="teacher-form2">
                    <label htmlFor="bloodgroup">bloodgroup:</label><br />
                        <input type="text" name="bloodgroup" value={bloodgroup} id="bloodgroup" onChange={(e) => setBloodgroup(e.target.value)} /><br />
                        <label htmlFor="address">address:</label><br />
                        <input type="text" name="address" value={address} id="address" onChange={(e) => setAddress(e.target.value)} /><br />
                        <label htmlFor="gender">gender:</label><br />
                        <input type="text" name="gender" value={gender} id="gender" onChange={(e) => setGender(e.target.value)} /><br />
                        <label htmlFor="class">Class</label><br />
                        <input type="text" name="sclass" id="class" value={sclass} onChange={(e) => setSclass(e.target.value)} />
                        <label htmlFor="id">Password:</label><br />
                        <input type="text" name="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} /><br />
                    </div>
                    </div>
                    <button className="btn-submit" type="submit" name="class" id="class"> Register</button>
                </form>
            </div>
        </div>
        
    )
}

export default Registration;