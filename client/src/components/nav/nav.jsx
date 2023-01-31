import React from "react";
import Search from "../searchbar/searchbar";
import './nav.css';
import { Link } from "react-router-dom";
import logo from './../../images/pokemon-1.png'

export default function Nav() {

    return (
        <div className="navbar">
            <img src={logo} className="logo" />
            <Search />
            <Link to='/create'>
                <button className="btn-create">CREATE POKEMON</button>
            </Link>
        </div>
    )

}