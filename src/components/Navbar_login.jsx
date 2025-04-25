import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Button from "./Button";

// Temp will look the like user is alway not logged in
// will update once user auth is implemented
const Navbar_Login = ({navigate, supabase, userId}) => {
    const handleLogout = async () => {
        let { error } = await supabase.auth.signOut()
        if (error) {
            alert("Error logging out");
            console.error(error);
            return;
        } else {
            navigate("/");
        }
    }
    return (
        <nav className="navbar row">
            <div className="nav-icon-container" onClick={() => navigate("/home", {state: {
                user_id: userId,
            }})}>
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/6831/6831868.png" 
                    alt="Blue D20 Icon"
                    className="navicon" />
                <h1 className="nav-title">D&D Hub</h1>
            </div>

            <div className="nav-links">
                <Link to="/home" className="nav-link" state={{user_id: userId}}>Home</Link>
                <Link to="/create-post" className="nav-link" state={{user_id: userId}}>Create</Link>
                <Button
                    content={"Logout"}
                    classes={"none nav-link"}
                    handleClick={() => handleLogout()} />
            </div>
        </nav>
    );
};

export default Navbar_Login;