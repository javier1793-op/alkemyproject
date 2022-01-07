const router = require('express').Router();
const { Op } = require("sequelize");

const { Pelicula } = require('../../db');
const { Personaje } = require('../../db');
const { Genero } = require('../../db');


//Detalle de Peliculas

router.get('/', async (req, res) =>{

    var peli 

    if (req.query.titulo) {
        peli = await Pelicula.findAll({ where: { titulo:{[Op.substring]: req.query.titulo} } });  

    } else {

        if (req.query.idGenero) {
            peli = await Pelicula.findAll({ include: [{ model: Genero, through:{ where: { generoId:req.query.idGenero} } }] });  
            peli = peli.filter(peli => peli.generos.length > 0 );

        } else{
            peli = await Pelicula.findAll({ attributes:['titulo', 'imagen', 'fecha_creacion'] });
        }
    }
   
    if (req.query.order === 'ASC'){

        peli = peli.sort((a, b) => moment(a.fecha_creacion) - moment(b.fecha_creacion));
    }else{
        if(req.query.order === 'DESC'){
            peli = peli.sort((a, b) => moment(b.fecha_creacion) - moment(a.fecha_creacion));
    
        }
    }
    
    res.json(peli);
});;


//Alta de Peliculas
router.post('/', async (req, res) => {
    const peli = await Pelicula.create(req.body);
    res.json(peli);
});

//Modificacion de Peliculas
router.put('/:filInd', async (req, res) => {
    await Pelicula.update(req.body, {
        where: { id: req.params.filInd }
    });
    res.json({ success: 'Se ha modificado exitosamente' })
});

//Eliminacion Fisica de Peliculas
router.delete('/:finlId', async (req, res) => {
    await Pelicula.destroy({
        where: { id: req.params.finlId }
    });
    res.json({ success: 'Se ha eliminado correctamente.' })
});

//busqueda por parametro

module.exports = router;