import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, GET_POKEMONS, LOADER_TRUE } from '../../actions/index';
import { setLoaderTrue, setLoaderFalse } from '../../actions/index';
import Card from '../card/card';
import Nav from './../nav/nav'
import './home.css';
import Paginado from '../paginado/paginado';



export default function Home() {


    //let allPoke = [];
    let allPoke = useSelector((state) => state.allPokemons)


    const spinnerLoader = "SPINNER";
    // const spinnerLoader = useSelector((state) => state.spinnerLoader);
    // XXXXX Crear el estado inicial.

    let dispatch = useDispatch();


    //////////PAGINADO
    // Crear un estado que setee la página actual.
    // const [currentPage, setCurrentPage] = useState(1); // 1 porque siempre empezamos de la página 1.
    // const [pokemonsPerPage, setPokemonsPerPage] = useState(6); // Cuantas cards por página.
    // const indexOfLastPokemon = currentPage * pokemonsPerPage; // En un principio es 9
    // const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // 0
    // const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) // Esto lo traigo del useSelector.

    // 1-----0------9
    // 2----10------20

    // const paginado = (pageNumber) => {
    //     setCurrentPage(pageNumber)
    // }
    //////////////

    useEffect(() => {
        // dispatch(setLoaderTrue());
        dispatch(getPokemons())
    }, [dispatch])


    return (
        <div>
            <Nav />

            <div>
                {allPoke.map(p => {
                    return <Card name={p.name} className='cards' />
                })}
            </div>

        </div>

    )
}

