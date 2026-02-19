import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import cors from 'cors';

import vehiculoRoutes from './routes/vehiculoRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js'
import reservaRoutes from './routes/reservaRoutes.js'

const app = express();

const whitelist = [ 'http://127.0.0.1:5501', 'http://localhost:5501', 'http://127.0.0.1:4000', 'http://localhost:4000' ];

const corsOptions = {
    origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
        callback(null, true);
    } else {
        callback(new Error('No permitido por CORS'));
    }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

dotenv.config();

conectarDB();

//Rutas
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/reservas', reservaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


