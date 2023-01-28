const axios = require('axios');
const {Pokemon, Type} = require('../db');

//// GET ALL ///////////////////

const getApiInfo = async () => {

    try {
        const ApiInfo = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
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
                weight: pokeData.data.weight,
                height: pokeData.data.height,
                types: pokeData.data.types.map((t) => { return t.type.name })

            }

            return pokeDetalle;
        }));


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
                name: p.name,
                id: p.id,
                image: p.image,
                hp: p.hp,
                attack: p.attack,
                defense: p.defense,
                speed: p.speed,
                weight: p.weight,
                height: p.height,
                types: p.types.map(t => t.name),
                createdInDB: p.createdInDB,
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



//// GET BY ID ///////////////////

const getById = async (id) => {

    if (id.length !== 36) {

        const detalle = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

        const pokemonDetallado = {
            name: detalle.data.name,
            id: detalle.data.id,
            image: detalle.data.sprites.other.home.front_default,
            hp: detalle.data.stats[0].base_stat,
            attack: detalle.data.stats[1].base_stat,
            defense: detalle.data.stats[2].base_stat,
            speed: detalle.data.stats[5].base_stat,
            peso: detalle.data.weight,
            altura: detalle.data.height,
            types: detalle.data.types.map((t) => { return t.type.name })
        }

        return pokemonDetallado;

    } else {

        const pokemonByID = await Pokemon.findOne({ where: { id: id } });
        return pokemonByID;

    }

}


module.exports = {
    getById,
    getApiInfo,
    getDBInfo,
    getAllPokemons
}