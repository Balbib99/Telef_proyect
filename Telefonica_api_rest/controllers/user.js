// Importar dependencias
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../services/jwt");

// Accion de prueba
const pruebaUser = (req, res) => {
    return res.status(200).send({
        message: "mensaje enviado desde: controllers/user"
    })
}

// Registro de usuarios
const register = (req, res) => {

    // Recogemos datos de la petición
    let params = req.body;

    // Comprobamos que nos lleguen correctamente
    if (!params.nick || !params.password) {
        
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })

    } else {

        // Control usuarios duplicados
        User.find({
            $or:[
                { nick: params.nick.toLowerCase() }
            ]
        }).then(async (users) => {
            
            if (users && users.length >= 1) {
                
                return res.status(200).send({
                    status: "success",
                    message: "El usuario ya existe"
                })

            }

            // Cifrar la contraseña
            let pwd = await bcrypt.hash(params.password, 10);
            params.password = pwd;

            // Crear objeto de usuario
            let user_to_save = new User(params);

            // Guardar usuario en la bbdd
            user_to_save.save().then((userStorage) => {

                // Devolver resultado de exito
                res.status(200).json({
                    status: "success",
                    message: "Usuario creado correctamente",
                    userStorage
                })

            }).catch((error) => {
                
                // Devolver resultado de error
                return res.status(400).json({
                    status: "error",
                    mensaje: "No se ha guardado el usuario"
                });
            
            })

        }).catch((error) => {

            return res.status(500).json({
                status: "error",
                message: "Error en la consulta de usuarios"
            })

        })

    }
}

// Login del usuario
const login = async (req, res) => {

    // Recorrer parámetros del body
    let params = req.body;

    if (!params.nick || !params.password) {

        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        })
    
    }

    // Busca en la bbdd si existe
    try {
        
        // Buscamos el usuario por el nick (el cual no podrá haber ninguno igual)
        const user = await User.findOne({ nick: params.nick });

        if (!user) {
            
            return res.status(400).send({
                status: "error",
                message: "No existe el usuario"
            })

        }

        // Comprobar su contraseña
        const pwd = bcrypt.compareSync(params.password, user.password);

        if (!pwd) {
            
            return res.status(400).send({
                status: "error",
                message: "No te has identificado correctamente"
            })

        }

        // Conseguir token
        const token = jwt.createToken(user);

        // Devolver datos del usuario
        return res.status(200).send({
            status: "success",
            message: "Te has logeado correctamente",
            user: {
                nick: user.nick
            },
            token
        })

    } catch (error) {

        return res.status(400).send({
            status: "error",
            message: "No existe el usuario"
        })
    
    }
}

module.exports = {
    pruebaUser,
    register,
    login
}