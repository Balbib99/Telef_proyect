// Importamos el modelo de Rpc
const Ctu = require("../models/ctu");

// Guardar Rpc
const save = (req, res) => {

    // Recoger datos del body
    const params = req.body;

    // Si no nos llegan datos devolvemos respuesta de error
    if (!params.inc) return res.status(400).send({ status: "error", message: "Deves introducir un numero de incidencia" });

    // Control de inc duplicadas
    Ctu.find({ "inc": params.inc, "user": req.user.id }).then((ctu) => {

        if (ctu && ctu.length >= 1) {

            return res.status(400).send({
                status: "error",
                message: "Este numero de incidencia ya existe"
            });

        } else {

            // Crear y rellenar el objeto del modelo
            let newCtu = new Ctu(params);
            newCtu.user = req.user.id;

            // Guardar objeto en bbdd
            newCtu.save().then((ctuStored) => {

                if (!ctuStored) {
                    return res.status(400).send({ status: "error", message: "No se ha guardado el CTU" });
                }

                // Devolver resuesta positiva
                return res.status(200).send({
                    status: "success",
                    message: "CTU guardado",
                    ctuStored
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
    const ctuInc = req.body.inc;

    // Find con la condicion del inc
    Ctu.findOne({ "inc": ctuInc, "user": req.user.id }).then((ctuStored) => {

        if (!ctuStored) {
            return res.status(400).send({ status: "error", message: "No se ha encontrado el CTU" });
        }

        // Devolver respuesta positiva
        return res.status(200).send({
            status: "success",
            message: "Mostrar CTU",
            ctu: ctuStored
        })

    }).catch((error) => {

        return res.status(400).send({ status: "error", message: "Ha habido algún error" });

    })

}

module.exports = {
    save,
    search
}