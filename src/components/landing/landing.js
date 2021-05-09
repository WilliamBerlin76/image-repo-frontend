import React from "react";
import landing from "./landing.module.scss"

const Landing = ({ history }) => {
    return (
        <div>
            <h1>Image Repository</h1>
            <button onClick={() => history.push('/login')}>Log in</button>
            <button onClick={() => history.push('/register')}>Register</button>
        </div>
    )
}

export default Landing;