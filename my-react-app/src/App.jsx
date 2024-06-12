import { Route, Routes, Navigate } from "react-router-dom"
import Admin from './Admin-page/Admin.jsx'
import Login from './Login-page/Login.jsx'
import Teacher from './Teacher-page/Teacher.jsx'
import { useState } from 'react'
import Notfound from './Notfound.jsx'


function App() {
    const [isLogged, setIsLogged] = useState(false)
    const [loginRole, setLoginRole] = useState("")

    return (
        <Routes>
            <Route exact path="/" 
            setIsLogged={setIsLogged} 
            setLoginRole={setLoginRole} 
            element={<Login />} />
            <Route  path="/admin" element={isLogged && loginRole === "admin" ? <Admin /> : <Navigate replace to={"/"} />} />
            <Route path="/teacher/:userid" element={isLogged && loginRole ==="teacher" ? <Teacher /> : <Navigate replace to={"/"} />} />
            <Route path="*" element={<Notfound />} />
        </Routes>
    )
   
}

export default App