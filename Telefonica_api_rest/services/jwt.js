// Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

// Clave secreta
const secret = "CLAVE_SECRETA_del_proyecto_DE_TeleFOnicA_987987";

// Crear una función para generar tokens
const createToken = (user) => {
    
    const payload = {
        id: user._id,
        nick: user.nick,
        iat: moment().unix(), // Fecha en la que se crea el token
        exp: moment().add(30, "days").unix() // Fecha en la que expira el token
    };

    // Devolver jwt token codificado
    return jwt.encode(payload, secret);

};

module.exports = {
    secret,
    createToken
};