import express from 'express';
import checkAuth from '../middleware/checkAuth.js';


import{
    agregarCliente,
    obtenerCliente,
    obtenerClientes,
    actualizarCliente,
    eliminarCliente
} from '../controllers/clienteController.js';

const router = express.Router();

router 
    .route("/")
    .post(checkAuth, agregarCliente)
    .get(obtenerClientes);

router
    .route("/:id")
    .get(checkAuth, obtenerCliente)
    .put(checkAuth, actualizarCliente)
    .delete(checkAuth, eliminarCliente);

export default router;