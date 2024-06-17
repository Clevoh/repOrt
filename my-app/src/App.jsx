import { Route, Routes, Navigate } from "react-router-dom"
import Admin from './Admin-page/Admin.jsx'
import Login from './Login-page/Login.jsx'
import Teacher from './Teacher-page/Teacher.jsx'
import { useState } from 'react'
import Notfound from './Notfound.jsx'
import Signup from "./Signup-page/Signup.jsx"

function App() {
    const [isLogged, setIsLogged] = useState(false)
    const [loginRole, setLoginRole] = useState("")

    return (
        <Routes>
            <Route exact path="/"  element={<Login setIsLogged={setIsLogged} setLoginRole={setLoginRole} />} />
            <Route  path="/admin" element={isLogged && loginRole === "admin" ? <Admin /> : <Navigate replace to={"/"}/>} />
            <Route path="/teacher/:userid" element={isLogged && loginRole ==="teacher" ? <Teacher /> : <Navigate replace to={"/"} />} />
            <Route path="/admin-signup" element={<Signup />} />
            <Route path="*" element={<Notfound />} />
        </Routes>
    )
   
}

export default App