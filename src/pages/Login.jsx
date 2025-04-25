import Navbar from "../components/Navbar";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

import { useState } from "react";

// import "./Signup.css";

const Login = ({navigate, supabase}) => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const handleInfoChange = (e) => {
        const {name, value} = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    }

    const handleLogIn = async (e) => {
        e.preventDefault();
        let user_id = await logIn();
        if (user_id) navigate("/home", {state: {
            user_id: user_id,
        }}); // navigate to the home page if successful
    };

    const logIn = async () => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: userInfo.email,
            password: userInfo.password,
        })

        if (error) {
            alert("Invalid login credentials");
            setUserInfo({
                email: "",
                password: "",
            });
            console.error(error);
            return false;
        }

        return data.user.id;
    };

    return (
        <div>
            <Navbar navigate={navigate} supabase={supabase}/>
            <div className="background-pg">
                <div className="form-container">
                    <h2 className="form-title">Log In</h2>
                    <form> 
                        <TextInput 
                            placeholder={"Email"}
                            name={"email"}
                            value={userInfo.email}
                            type={"email"}
                            handleChange={(e) => handleInfoChange(e)}/>
                        {/* <br /> */}
                        <TextInput 
                            placeholder={"Password"}
                            name={"password"}
                            type={"password"}
                            value={userInfo.password}
                            handleChange={(e) => handleInfoChange(e)}/>
                        <br />

                        <Button 
                            content={"Log In"}
                            submit={true}
                            handleClick={(e) => handleLogIn(e)}
                            on/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;