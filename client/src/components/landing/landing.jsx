import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
import logo from './../../images/pokemon-1.png'

export default function Landing() {
    return (
        <div className='landing'>
            <div className='box'>
                <h1 className='text'>Catch Your POKEMON!</h1>
                <Link to="/home">
                    <button className='button'>ENTER</button>
                </Link>
            </div>
        </div>
    )
}

