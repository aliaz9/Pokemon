const { Router } = require('express');
const router = Router();

const { getTypes } = require('../controllers/types')

// GET TYPES
router.get('/', async (req, res) => {

    const types = await getTypes();
    res.status(200).send(types);

})

module.exports = router;