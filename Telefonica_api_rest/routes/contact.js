const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact");
const auth = require("../middlewares/auth");

// Definir rutas
router.post("/save", auth.auth, ContactController.save);
router.get("/list", auth.auth, ContactController.list);

// Exportar router
module.exports = router;