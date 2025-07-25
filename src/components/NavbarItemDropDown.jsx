import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavbarItemDropDown() {
    const [isOpen, setIsOpen] = useState(false);
    const { userRoles } = useAuth();

    return (
    <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" 
            onClick={() => {setIsOpen(!isOpen)}} 
            href="#"
            aria-haspopup={true}
            aria-expanded={isOpen}>Listar</a>
        {isOpen && (
        <div className="dropdown-menu show">
            {["ROLE_ADMIN", "ROLE_MANAGER"].some(role => userRoles?.includes(role)) &&  <Link className="dropdown-item" to="/userlist" onClick={() => setIsOpen(false)}>Listar usuários</Link>}
            <a className="dropdown-item" href="#" onClick={() => setIsOpen(false)}>Listar livros</a>
        </div>
        )}
    </li>
    );
};

export default NavbarItemDropDown;