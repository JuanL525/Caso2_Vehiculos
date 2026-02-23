import express from 'express';

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
    .post(agregarCliente)
    .get(obtenerClientes);

router
    .route("/:id")
    .get(obtenerCliente)
    .put(actualizarCliente)
    .delete(eliminarCliente);

export default router;