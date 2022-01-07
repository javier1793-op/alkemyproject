const Sequelize = require('sequelize');

const PersonaModel = require('./Model/personaje');
const PeliModel = require('./Model/peliculas');
const GenModel = require('./Model/generos');
const UsuarioModel = require('./Model/usuario');


const sequelize = new Sequelize('alkemy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Personaje = PersonaModel (sequelize, Sequelize);
const Pelicula = PeliModel (sequelize, Sequelize);
const Genero = GenModel (sequelize, Sequelize);
const Usuario = UsuarioModel (sequelize, Sequelize);

//Asociaciones de tablas
Genero.belongsToMany(Pelicula, { through: 'peliGenero' });
Pelicula.belongsToMany(Genero, { through: 'peliGenero' });
Personaje.belongsToMany(Pelicula, { through: 'peliPersonaje' });
Pelicula.belongsToMany(Personaje, { through: 'peliPersonaje' });


sequelize.sync({ force: false})
    .then(()=>{
        console.log('Tablas Sincronizadas')
    })

module.exports = {
    Personaje,
    Pelicula,
    Genero,
    Usuario,
}