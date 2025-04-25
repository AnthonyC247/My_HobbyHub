import Navbar from "../components/Navbar";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

import { useState } from "react";
import "./Signup.css";

const Signup = ({ navigate, supabase }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passVerify: "",
    username: "",
  });

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.passVerify) {
      alert("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: userInfo.email,
      password: userInfo.password,
    });

    if (error) {
      console.error("Signup error:", error);
      alert("Error signing up");
      return;
    }

    const user_id = data?.user?.id;

    // insert user profile into your custom users table
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user_id,
        email: userInfo.email,
        username: userInfo.username,
      },
    ]);

    if (insertError) {
      console.error("User profile insert error:", insertError);
      alert("User signed up, but we couldn't save their profile info.");
      return;
    }

    navigate("/home", {
      state: { user_id: user_id },
    });
  };

  return (
    <div>
      <Navbar navigate={navigate} supabase={supabase} />
      <div className="background-pg">
        <div className="form-container">
          <h2 className="form-title">Sign Up</h2>
          <form>
            <TextInput
              placeholder={"Username"}
              name={"username"}
              value={userInfo.username}
              handleChange={handleInfoChange}
            />
            <TextInput
              placeholder={"Email"}
              name={"email"}
              value={userInfo.email}
              type={"email"}
              handleChange={handleInfoChange}
            />
            <TextInput
              placeholder={"Password"}
              name={"password"}
              type={"password"}
              value={userInfo.password}
              handleChange={handleInfoChange}
            />
            <TextInput
              placeholder={"Verify Password"}
              name={"passVerify"}
              type={"password"}
              value={userInfo.passVerify}
              handleChange={handleInfoChange}
            />
            <br />
            <Button
              content={"Sign Up"}
              submit={true}
              handleClick={handleSignUp}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

