import express from 'express';

import {
    agregarVehiculo,
    obtenerVehiculos,
    obtenerVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
} from '../controllers/vehiculoController.js';

const router = express.Router();

router
    .route("/")
    .post(agregarVehiculo)
    .get(obtenerVehiculos);

router
    .route("/:id")
    .get(obtenerVehiculo)
    .put(actualizarVehiculo)
    .delete(eliminarVehiculo);

export default router;