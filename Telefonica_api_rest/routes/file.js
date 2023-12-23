const express = require("express");
const router = express.Router();
const FileController = require("../controllers/file");
const auth = require("../middlewares/auth");
const multer = require("multer");

// Configuración de subida
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/files/");
    },

    filename: (req, file, cb) => {
        cb(null, "file-" + Date.now() + "-" + file.originalname);
    }
});

const uploads = multer({ storage });

// Definir rutas
router.post("/upload", [auth.auth, uploads.single("file0")], FileController.upload);
router.get("/list", auth.auth, FileController.list);

// Exportar router
module.exports = router;