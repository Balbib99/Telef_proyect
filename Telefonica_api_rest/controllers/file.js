// Importamos modulos para el manejo de archivos
const fs = require("fs");
const path = require("path");

const { Octokit } = require('@octokit/rest');

//Subir ficheros a la cuenta de GitHub
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

  // Verificar si se seleccionó un archivo
  if (req.file) {
    // Obtener información del archivo seleccionado
    const file = req.file;
    const fileName = req.file.originalname;
    const fileContent = fs.readFileSync(req.file.path);

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
        message: "Archivo subido",
        fileInput: `${data.content.html_url}`
      })

    } catch (error) {
      console.error(`Error al subir archivo: ${error.message}`);
      return res.status(400).send({ status: "error", message: "Ha habido algún error", error: error });
    }
  } else {
    console.error('No se seleccionó ningún archivo.');
  }

}

// Listado de archivos de la cuenta de GitHub
const list = async(req, res) => {

  // Configurar el cliente de la API de GitHub
  const octokit = new Octokit({
    auth: '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', // Reemplaza con tu token de acceso personal de GitHub
  });

  // Nombre del repositorio y propietario
  const repoOwner = 'Balbib99';
  const repoName = 'Documents';

  try {
    // Obtener la lista de archivos del repositorio
    const { data } = await octokit.repos.getContent({
      owner: repoOwner,
      repo: repoName,
      path: '', // Dejar vacío para obtener la lista de archivos en la raíz
    });

    if (data.length) {
      const fileList = data.map(file => ({
        fileName: file.name,
        fileType: file.type,
        fileUrl: file.html_url,
      }));

      // Devolver info sobre archivos
      return res.status(200).send({
        status: 'success',
        message: 'Mostrar Archivos',
        files: fileList,
      });

    } else {
      console.log('No se encontraron archivos.');
      return res.status(404).send({
        status: 'error',
        message: 'No se encontraron archivos en el repositorio.',
      });
    }
  } catch (error) {
    console.error(`Error al listar archivos: ${error.message}`);
  }


}

module.exports = {
  upload,
  list
}