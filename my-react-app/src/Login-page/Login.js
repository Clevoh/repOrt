import { useState, useEffect } from "react"
import "./Login.css"
import Teacher from './Teacher-page/Teacher.js'

function Login() {
    const [data, SetData] = useState({})

const handleForm = (e) => {
    e.preventDefault()
    console.log(e.target)
    let formInfo = {}
    const formData  = new FormData(e.target)
    for (const data of formData.entries()) {
        console.log(data)
        formInfo[data[0]] = data[1]
    }
    SetData(formInfo)
}

useEffect(() => {
    const postInfo = async (data) => {
        try {
            const response = await fetch("/login", {
                method: "POST",
                body: JSON.stringify(data),
                credentials: "include",
                headers: {
                    "content-Type": "application/json"
                }
            })
            const result = await response.json()
            alert("Login in successful")
            if (result) {
                <Teacher userId={result} />
            }

        } catch (error) {
            console.log("Error:", error)
        }
    }  
    postInfo(data)
//   return () => {
//     second
//   }
}, [])

    return (
        <div className="fluid-container login-container">
            <div className="login-page">
            <div className="image">
                <img src={require("../images/studentwithbook.png")} alt="school" />
            </div>
        
            <div className="login-con">
                <div className="welcome-note">
                    <p>Welcome to repOrt</p>
                </div>
                <div className="form-el">
                    <form method="post" onSubmit={handleForm} className="form-2-el">
                        <div className="form-input" >
                        <label htmlFor="id">License ID</label>
                        <input type="text" name="id" /><br />
                        <label htmlFor="individual"> Choose Category:</label>
                        <select name="individual" id="individual">
                            <option value="Admin"> Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="parent">Parent</option>
                        </select> <br />
                        <label htmlFor="username"> Username</label>
                        <input type="text" name="username" /><br />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" /><br />
                        </div>
                        <div className="login-block">
                            <button type="submit">Login</button>
                        </div>
        
                    </form>
                </div>
            </div>
        </div>
    </div>

    )
}

export default Login