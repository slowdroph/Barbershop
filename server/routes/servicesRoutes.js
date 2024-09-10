import express from "express";
import {
    getAllServices,
    createService,
} from "./../controllers/servicesController.js";

const router = express.Router();

router.route("/").get(getAllServices).post(createService);

export default router;
