import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, GET_POKEMONS, LOADER_TRUE, filterByType, GET_BY_NAME, filterByExistence, orderByName, orderByAttack } from '../../actions/index';
import Card from '../card/card';
import Nav from './../nav/nav'
import './home.css';
import Paginado from '../paginado/paginado';
import { Link } from 'react-router-dom';



export default function Home() {


    let allPoke = useSelector((state) => state.allPokemons)
    let allTypes = useSelector((state) => state.types)


    const spinnerLoader = "SPINNER";
    // const spinnerLoader = useSelector((state) => state.spinnerLoader);
    // XXXXX Crear el estado inicial.

    let dispatch = useDispatch();


    //////////PAGINADO
    // Crear un estado que setee la página actual.
    const [currentPage, setCurrentPage] = useState(1); // 1 porque siempre empezamos de la página 1.
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // Cuantas cards por página.
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // En un principio es 9
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // 0
    const currentPokemons = allPoke.slice(indexOfFirstPokemon, indexOfLastPokemon) // Esto lo traigo del useSelector.
    const [orden, setOrden] = useState('');

    // 1-----0------9
    // 2----10------20

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //////////////

    useEffect(() => {
        // dispatch(setLoaderTrue());
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])


function handleFilterType(e) {
dispatch(filterByType(e.target.value))
}

function handleFilterExistence(e) {
    dispatch(filterByExistence(e.target.value))
}

function SortByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`) // MODIFICA EL ESTADO LOCAL Y RENDERIZA.
}

function SortByAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}




    return (
        <div>
            <Nav />
<div className='allselectors'>
            <p>sort by name</p>
            <select className='select' onChange={(e) => SortByName(e)}>
                <option value="all">all</option>
                <option value="asc">ascendente</option>
                <option value="desc">descendente</option>
            </select>

            <p>sort by attack</p>
            <select className='select' onChange={(e) => SortByAttack(e)}>
                <option value="all">all</option>
                <option value="asc">ascendente</option>
                <option value="desc">descendente</option>
            </select>

            <p>filter by creation</p>
           <select className='select' onChange={(e) => handleFilterExistence(e)}>
            <option value="all">all</option>
            <option value="created">created</option>
            <option value="existing">existing</option>
           </select>

           <p>filter by type</p>
           <select className='select' onChange={(e) => handleFilterType(e)}>
            <option value="all">all</option>
          {
            allTypes.map((t) => {
               return (<option value={t.name} key={t.name}>{t.name}</option>)
            })
          }
           </select>
           </div>

            <div className='pages'>
                {
                    <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPoke.length} paginado={paginado} />
                }
            </div>

            <div className='allpokemons'>
                {currentPokemons.map(p =>
                    <Card name={p.name} key={p.id} id={p.id} image={p.image} type={p.types} className='cards' />
                )}
            </div>

        </div>

    )
}

