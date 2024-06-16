import { useState, useEffect } from "react"
import "./signup.css"

function Signup() {

    const [data, setData] = useState({"id": "",
        "firstname": "", 
        "lastname": "",
        "address": "",
        "gender": "",
        "dob": "",
        "bloogroup":"",
        "religion": "",
        "username": "",
        "password": "",
        "sclass": "" })
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

const handleForm = (e) => {
    e.preventDefault()
    setData(previousData => ({...previousData, "id": id,
        "firstname": firstname, 
        "lastname": lastname,
        "address": address,
        "gender": gender,
        "dob": dob,
        "bloodgroup": bloodgroup,
        "religion": religion,
        "username": username,
        "password": password}))
}

    useEffect(() => {

            const handlePost = async () => {
                try {
                    const response = fetch('/admin-signup', {
                        method: "POST",
                        body: JSON.stringify(data),
                        credentials: "include",
                        headers: {
                            "content-Type": "application/json"
                        }})
                } catch (error) {
                    console.log(error)
                }
            }
        
        handlePost()
    }, [data])

    return (
        <div className="container-fluid admin-signup">
        {/* {admin-form} */}
            <div className="signup-container">

            <form method="post" onSubmit={handleForm}>
                    <div className="form-t">  
                    <div className="admin-form">
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
                    <div className="admin-form2">
                        <label htmlFor="bloodgroup">bloodgroup:</label><br />
                        <input type="text" name="bloodgroup" value={bloodgroup} id="bloodgroup" onChange={(e) => setBloodgroup(e.target.value)} /><br />
                        <label htmlFor="address">address:</label><br />
                        <input type="text" name="address" value={address} id="address" onChange={(e) => setAddress(e.target.value)} /><br />
                        <label htmlFor="gender">gender:</label><br />
                        <input type="text" name="gender" value={gender} id="gender" onChange={(e) => setGender(e.target.value)} /><br />
                        <label htmlFor="class">Class</label><br />
                        <input type="text" name="sclass" id="class" value={sclass} onChange={(e) => setSclass(e.target.value)} /><br/>
                        <label htmlFor="id">Password:</label><br />
                        <input type="password" name="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} /><br />
                        </div>
                    </div>
                    <button type="submit">Signup</button>
                    </form>
                    </div>
        </div>
    )
}

export default Signup