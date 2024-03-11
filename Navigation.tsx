import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function Navigation(){
    return(
        <nav>
            <ul>
                <li><NavLink to="/home">Hem</NavLink></li>
                <li><NavLink to="/postReviewFetch">Skapa Recension</NavLink></li>
                <li><NavLink to="/profile">Profil</NavLink></li>
                <li><NavLink to="/adminPage">Admin-Panel</NavLink></li>
            </ul>
        </nav>
    );
}

export default  Navigation;