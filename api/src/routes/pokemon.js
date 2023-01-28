const { Router } = require('express');
const router = Router();

const { Pokemon, Type } = require('./../db')

const axios = require('axios');
const { getById, getAllPokemons, getApiInfo, getDBInfo } = require('../controllers/pokemon')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


/// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// GET POKEMON ALL & BY NAME //////////////
router.get('/', async (req, res) => {
    const { name } = req.query;

    const pokemons = await getAllPokemons();

    if(name) {
        const byName = pokemons.filter(p => name === p.name);

        byName?
        res.status(200).send(byName):
        res.status(404).send("Pokemon no encontrado"); /// ACOMODAR ESTE ERROR PARA PASAR QUE NO HAY RESULTADOS.
    
    } else {
        res.status(200).send(pokemons);
    }

})

// async function getTypes(req, res, next) {

//     try {
//         const typesDB = await Type.findAll();

//         if (typesDB.length) {

//             const typesNames = typesDB.map(t => {
//                 return {
//                     name: t.name,

//                 }
//             }
//             )
//             return typesNames;

//         } else {

//             const typesApi = await axios.get("https://pokeapi.co/api/v2/type")
            
//             const types = typesApi.data.results.map( t => {
//                 return {
//                     name: t.name,
//                 }
//             })

//             Type.bulkCreate(types);
//             return types;
//         }

//     } catch (error) {
//         next(error);
//     }

// }



//////GET BY ID

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const detalle = await getById(id);
    console.log(detalle);

    res.status(200).send(detalle);
})



/// POST NEW POKEMON ///////////////////////

router.post("/create", async (req, res, next) => {
    const { name, id, image, hp, attack, defense, speed, height, weight, types } = req.body;

    try {
        const newPokemon = await Pokemon.create({
            name,
            id,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
        })

        // Ve si encuentra los tipos en el otro modelo types.
        let typesDB = await Type.findAll({
            where: { name: types }
        })


        newPokemon.addType(typesDB); // Esto relaciona los tipos.
        res.status(200).send(newPokemon);

    } catch (error) {
        next(error)
    }
}
)

module.exports = router;