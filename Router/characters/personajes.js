const router = require('express').Router();

const { Personaje } = require('../../db');
const { Pelicula } = require('../../db');

//Listado de Personaje

router.get('/', async (req, res) =>{

    var pers 
    if (req.query.nombre) {
        pers = await Personaje.findAll({ where: { nombre:{[Op.substring]: req.query.nombre} } });  

    }else {
        if (req.query.edad) {
            pers = await Personaje.findAll({ where: { edad:req.query.edad } });

        }else {
            if (req.query.peso) {
                pers = await Personaje.findAll({ where: { peso: req.query.peso } });

            }else {
                if (req.query.idMovie) {
                    pers = await Personaje.findAll({ include: [{ model: Pelicula, through:{ where: { peliculaId:req.query.idMovie} } }] });  
                    pers = pers.filter(pers => pers.peliculas.length > 0 );

                } else{
                    pers = await Personaje.findAll({ attributes:['nombre', 'imagen'] });
                }
            }
        }
    }

    res.json(pers);
});

//Alta de Personaje
router.post('/', async (req, res) => {
    const pers = await Personaje.create(req.body);
    res.json(pers);
});

//Modificacion de Personaje
router.put('/:filInd', async (req, res) => {
    await Personaje.update(req.body, {
        where: { id: req.params.filInd }
    });
    res.json({ success: 'Se ha modificado exitosamente' })
});

//Eliminacion Fisica de Personaje
router.delete('/:finlId', async (req, res) => {
    await Personaje.destroy({
        where: { id: req.params.finlId }
    });
    res.json({ success: 'Se ha eliminado correctamente.' })
});


module.exports = router;