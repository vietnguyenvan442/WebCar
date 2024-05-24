import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const data = {
        username,
        password,
        position: ""
    }

    const onSaveClick = () => {
        fetch(`http://localhost:8080/checkLogin`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=ISO-8859-1",
            },
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw Error(resp.statusText);
                }
                return resp.json()
            })
            .then((user) => {
                localStorage.setItem('member', JSON.stringify(user));
                // if (user.position === "admin") {
                //     navigate("/webBook/admin");
                // }
                // else {
                //     navigate("/webBook");
                // }
                navigate("/home")
            })
            .catch((err) => console.log(err))

    }


    return (
        <div className="login row">
            <p className="header">Login</p>
            <div className="login-left">
                <span>Username: </span>
                <br />
                <br />
                <span>Password: </span>
            </div>
            <div className="login-right">
                <input 
                    type="text"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <br />
                <br />
                <input 
                    type="text"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <div className="login-bottom">
                <button className="btn btn-primary" onClick={onSaveClick}>Login</button>
            </div>
        </div>
    )
}

export default Login;