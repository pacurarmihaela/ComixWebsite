import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Nav = () =>{
    return(
        < div className="navbar">
        <ul className="navList">
            <li>
                <Link to="/">HOME</Link>
            </li>
            <li>
                <Link to="/marvel">MARVEL COMIX</Link>
            </li>
            <li>
                <Link to="/dc">DC COMIX</Link>
            </li>
            <li>
                <Link to="/otherPublisher">OTHER COMIX</Link>
            </li>
            <li>
                <Link to="/chat">CHAT</Link>
            </li>
        </ul>

        </div>
    )
}

export default Nav;