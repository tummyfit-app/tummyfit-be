import express from "express";
import { UserController } from "../controller/UserController";

const router = express.Router();
const userController = new UserController();

router.get("/login", userController.insertUser);

export default router;
