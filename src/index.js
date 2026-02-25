import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import cors from 'cors';

import vehiculoRoutes from './routes/vehiculoRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js'
import reservaRoutes from './routes/reservaRoutes.js'

// 1. Cargar variables de entorno al principio
dotenv.config();

const app = express();

// 2. CORS Abierto para evitar bloqueos con cualquier Frontend
app.use(cors({
  origin: "*",
  credentials: false
}));

// 3. Habilitar lectura de JSON
app.use(express.json());

// 4. Conectar a la Base de Datos
conectarDB();

// 5. Ruta principal de bienvenida (opcional pero recomendada)
app.get('/', (req, res) => {
    res.send('Bienvenido a la API del Sistema de Alquiler de Vehículos 🚗');
});

// 6. Rutas de la API
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/reservas', reservaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});