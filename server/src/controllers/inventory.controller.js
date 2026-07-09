import * as inventory from "../services/inventory.service.js";

export async function getParts(req, res) {

    try {

        const data = await inventory.getAllParts(req.query);

        res.json(data);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

}

export async function getPart(req, res) {

    try {

        const data = await inventory.getPartByNumber(

            req.params.partNumber

        );

        res.json(data);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

}

export async function search(req, res) {

    try {

        const data = await inventory.searchParts(

            req.query.q || ""

        );

        res.json(data);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

}

export async function getAircraft(req, res) {

    try {

        const data = await inventory.getAllAircraft();

        res.json(data);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

}

export async function getManufacturers(req, res) {

    try {

        const data = await inventory.getManufacturers();

        res.json(data);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

}

export async function getStock(req, res) {

    try {

        const data = await inventory.getCurrentStock(

            req.query.code

        );

        res.json(data);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

}

export async function getLowStock(req, res) {

    try {

        const data = await inventory.getLowStock();

        res.json(data);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

}