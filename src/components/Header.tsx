import { NavLink } from "react-router-dom";

function Header() {
    return ( 
<nav className="navbar navbar-dark bg-dark">
    <div className="container-fluid">   
    <NavLink className="navbar-brand" to="/">
        <i className="bi bi-airplane me-2"></i>
      Fun Vacation
    </NavLink>
    
    <ul className="navbar-nav">
        <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/order">
                Order Now
            </NavLink>
        </li>
    </ul>


  </div>
</nav>
     );
}

export default Header;