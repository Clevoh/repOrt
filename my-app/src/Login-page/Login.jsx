import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import "./Login.css"
import { useNavigate } from "react-router-dom";

function Login({setIsLogged, setLoginRole}) {
    const [data, SetData] = useState({"id": "", "username": "", "role": "", "password": "" })
    const [id, setId] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate("")
    


    const handleRole = (e) => {
        setRole(['select', 'admin', 'teacher', 'parent'][e.target.value])
        console.log(role)
        console.log(e.target.value)
    }

    const handleForm = (e) => {
        e.preventDefault()
        SetData(prevData => ({...prevData, "id": id, "username": username, "role": role, "password": password }))
        console.log(data)
        // console.log("i ran")
    }

    useEffect(() => {
        console.log("i ran")
        const postInfo = async (data) => {
            // console.log("i ran")
            try {
                const response = await fetch("/login", {
                    method: "POST",
                    body: JSON.stringify(data),
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
    }, [data])

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
                    <div className="form-login">
                        <form method="post" onSubmit={handleForm} className="form-2-login">
                            <div className="form-input" >
                            <label htmlFor="id">License ID:</label> <br />
                            <input type="text" name="id" value={id} onChange={(e) => setId(e.target.value)} /><br />
                            <label htmlFor="individual"> Choose Category:</label> <br />
                            <select name="individual" id="individual" onChange={handleRole}  >
                                {['select', 'admin', 'teacher', 'parent'].map((key, i) => (<option value={i}>{key}</option> ))}
                            </select> <br />
                            <label htmlFor="username"> Username:</label><br />
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}  /><br />
                            <label htmlFor="password">Password:</label><br />
                            <input type="password" name="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)}  /><br />
                            </div>
                            <div className="login-block">
                                <button type="submit">Login</button>
                            </div>
            
                        </form>
                    </div>
                    <Link className="admin-link" to="/admin-signup">Sign up as an Admin</Link>
                </div>
            </div>
        </div>

        )
}

export default Login