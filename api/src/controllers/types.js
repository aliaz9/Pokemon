const axios = require('axios');
const {Type} = require('../db');

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

module.exports = {
    getTypes,
};

