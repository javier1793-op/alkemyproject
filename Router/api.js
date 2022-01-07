const router = require('express').Router();

const apiPeliculasRouter = require('./movies/peliculas');
const apiPersRouter = require('./characters/personajes');
const apiGenRouter = require('./genero/genero');
const apiUserRouter = require('./auth/registro');
const middlawares = require('./middleware');


//rutas de movies
router.use('/movies',middlawares.checkToken,apiPeliculasRouter);

//rutas de characters
router.use('/characters',middlawares.checkToken,apiPersRouter);

//rutas de Genero
router.use('/generos',middlawares.checkToken,apiGenRouter);

//rutas de auth
router.use ('/auth', apiUserRouter);

module.exports= router;