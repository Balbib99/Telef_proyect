const express = require("express");
const router = express.Router();
const RpcController = require("../controllers/rpc");
const auth = require("../middlewares/auth");

// Definir rutas
router.post("/save", auth.auth, RpcController.save);
router.post("/search", auth.auth, RpcController.search);

// Exportar router
module.exports = router;