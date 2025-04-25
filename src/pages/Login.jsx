import Navbar from "../components/Navbar";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

import { useState } from "react";

import "./Login.css";

const Login = ({ navigate, supabase }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user_id = await logIn();

    // Simulate a 5-second loading period with a 1-second fade
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        if (user_id) {
          navigate("/home", {
            state: { user_id },
          });
        }
      }, 1000); // fade duration
    }, 5000); // spinner visible for 5 seconds
  };

  const logIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userInfo.email,
      password: userInfo.password,
    });

    if (error) {
      alert("Invalid login credentials");
      console.error(error);
      setUserInfo({
        email: "",
        password: "",
      });
      return false;
    }

    return data.user.id;
  };

  return (
    <div>
      <Navbar navigate={navigate} supabase={supabase} />
      <div className="background-pg">
        {loading ? (
          <div className={`spinner ${fadeOut ? "fade-out" : ""}`}></div>
        ) : (
          <div className="form-container">
            <h2 className="form-title">Log In</h2>
            <form>
              <TextInput
                placeholder={"Email"}
                name={"email"}
                type={"email"}
                value={userInfo.email}
                handleChange={handleInfoChange}
              />
              <TextInput
                placeholder={"Password"}
                name={"password"}
                type={"password"}
                value={userInfo.password}
                handleChange={handleInfoChange}
              />
              <br />
              <Button
                content={"Log In"}
                submit={true}
                handleClick={handleLogIn}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
