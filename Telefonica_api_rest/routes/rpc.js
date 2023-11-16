const express = require("express");
const router = express.Router();
const RpcController = require("../controllers/rpc");
const auth = require("../middlewares/auth");

// Definir rutas
router.post("/save", auth.auth, RpcController.save);
router.post("/search", auth.auth, RpcController.search);
// router.delete("/remove/:id", auth.auth, PublicationController.remove);
// router.get("/user/:id/:page?", auth.auth, PublicationController.user);
// router.post("/upload/:id", [auth.auth, uploads.single("file0")], PublicationController.upload);
// router.get("/media/:file", PublicationController.media);
// router.get("/feed/:page?", auth.auth, PublicationController.feed);

// Exportar router
module.exports = router;