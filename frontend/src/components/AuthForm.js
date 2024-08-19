import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }

    return (

        <nav className="navbar">
            <Link to='/'>Task Manager</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>

    )

}

export default Navbar;