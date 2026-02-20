import express from 'express';
import checkAuth from '../middleware/checkAuth.js';

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
    .post(checkAuth, agregarVehiculo)
    .get(checkAuth, obtenerVehiculos);

router
    .route("/:id")
    .get(checkAuth, obtenerVehiculo)
    .put(checkAuth, actualizarVehiculo)
    .delete(checkAuth, eliminarVehiculo);

export default router;