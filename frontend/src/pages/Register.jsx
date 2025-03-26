import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="container">
        <div className="header">
            <div className="text">Register</div>
                </div>
        <div className="inputs">
            <div className="input">
                <input type="text" placeholder="Username" />
            </div>
            <div className="input">
                <input type="email" placeholder="Email" />
            </div>
            <div className="input">
                <input type="password" placeholder="Password" />
            </div>
        </div>
        <div className="submit-container">
            <div className="submit">Register</div>
            <div className="submit">Login</div>
    </div>
    </div>
  )
}

export default Register
