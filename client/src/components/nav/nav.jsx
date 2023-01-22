import React from "react";
import Search from "../searchbar/searchbar";
import './nav.css';
import { Link } from "react-router-dom";

export default function Nav() {

    return (
        <div className="navbar">
            <img src="client/src/images/gradient-1.jpeg" className="logo"/>
            <Link to='/create'>
            <button className="btn-create">Create Pokemon</button>
            </Link>
        </div>
    )

}