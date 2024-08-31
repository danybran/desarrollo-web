const { conexion } = require("./BD/conexion.js");

const express = require("express");
const cors = require("cors");
const article = require("./table/article.js");
const db = require("mongoose");

//inicializando mi APP
console.log("Mi API Rest arrancada");

//Inicializar la base de datos
conexion();

//Crear un Servidor Node

const app = express();
const puerto = 3900;



//Configurar los CORS
app.use(cors());


//Convertir body a objeto js

app.use(express.json());

//Escuchar las peticiones del puerto
app.listen(puerto, () => {

    console.log("Servidor corriendo en el puerto: " +puerto);
})

//Crear rutas
app.get("/probando", (req,res) =>{
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).send(`
        <div>
        <h1>Probando nuestra ruta en NodeJS</h1>
        <p>Creando API res con NODE</p>
        </div>
    `);
})

// Crear
app.post("/crear", async (req, res) => {
    try {
        const nuevoArticulo = new article(req.body);
        const articuloGuardado = await nuevoArticulo.save();
        res.status(201).json(articuloGuardado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo registrar el registro" });
    }
});

// Leer
app.get("/leer", async (req, res) => {
    try {
        const articulos = await article.find();
        res.status(200).json(articulos);
    } catch (error) {
        res.status(500).json({ message: "No se pudieron obtener los registros" });
    }
});

// Actualizar
app.put("/actualizar/:id", async (req, res) => {
    try {
        const articuloActualizado = await article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(articuloActualizado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el registro" });
    }
});

// Eliminar
app.delete("/eliminar/:id", async (req, res) => {
    try {
        await article.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Registro eliminado" });
    } catch (error) {
        res.status(500).json({ message: "No se pudo eliminar el registro" });
    }
});