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
router.post("/open", auth.auth, FileController.open);
router.get("/loginOneDrive", auth.auth, FileController.loginOneDrive)
router.get("/callback", auth.auth, FileController.callback)
// router.get("/prueba-publication", PublicationController.pruebaPublication);
// router.post("/save", auth.auth, PublicationController.save);
// router.get("/detail/:id", auth.auth, PublicationController.detail);
// router.delete("/remove/:id", auth.auth, PublicationController.remove);
// router.get("/user/:id/:page?", auth.auth, PublicationController.user);
// router.post("/upload/:id", [auth.auth, uploads.single("file0")], PublicationController.upload);
// router.get("/media/:file", PublicationController.media);
// router.get("/feed/:page?", auth.auth, PublicationController.feed);

// Exportar router
module.exports = router;