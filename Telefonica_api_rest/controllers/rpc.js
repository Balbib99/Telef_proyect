// Importamos el modelo de Rpc
const Rpc = require("../models/rpc");

// Guardar Rpc
const save = (req, res) => {

    // Recoger datos del body
    const params = req.body;

    // Si no nos llegan datos devolvemos respuesta anegatica
    if (!params.inc) return res.status(400).send({ status: "error", message: "Deves introducir un numero de incidencia" });

    // Control de inc duplicadas
    Rpc.find({ "inc": params.inc, "user": req.user.id }).then((rpc) => {

        if (rpc && rpc.length >= 1) {

            return res.status(400).send({
                status: "error",
                message: "Este numero de incidencia ya existe"
            });

        } else {

            // Crear y rellenar el objeto del modelo
            let newRpc = new Rpc(params);
            newRpc.user = req.user.id;

            // Guardar objeto en bbdd
            newRpc.save().then((rpcStored) => {

                if (!rpcStored) {
                    return res.status(400).send({ status: "error", message: "No se ha guardado el rpc" });
                }

                // Devolver resuesta positiva
                return res.status(200).send({
                    status: "success",
                    message: "RPC guardado",
                    rpcStored
                })

            }).catch((error) => {

                return res.status(400).send({ status: "error", message: "Ha habido algún error" });

            })
        
        }
    })
}

// Buscar RPC
const search = (req, res) => {

    // Sacar el inc (identificador en este caso) del rpc
    const rpcInc = req.body.inc;

    // Find con la condicion del inc y del usuario logeado
    Rpc.findOne({ "inc": rpcInc, "user": req.user.id }).then((rpcStored) => {

        if (!rpcStored) {
            return res.status(400).send({ status: "error", message: "No se ha encontrado el RPC" });
        }

        // Devolver respuesta positiva
        return res.status(200).send({
            status: "success",
            message: "Mostrar RPC",
            rpc: rpcStored
        })

    }).catch((error) => {

        return res.status(400).send({ status: "error", message: "Ha habido algún error" });

    })

}

module.exports = {
    save,
    search
}