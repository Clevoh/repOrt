import { Link } from "react-router-dom"

function Notfound() {
    return (
        <div className="notfound">
            <h1> Page not found</h1>
            <Link path="/"> Go back to Login page</Link>
        </div>
    )
}

export default Notfound