import express from "express";
import {
    signup,
    login,
    protect,
    deleteMe,
} from "./../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(protect);

router.delete("/deleteMe", deleteMe);

export default router;
