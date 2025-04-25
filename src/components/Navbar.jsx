import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

// Temp will look the like user is alway not logged in
// will update once user auth is implemented
const Navbar = ({navigate, supabase}) => {

    return (
        <nav className="navbar row">
            <div className="nav-icon-container" onClick={() => navigate("/")}>
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/6831/6831868.png" 
                    alt="Blue D20 Icon"
                    className="navicon" />
                <h1 className="nav-title">D&D Hub</h1>
            </div>

            <div className="nav-links">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Signup</Link>
            </div>
        </nav>
    );
};

export default Navbar;