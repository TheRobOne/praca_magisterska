import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const logo = () => {
    return (
        <div className="container logo-container">
            <Link to="/">
                <img className="logo" src="http://mech.pk.edu.pl/wp-content/themes/wmpk/img/logo.png" alt="logo"/>
            </Link>
        </div>
    )
}

export default logo;
