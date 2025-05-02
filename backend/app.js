const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const backlogRouter = require('./routes/backlog');
const sprintListRouter = require('./routes/sprintList');
require('dotenv').config();

const app = express();

app.use(bodyParser.json()); 

// -- Adaptacion del backend al frontend en este practico --

// Configurar CORS para permitir peticiones desde el frontend
app.use(cors({
    origin: 'http://localhost:5173',  // URL del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']  // Encabezados permitidos
}));

// Logica pendiente para obtener el backlog del controlador
mongoose.connect(`${process.env.MONGO_URL}`, {dbName: `${process.env.DB_NAME}` })
.then(() => {
    console.log('Conectado a MongoDB');
})
.catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
});

const db = mongoose.connection;

// app.use('/tasks', taskRouter)
// app.use('/sprints', sprintRouter)
app.use('/backlog', backlogRouter)
app.use('/sprintList', sprintListRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor iniciado en el puerto ${process.env.PORT || 3000}`);
});