// Importamos modelo
const File = require("../models/file");

// Importamos modulos para el manejo de archivos
const fs = require("fs");
const path = require("path");

const { exec } = require('child_process');

const clientId = "5859a7af-5ff4-4d47-a2ac-f45c75aa43e2";
const clientSecret = "lws8Q~ZXzHXbDGrD5YlURpR~FyaFIEHB_ShlKcLL";
const redirectUri = "https://backend-mern-b1ig.onrender.com/api/file/callback"

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

    let newFile = new File({ file: req.file.filename, fileMetadata: JSON.parse(req.body.fileMetadata) });
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

const loginOneDrive = (req, res) => {
  res.redirect(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://graph.microsoft.com/files.readwrite`);
  console.log("estoy");
}

const callback = (req, res) => {
  const { code } = req.query;

  console.log(code);
}

const open = (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', 'files', req.body.file);

  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // El archivo no existe
      return res.status(404).send('El archivo no existe');
    }

    // Abrir el archivo en una pestaña a parte
    if (process.platform === 'win32') {
      // En Windows
      exec(`start "" "${filePath}"`, (error) => {
        if (error) {
          console.error(`Error al abrir el archivo: ${error.message}`);
          return res.status(500).send('Error interno del servidor');
        }

        // Archivo abierto con éxito
        res.status(200).send('Archivo abierto con éxito');
      });
    } else {
      // En sistemas operativos no Windows
      exec(`open "${filePath}"`, (error) => {
        if (error) {
          console.error(`Error al abrir el archivo: ${error.message}`);
          return res.status(500).send('Error interno del servidor');
        }

        // Archivo abierto con éxito
        res.status(200).send('Archivo abierto con éxito');
      });
    }
  });
};

module.exports = {
  upload,
  list,
  open,
  loginOneDrive,
  callback
}