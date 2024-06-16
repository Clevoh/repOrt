import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import "./Login.css"
import { useNavigate } from "react-router-dom";

function Login({setIsLogged, setLoginRole}) {
    const [data, SetData] = useState({"id": "", "username": "", "role": "", "password": "" })
    const [id, setId] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState()
    const navigate = useNavigate()

const handleForm = (e) => {
    e.preventDefault()
    // const formData  = new FormData(e.target)
    // for (const data of formData.entries()) {
    //     console.log(data)
    //     formInfo[data[0]] = data[1]
    // }
    SetData(...data, {"id": id, "username": username, "role": role, "password": password },)
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
            if (response.status === 200) {
                // redirect to either login page or admin page
                if (role === "admin") {
                    setIsLogged(true)
                    setLoginRole(role)
                    navigate("/admin")
                } else if (role === "teacher") {
                    setIsLogged(true)
                    setLoginRole(role)
                    navigate(`/teacher/${id}`)
                }}
            } catch (error) {
            console.log("Error:", error)
        }
    }  
    postInfo(data)
}, [])

    return (
        <div className="fluid-container login-container">
            {/* <nav className="nav-comp">
                <Link to="/login">Admin</Link>
                <Link to="/login">Teacher</Link>
            </nav> */}
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
                        <input type="text" name="id" onChange={(e) => setId(e.target.value)} value={id}/><br />
                        <label htmlFor="individual"> Choose Category:</label>
                        <select name="individual" id="individual" onChange={(e) => setRole(e.target.value)} >
                            <option value="admin"> Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="parent">Parent</option>
                        </select> <br />
                        <label htmlFor="username"> Username</label>
                        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} /><br />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} /><br />
                        </div>
                        <div className="login-block">
                            <button type="submit">Login</button>
                        </div>
        
                    </form>
                </div>
                <Link to="/admin-signup">Sign up as an Admin</Link>
            </div>
        </div>
    </div>

    )
}

export default Login