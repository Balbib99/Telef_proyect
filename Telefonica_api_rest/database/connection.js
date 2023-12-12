const mongoose = require("mongoose");
const { DB_DATABASE_LOCAL } = require("../config");

const connection = async() => {
    try {
        
        await mongoose.connect(`${DB_DATABASE_LOCAL}/telefonica`);
        

        console.log("Conectado correctamente a mi bd: telefonica");

    } catch (error) {
        
        console.log(error);

        throw new Error("No se ha podido conectar a la base de datos")

    }
}

module.exports = {
    connection
}