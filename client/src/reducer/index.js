import { GET_POKEMONS, LOADER_FALSE, LOADER_TRUE, GET_TYPES, ADD_POKEMON } from '../actions';

const state = {
    allPokemons: [],
    spinnerLoader: true,
    types: [],
};


function reducer(state, action) {

if(action.type === GET_POKEMONS) {
    console.log("Entra en el reducer.")
    return {
        ...state,
        allPokemons: action.payload,
    }
}

if(action.type === ADD_POKEMON) {
    return {
        ...state,
    }
}

if (action.type === LOADER_TRUE) {
    return {
      ...state,
      spinnerLoader: true,
    };
  }

  if (action.type === LOADER_FALSE) {
    return {
      ...state,
      spinnerLoader: false,
    };
  }

  if (action.type === GET_TYPES) {
    return {
        ...state,
      types: action.payload,
    };
  }


return state;

};

export default reducer;