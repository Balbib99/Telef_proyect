// Importamos dependencias
const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Mensaje de bienvenida
console.log("API REST para TELEFONICA arrancada!!");

//Conexión a la bbdd
connection();
const port = 3000;

// Creando servidor node
const app = express();
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cargar conf rutas
const UserRoutes = require("./routes/user");
const RpcRoutes = require("./routes/rpc");
const CtuRoutes = require("./routes/ctu");
const ContactRoutes = require("./routes/contact");
const FileRoutes = require("./routes/file");

app.use("/api/user", UserRoutes);
app.use("/api/rpc", RpcRoutes);
app.use("/api/ctu", CtuRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/file", FileRoutes);

//Ruta de prueba
app.get("/ruta-prueba", (req, res) => {

    return res.status(200).json(
        {
            "id": 1,
            "nombre": "Victor",
            "web": "victorroblesweb.es"
        }
    );

})

// Poner servidor a escuchar peticiones http
app.listen(port, () => {
    console.log("Servidor node corriendo en el puerto: " + port);
})