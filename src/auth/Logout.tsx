import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate= useNavigate();

    function handleLogout(){
        localStorage.clear()
        navigate('/login');
    }

    return (
       <a className="nav-link" onClick={handleLogout}>
         Log Out
       </a>
    );
}

export default Logout;