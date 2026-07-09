import express from "express";

import {

    getParts,

    getPart,

    search,

    getAircraft,

    getManufacturers,

    getStock,

    getLowStock

} from "../controllers/inventory.controller.js";

const router = express.Router();

router.get("/parts", getParts);

router.get("/parts/:partNumber", getPart);

router.get("/search", search);

router.get("/aircraft", getAircraft);

router.get("/manufacturers", getManufacturers);

router.get("/stock", getStock);

router.get("/low-stock", getLowStock);

export default router;