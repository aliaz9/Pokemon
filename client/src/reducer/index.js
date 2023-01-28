import { GET_POKEMONS, LOADER_FALSE, LOADER_TRUE, GET_TYPES, ADD_POKEMON, FILTER_TYPE, GET_BY_NAME, FILTER_EXISTENCE, ORDER_BY_NAME, GET_POKEMON_BY_ID, ORDER_BY_ATTACK } from '../actions';

// const initialState = {
//     allPokemons: [],
//     spinnerLoader: true,
//     types: [],
// };


// function reducer(initialState = state, action) {
// ENTENDER PORQUE LO DE ARRIBA NO FUNCIONO Y LO DE ABAJO SI.
  const initialState = {
    allPokemons: [],
    spinnerLoader: true,
    types: [],
    allAllPokemons: [],
    details: {},
  };
  
  export default function reducer(state = initialState, action) {

if(action.type === GET_POKEMONS) {
    console.log("Entra en el reducer.")
    return {
        ...state,
        allPokemons: action.payload,
        allAllPokemons: action.payload,
    }
}

if(action.type === GET_BY_NAME) {
  return {
    ...state,
    allPokemons: action.payload,
  }
}

if(action.type === GET_POKEMON_BY_ID) {
return {

  ...state,
  details: action.payload,

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

  

  if(action.type === FILTER_TYPE) {
  const allAllPokemons = state.allAllPokemons;
  const pokemonsSelected = action.payload === "all"? allAllPokemons : allAllPokemons.filter(p => p.types.includes(action.payload)) 
  console.log(pokemonsSelected);

  return {
      ...state,
      allPokemons: pokemonsSelected,
    }
  }

  if(action.type === FILTER_EXISTENCE) {
   
    const allAllPokemons = state.allAllPokemons;
    const pokemonsSelected = action.payload === "created"? allAllPokemons.filter(p => p.createdInDB) : allAllPokemons.filter(p => !p.createdInDB) 

     
    console.log(pokemonsSelected);
  
    return {
        ...state,
        allPokemons: action.payload === "all"? allAllPokemons : pokemonsSelected,
      }
    }


    if (action.type === ORDER_BY_NAME) {
      //console.log('ENTRA', action.payload)
      let sortedArr = action.payload === 'asc' ? // Veo si tiene el value de ascendente.
        state.allPokemons.sort(
          function (a, b) {
          if (a.name > b.name) { return 1 }
          if (b.name > a.name) { return -1 }
          return 0;
        }) :
        state.allPokemons.sort(
          function (a, b) {
          if (a.name < b.name) { return 1 }
          if (b.name < a.name) { return -1 }
          return 0;
        }) 
      return {
        ...state,
        allPokemons: sortedArr
      }
    }


    if (action.type === ORDER_BY_ATTACK) {
      //console.log('ENTRA', action.payload)
      let ordered = action.payload === 'desc' ? // Veo si tiene el value de ascendente.
        state.allPokemons.sort(
          function (a, b) {
          if (a.attack > b.attack) { return 1 }
          if (b.attack > a.attack) { return -1 }
          return 0;
        }) :
        state.allPokemons.sort(
          function (a, b) {
          if (a.attack < b.attack) { return 1 }
          if (b.attack < a.attack) { return -1 }
          return 0;
        }) 
      return {
        ...state,
        allPokemons: ordered
      }
    }


return state;

};