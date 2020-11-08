import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Hero extends Component {

    render() {
        return (
            <div className="landingHeader">
                <div className="heroTextBox">
                    <p>Welcome to KidsLearn!</p>
                    <div className="heroText">An app for teaching kids during quarantine</div>

                    <nav className="landing">
                        <NavLink className="btn btnFull" to="/login">Login</NavLink>
                        <NavLink className="btn btnFull" to="/register">Sign Up</NavLink>
                    </nav>
                </div>
            </div>
        );
    }

}

export default Hero;