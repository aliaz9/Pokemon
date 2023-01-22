import axios from "axios";
export const GET_POKEMONS = 'GET_POKEMONS';
export const LOADER_TRUE = 'LOADER_TRUE';
export const LOADER_FALSE = 'LOADER_FALSE';
export const GET_TYPES = 'GET_TYPES';
export const ADD_POKEMON = 'ADD_POKEMON';


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
            console.log("No entro a la accion")
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
                console.log("No entro a la accion")
            }
    
        }

    

}


export function addPokemon(payload){

    try{
    return async function(dispatch){
        var json = await axios.post(`http://localhost:3001/create`, payload);
        console.log('el json en actions', json)
        return dispatch({
            type : "ADD_POKEMON",
            payload: json.data
        })
    }
} catch(error) {
    console.log(`No entra a la accion ${error}`)
}
  };




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
  