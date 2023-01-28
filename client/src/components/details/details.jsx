import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPokemonById } from "../../actions";
import './details.css';

const Details = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonById(props.match.params.id))
    }, [])

    let pokemon = useSelector((state) => state.details);
    console.log(pokemon);

    return (

        <div>
            <h3 className='name-details'>{pokemon.name}</h3>
            <div className='img-data'>
                <img src={pokemon.image} alt={pokemon.name} className="img-details" />
                <div className='data'>
                    <p>HP: {pokemon.hp}</p>
                    <p>Attack: {pokemon.attack}</p>
                    <p>Defense: {pokemon.defense}</p>
                    <p>Speed: {pokemon.speed}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Types: {pokemon.types}</p>
                </div>
            </div>
        </div>

    )

}


export default Details;