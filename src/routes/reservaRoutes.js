import express from 'express';
import checkAuth from '../middleware/checkAuth.js';

import{
    agregarReserva,
    obtenerReserva,
    obtenerReservas,
    eliminarReserva,
    actualizarReserva
} from '../controllers/reservaController.js'

const router = express.Router();

router
    .route("/")
    .post(checkAuth, agregarReserva)
    .get(checkAuth, obtenerReservas);

router
    .route("/:id")
    .get(checkAuth, obtenerReserva)
    .put(checkAuth, actualizarReserva)
    .delete(checkAuth, eliminarReserva);

export default router;