const jwt = require ('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {

    if(!req.headers ['user-token']){
        return res.json ({ error: 'Necesitas incluir el user-token en la cabecera'});
    }

    const userToken = req.headers['user-token'];
    let payload= {};

    try {
        payload = jwt.decode(userToken, 'no jodas');
    } catch (error) {
        return res.json({ error: 'El token es incorrecto'});  
    }

    
    next();
}

module.exports = {
    checkToken: checkToken
}