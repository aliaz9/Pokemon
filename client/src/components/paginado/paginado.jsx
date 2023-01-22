import React from "react";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }



    return (
        <nav>
            <ul>
                {
                    pageNumbers?.map(n => (
                        <li>
                            <a onClick={() => paginado(n)}>{n}</a>

                        </li>
                    ))
                }

            </ul>

        </nav>

    )
}