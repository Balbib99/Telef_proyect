// Importamos modelo
const File = require("../models/file");

// Importamos modulos para el manejo de archivos
const fs = require("fs");
const path = require("path");

// Subir ficheros
const upload = (req, res) => {

    // Recoger el fichero y comprobar que existe
    if (!req.file) {

        return req.status(404).send({
            status: "error",
            message: "La petición no incluye ningún archivo"
        })

    }

    // Conseguir el nombre del archivo
    let file = req.file.originalname;

    // Sacar la extensión del archivo
    const ext = file.split("\.")[1];

    // Comprobar extensión
    if (ext != "doc" && ext != "docm" && ext != "docx" && ext != "dot" && ext && "txt" && ext != "pdf") {

        // Si no es correcta, borrar archivo   
        const filePath = req.file.path;
        const fileDelete = fs.unlinkSync(filePath);

        return res.status(400).send({
            status: "error",
            message: "Extensión del fichero invalida"
        })

    } else {

        let newFile = new File({file: req.file.filename, fileMetadata: JSON.parse(req.body.fileMetadata)});
        console.log(req.body.fileMetadata);
        newFile.user = req.user.id;

        newFile.save().then((fileStorage) => {
            if (!fileStorage) {
                return res.status(400).send({ status: "error", message: "No se ha guardado el archivo" });
            }

            // Devolver respuesta
            return res.status(200).send({
                status: "success",
                message: "fichero guardado",
                fileStorage
            })
        }).catch((error) => {
            return res.status(400).send({ status: "error", message: "Ha habido algún error", error: error });
        })
    }
}

// Listado de archivos
const list = (req, res) => {

    // Listamos todos los contactos de la bbdd (si existen)
    File.find().then((fileStorage) => {
        
        if (!fileStorage || fileStorage.length <= 0) {
            
            return res.status(400).send({ status: "error", message: "No se han encontrado archivos" });

        }

        // Decolver contactos
        return res.status(200).send({
            status: "success",
            message: "Mostrar Archivos",
            files: fileStorage
        })

    }).catch((error) => {
        
        return res.status(400).send({
            status: "error",
            message: "Ha ocurrido un error"
        })

    })
}

module.exports = {
    upload,
    list
}