import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// import { filterByType } from "./actions";
// import axios from "axios";

// describe("Reducer-Actions Tests:", () => {
//   it("It should return an action with props type FILTER_POKEMONS_BY_TYPE & payload, the value is send as an argument:", () => {
//     expect(filterByType("flying")).toEqual({
//       type: "FILTER_BY_TYPE",
//       payload: "flying",
//     });
//   });

//   // it('It should return an action with the props type "FILTER_POKEMONS_BY_TYPE" & payload, the value is send as an argument:', () => {
//   //   expect(filterPokemonCreated("created")).toEqual({
//   //     type: "FILTER_POKEMONS_CREATED",
//   //     payload: "created",
//   //   });
//   // });

//   // it('It should return an action with the props type "SORT_POKEMONS_BY_STRENGTH" & payload, the value is send as an argument:', () => {
//   //   expect(sortPokemonsByStrength("asc")).toEqual({
//   //     type: "SORT_POKEMONS_BY_STRENGTH",
//   //     payload: "asc",
//   //   });
//   // });

//   // it('It should return an action with the props type "SORT_POKEMONS_ALPHABETICALLY" & payload, the value is send as an argument:', () => {
//   //   expect(sortPokemonsAlphabetically("asc")).toEqual({
//   //     type: "SORT_POKEMONS_ALPHABETICALLY",
//   //     payload: "asc",
//   //   });
//   // });
// });