import express from "express";
import {
    getAllSchedules,
    createSchedule,
    deleteSchedule,
    getUserSchedules,
} from "./../controllers/schedulesController.js";
import { protect } from "./../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllSchedules).post(protect, createSchedule);
router.route("/user").get(protect, getUserSchedules);
router.route("/:id").delete(protect, deleteSchedule);

export default router;