// Importamos el modelo
const Contact = require("../models/contact");

// Guardar Rcp
const save = (req, res) => {

    // Recoger datos del body
    const params = req.body;

    // Si no llegan datos devolvemos respuesta de error
    if (!params.name || !params.number) return res.status(400).send({ status: "error", message: "Deves introducir ambos datos" });

    // Control de duplicados
    Contact.find({ "name": params.name }).then((contact) => {

        if (contact && contact.length >= 1) {
            
            return res.status(400).send({
                status: "error",
                message: "Este nombre ya existe"
            });

        } else {

            // Crear y rellenar el objeto del modelo
            let newContact = new Contact(params);
            newContact.user = req.user.id;

            // Guardar objeto en la bbdd
            newContact.save().then((contactSotored) => {

                if (!contactSotored) {
                    
                    return res.status(400).send({ status: "error", message: "No se ha guardado el Contacto" });

                }

                // Devolver respuesta positiva
                return res.status(200).send({
                    status: "success",
                    message: "Contacto guardado correctamente !!",
                    contactSotored
                });
            }).catch((error) => {

                return res.status(400).send({ status: "error", message: "Ha ocurrido un error" });

            })
        }
    })
}

const list = (req, res) => {

    // Listamos todos los contactos de la bbdd (si existen)
    Contact.find().then((contactStorage) => {
        
        if (!contactStorage || contactStorage.length <= 0) {
            
            return res.status(400).send({ status: "error", message: "No se han encontrado el Contactos" });

        }

        // Decolver contactos
        return res.status(200).send({
            status: "success",
            message: "Mostrar Contactos",
            contacts: contactStorage
        })

    }).catch((error) => {
        
        return res.status(400).send({
            status: "error",
            message: "Ha ocurrido un error"
        })

    })
}

module.exports = {
    save,
    list
}