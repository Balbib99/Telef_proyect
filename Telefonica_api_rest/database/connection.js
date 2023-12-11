const mongoose = require("mongoose");
const { DB_HOST, DB_DATABASE, DB_PORT } = require("../config");

const connection = async() => {
    try {
        
        await mongoose.connect(`${DB_DATABASE}://${DB_HOST}:${DB_PORT}/telefonica`);

        console.log("Conectado correctamente a mi bd: telefonica");

    } catch (error) {
        
        console.log(error);

        throw new Error("No se ha podido conectar a la base de datos")

    }
}

module.exports = {
    connection
}