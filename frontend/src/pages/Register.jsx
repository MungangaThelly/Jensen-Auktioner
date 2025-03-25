import React from "react";

const Register = () => {
  return (
    <div className="container">
        <div className="header">
            <div className="text">Register</div>
            <div className="underline"> </div>
                </div>
        <div className="inputs">
            <div className="input">
                <input type="text" />
            </div>
            <div className="input">
                <input type="email" />
            </div>
            <div className="input">
                <input type="password" />
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
