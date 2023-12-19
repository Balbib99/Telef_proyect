// Importamos modelo
const File = require("../models/file");

// Importamos modulos para el manejo de archivos
const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');

const { exec } = require('child_process');

const clientId = "5859a7af-5ff4-4d47-a2ac-f45c75aa43e2";
const clientSecret = "lws8Q~ZXzHXbDGrD5YlURpR~FyaFIEHB_ShlKcLL";
const redirectUri = "https://backend-mern-b1ig.onrender.com/api/file/callback"

// Subir ficheros
// const upload = (req, res) => {

//   // Recoger el fichero y comprobar que existe
//   if (!req.file) {

//     return req.status(404).send({
//       status: "error",
//       message: "La petición no incluye ningún archivo"
//     })

//   }

//   // Conseguir el nombre del archivo
//   let file = req.file.originalname;

//   // Sacar la extensión del archivo
//   const ext = file.split("\.")[1];

//   // Comprobar extensión
//   if (ext != "doc" && ext != "docm" && ext != "docx" && ext != "dot" && ext && "txt" && ext != "pdf") {

//     // Si no es correcta, borrar archivo   
//     const filePath = req.file.path;
//     const fileDelete = fs.unlinkSync(filePath);

//     return res.status(400).send({
//       status: "error",
//       message: "Extensión del fichero invalida"
//     })

//   } else {

//     let newFile = new File({ file: req.file.filename, fileMetadata: JSON.parse(req.body.fileMetadata) });
//     console.log(req.body.fileMetadata);
//     newFile.user = req.user.id;

//     newFile.save().then((fileStorage) => {
//       if (!fileStorage) {
//         return res.status(400).send({ status: "error", message: "No se ha guardado el archivo" });
//       }

//       // Devolver respuesta
//       return res.status(200).send({
//         status: "success",
//         message: "fichero guardado",
//         fileStorage
//       })
//     }).catch((error) => {
//       return res.status(400).send({ status: "error", message: "Ha habido algún error", error: error });
//     })
//   }
// }

const upload = async (req, res) => {

  // Recoger el fichero y comprobar que existe
  if (!req.file) {
    return res.status(404).send({
      status: "error",
      message: "La petición no incluye ningún archivo"
    });
  }

  // Configurar el cliente de la API de GitHub
  const octokit = new Octokit({
    auth: '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', // Reemplaza con tu token de acceso personal de GitHub
  });

  // Nombre del repositorio y propietario
  const repoOwner = 'Balbib99';
  const repoName = 'Documents';

  // Obtener el input de tipo file
  const fileInput = req.file // Asegúrate de tener un elemento con el id 'fileInput' en tu HTML
  console.log("fileInput:" + fileInput);

  // Verificar si se seleccionó un archivo
  if (fileInput.files.length > 0) {
    // Obtener información del archivo seleccionado
    const file = fileInput.files[0];
    const fileName = file.name;
    const fileContent = fs.readFileSync(file.path);

    // Obtener información del archivo existente (si existe)
    let existingFileSha = null;
    try {
      const { data } = await octokit.repos.getContent({
        owner: repoOwner,
        repo: repoName,
        path: fileName,
        ref: 'master', // Reemplaza con la rama deseada
      });
      existingFileSha = data.sha;
    } catch (error) {
      // Ignorar error si el archivo no existe todavía
    }

    // Subir el archivo al repositorio
    try {
      const { data } = await octokit.repos.createOrUpdateFileContents({
        owner: repoOwner,
        repo: repoName,
        path: fileName,
        message: 'Subir archivo',
        content: fileContent.toString('base64'),
        branch: 'master', // Reemplaza con la rama deseada
        sha: existingFileSha, // Proporcionar el sha del archivo existente
      });

      console.log(`Archivo subido: ${data.content.html_url}`);

      return res.status(200).send({
        status: "success",
        message: "fichero guardado",
        fileInput
      })

    } catch (error) {
      console.error(`Error al subir archivo: ${error.message}`);
      return res.status(400).send({ status: "error", message: "Ha habido algún error", error: error });
    }
  } else {
    console.error('No se seleccionó ningún archivo.');
  }


  // // Conseguir el nombre del archivo
  // let fileObject = req.file;

  // // Configuración
  // const repoOwner = 'Balbib99';
  // const repoName = 'Documents';
  // const branchName = 'master'; // Rama donde se subirá el archivo

  // // Token de acceso personal de GitHub
  // const githubToken = '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';

  // uploadFile(fileObject);

  // // Subir el archivo al repositorio
  // async function uploadFile(file) {
  //   try {
  //     // Leer el contenido del archivo en base64
  //     const fileContent = fs.readFileSync(file.path, 'base64');

  //     // Construir el cuerpo de la solicitud
  //     const requestBody = {
  //       message: 'Subir archivo',
  //       content: fileContent,
  //       branch: branchName,
  //     };

  //     // Obtener información del archivo existente (si existe)
  //     let existingFileSha = null;
  //     try {
  //       const response = await fetch(
  //         `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${file.name}?ref=${branchName}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${githubToken}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );

  //       if (response.ok) {
  //         const fileInfo = await response.json();
  //         existingFileSha = fileInfo.sha;
  //       }
  //     } catch (error) {
  //       // Ignorar error si el archivo no existe todavía
  //     }

  //     // Si el archivo existe, incluir el SHA en el cuerpo de la solicitud
  //     if (existingFileSha) {
  //       requestBody.sha = existingFileSha;
  //     }

  //     // Subir el archivo al repositorio
  //     const response = await fetch(
  //       `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${file.name}`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           Authorization: `Bearer ${githubToken}`,
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(requestBody),
  //       }
  //     );

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log(`Archivo subido: ${result.content.html_url}`);
  //     } else {
  //       console.error(`Error al subir archivo: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error(`Error en la solicitud: ${error.message}`);
  //   }
  // }



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