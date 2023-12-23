const express = require("express");
const router = express.Router();
const CtuController = require("../controllers/ctu");
const auth = require("../middlewares/auth");

// Definir rutas
router.post("/save", auth.auth, CtuController.save);
router.post("/search", auth.auth, CtuController.search);

// Exportar router
module.exports = router;