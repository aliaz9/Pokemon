import React from "react";
import './paginado.css'

export default function Paginado({ pokemonsPerPage, allPokemons, paginado, next, prev }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }




    return (
        <nav>
            <ul className="pages">
                <button className="btn-pokemon" onClick={() => prev()}>Prev</button>
                {pageNumbers && // ve si pageN tiene algo.
                    pageNumbers.map(number => (
                        <li className="number" key={number}>
                            <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                }

                {pageNumbers &&
                    <button className="btn-pokemon" onClick={() => next()}>Next</button>
                }

            </ul>
        </nav>
    )

}
