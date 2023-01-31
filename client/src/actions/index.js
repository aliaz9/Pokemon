import axios from "axios";
export const GET_POKEMONS = 'GET_POKEMONS';
export const LOADER_TRUE = 'LOADER_TRUE';
export const LOADER_FALSE = 'LOADER_FALSE';
export const GET_TYPES = 'GET_TYPES';
export const ADD_POKEMON = 'ADD_POKEMON';
export const FILTER_TYPE = 'FILTER_TYPE';
export const GET_BY_NAME = 'GET_BY_NAME';
export const FILTER_EXISTENCE = 'FILTER_EXISTENCE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK';
export const FILTER_ATTACK = "FILTER_ATTACK";

export function getPokemons() {
    return async function (dispatch) {

        try {
            const json = await axios.get("http://localhost:3001/");

            return dispatch({
                type: 'GET_POKEMONS',
                payload: json.data,
            })

        } catch (error) {
            console.log(error);
        }

    }
}

export function getPokemonByName(name) {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001?name=" + name);

            return dispatch({
                type: GET_BY_NAME,
                payload: (await json).data,
            })


        } catch (error) {
            console.log(error);
        }

    }
}

export function getPokemonById(id) {
    return async function (dispatch) {

        try {

            const json = await axios.get(`http://localhost:3001/${id}`)

            return dispatch({

                type: 'GET_POKEMON_BY_ID',
                payload: json.data,

            })

        } catch (error) {
            console.log(error);
        }


    }
}



export function getTypes() {
    return async function (dispatch) {

        try {
            const json = await axios.get("http://localhost:3001/tipos");

            return dispatch({
                type: 'GET_TYPES',
                payload: json.data,
            })

        } catch (error) {
            console.log(error);
        }

    }



}


export function addPokemon(payload) {

    try {
        return async function (dispatch) {
            var json = await axios.post(`http://localhost:3001/create`, payload);
            console.log('el json en actions', json)
            return dispatch({
                type: "ADD_POKEMON",
                payload: json.data
            })
        }
    } catch (error) {
        console.log(`No entra a la accion ${error}`)
    }
};


export function filterByType(payload) {
    console.log('Entra en Actions', payload)
    return {
        type: 'FILTER_TYPE',
        payload,
    }
}


export function filterByExistence(payload) {
    return {
        type: 'FILTER_EXISTENCE',
        payload,
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload,
    }
}

export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload,
    }
}



export function setLoaderTrue() {
    return {
        type: 'LOADER_TRUE',
    };
}

export function setLoaderFalse() {
    return {
        type: 'LOADER_FALSE',
    };
}



