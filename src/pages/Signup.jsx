import Navbar from "../components/Navbar";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

import { useEffect, useState } from "react";

import "./Signup.css";

const Signup = ({navigate, supabase}) => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
        passVerify: "",
        username: "",
    });

    const handleInfoChange = (e) => {
        const {name, value} = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        // make sure the passwords match
        if (userInfo.password !== userInfo.passVerify) {
            alert("Passwords do not match");
            return;
        }

        let user_id = await signUpUser();
        if (user_id) navigate("/home", {state: {
            user_id: user_id,
        }}); // navigate to the home page if successful
    };
    
    const signUpUser = async () => {
        // sign the user up
        let { data, error } = await supabase.auth.signUp({
            email: userInfo.email,
            password: userInfo.password,
            displayName: userInfo.username,
        })

        if (error) {
            alert("Error signing up");
            console.error(error);
            return false;
        }
        
        ({data, error} = await supabase.from('Users').insert([{
            id: data.user.id,
            username: userInfo.username,
            email: userInfo.email
        }]));
        if (error) console.log(error);
        return data.id;
    }

    return (
        <div>
            <Navbar navigate={navigate} supabase={supabase}/>
            <div className="background-pg">
                <div className="form-container">
                    <h2 className="form-title">Sign Up</h2>
                    <form> 
                        <TextInput 
                            placeholder={"Username"}
                            name={"username"}
                            value={userInfo.username}
                            handleChange={(e) => handleInfoChange(e)}/>
                        {/* <br /> */}
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
                        {/* <br /> */}
                        <TextInput 
                            placeholder={"Verify Password"}
                            name={"passVerify"}
                            type={"password"}
                            value={userInfo.passVerify}
                            handleChange={(e) => handleInfoChange(e)}/>
                        <br />

                        <Button 
                            content={"Sign Up"}
                            submit={true}
                            handleClick={(e) => handleSignUp(e)}/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;