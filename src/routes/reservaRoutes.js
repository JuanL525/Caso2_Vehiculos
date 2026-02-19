import express from 'express';

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
    .post(agregarReserva)
    .get(obtenerReservas);

router
    .route("/:id")
    .get(obtenerReserva)
    .put(actualizarReserva)
    .delete(eliminarReserva);

export default router;