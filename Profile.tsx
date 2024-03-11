import { defer } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import Login from "./Login";

function Profile(){
   return(
    <div>
      <h2>Profil</h2>
      <li className="loginLi"><NavLink to="/Login">Logga In</NavLink></li>
      <footer>
            <p>Recensera Mera - Isac Lindberg</p>
        </footer>
    </div>
   );
}
export default Profile;