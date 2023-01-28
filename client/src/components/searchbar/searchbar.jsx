import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getPokemonByName } from "../../actions";
import './searchbar.css';


export default function Search() {

let dispatch = useDispatch();
const [name, setName] = useState("");

function handleChange(e) {
    e.preventDefault();
   setName(e.target.value)
}

function handleSubmit(e) {
e.preventDefault();
dispatch(getPokemonByName(name))
}


return (
    <div>
      <input
      type='text'
      placeholder=""
      onChange={(e) => handleChange(e)}
      className="input" />
      <button type='submit' onClick={(e) => handleSubmit(e)} className="btn-search" >Search</button>
    
    </div>
  )

}