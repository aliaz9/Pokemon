import React from "react";
import './card.css';
import { Link } from "react-router-dom";

export default function Card({name, image, type, id}) {

    return(
        <div className="card">
            <Link to={`/${id}`}>
            <div className="title">{name.toUpperCase()}</div>
            </Link>
            <img src={image} className="img"/>
            <p className="data">{type.map(t => t + " ")}</p>
        </div>
    )

}