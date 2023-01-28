const { Router } = require('express');
const router = Router();

const typesRoutes = require('./types');
const pokemonRouter = require('./pokemon');

router.use('/tipos', typesRoutes);
router.use('/', pokemonRouter);



module.exports = router;
