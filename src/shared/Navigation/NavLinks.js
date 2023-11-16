import React from "react";

import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { Authcontex } from "../hooks/auth-context";
import { useContext } from "react";

export default function NavLinks(props) {
    const auth = useContext(Authcontex);
    return (
        <ul className="nav-links">
            {!auth.islogedin &&
            <li>
                <NavLink to="/" exact>
                    Book A Doc
                </NavLink>
            </li>}
            {auth.islogedin &&
                <li>
                    <NavLink to="/clients">Clients</NavLink>
                </li>
            }
            {auth.islogedin &&
                <li>

                    <NavLink to="/onboarding">Onboarding</NavLink>
                </li>}
            {auth.islogedin &&
                <li>
                    <NavLink to="/requests">Requests</NavLink>
                </li>}
            {!auth.islogedin &&
                <li>
                    <NavLink to="/auth">Doctor log-in</NavLink>
                </li>
            }
                

            
            {auth.islogedin &&
                (<li> <button onClick={auth.logout}>Log out </button></li>)}
        </ul>
    );
}