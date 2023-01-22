const { Router } = require('express');
const axios = require('axios');
// const Pokemon = require('../models/Pokemon');
// const Types = require('../models/Types');
const { Pokemon, Type } = require('./../db')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

/// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {

    try {
        const ApiInfo = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const pokemonesName = ApiInfo.data.results.map(p => {
            return {
                name: p.name,
            }
        })

        const pokemonesData = await Promise.all(pokemonesName.map(async (p) => {
            const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${p.name}`);

            const pokeDetalle = {
                name: pokeData.data.name,
                id: pokeData.data.id,
                image: pokeData.data.sprites.other.home.front_default,
                hp: pokeData.data.stats[0].base_stat,
                attack: pokeData.data.stats[1].base_stat,
                defense: pokeData.data.stats[2].base_stat,
                speed: pokeData.data.stats[5].base_stat,
                peso: pokeData.data.weight,
                altura: pokeData.data.height,
                tipo: pokeData.data.types.map((t) => { return t.type.name })

            }

            return pokeDetalle;
        }));



        console.log(pokemonesData)
        return pokemonesData;

    } catch (error) {
        console.log(error);
    }

}




const getDBInfo = async () => {

    try {

        const data = await Pokemon.findAll(
            {
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            }
        )

        let dataDB = await data?.map(p => {
            return {
                id: p.id,
                name: p.name,
                hp: p.hp,
                types: p.types,
            }
        });
        return dataDB;

    } catch (error) {
        (error)
    }
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const DBInfo = await getDBInfo();
    const allInfo = DBInfo.concat(apiInfo);
    return allInfo;
};


// GET ALL ////////////
router.get('/', async (req, res) => {
    
    const pokemons = await getAllPokemons();
    res.status(200).send(pokemons);

})


//// GET POKEMON BY NAME ////////////// TERMINAR

// Del array pokemon , buscar todos los que tengan ese nombre.

// router.get('/', async (req, res) => {
//     const { name } = req.query;

//     const pokemons = await getAllPokemons();
//     const pokemonsName = pokemons.filter(p => p.name === name);
//     console.log(pokemonsName);

//     res.status(200).send(pokemonsName);

// })



async function getTypes(req, res, next) {

    try {
        const typesDB = await Type.findAll();

        if (typesDB.length) {

            const typesNames = typesDB.map(t => {
                return {
                    name: t.name,

                }
            }
            )
            return typesNames;

        } else {

            const typesApi = await axios.get("https://pokeapi.co/api/v2/type")
            
            const types = typesApi.data.results.map( t => {
                return {
                    name: t.name,
                }
            })

            Type.bulkCreate(types);
            return types;
        }

    } catch (error) {
        next(error);
    }

}

// GET TYPES
router.get('/tipos', async (req, res) => {

    const types = await getTypes();
    res.status(200).send(types);

})


//// GET BY ID ///////////////////

const getById = async (id) => {

    if (id.length !== 36) {

        const detalle = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        //console.log(detalle.data);

        const pokemonDetallado = {
            name: detalle.data.name,
            Name: detalle.data.name,
            Id: detalle.data.id,
            Image: detalle.data.sprites.other.home.front_default,
            Hp: detalle.data.stats[0].base_stat,
            Attack: detalle.data.stats[1].base_stat,
            Defense: detalle.data.stats[2].base_stat,
            Speed: detalle.data.stats[5].base_stat,
            Peso: detalle.data.weight,
            Altura: detalle.data.height,
            Tipo: detalle.data.types.map((t) => { return t.type.name })
        }

        return pokemonDetallado;

    } else {

        const pokemonByID = await Pokemon.findOne({ where: { id: id } });
        return pokemonByID;

    }

}

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const detalle = await getById(id);
    console.log(detalle);

    res.status(200).send(detalle);
})



/// POST NEW POKEMON ///////////////////////

router.post("/create", async (req, res, next) => {
    const { name, id, hp, attack, defense, speed, height, weight, types } = req.body;

    try {
        const newPokemon = await Pokemon.create({
            name,
            id,
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
