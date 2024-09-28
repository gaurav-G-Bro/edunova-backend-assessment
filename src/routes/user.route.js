import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/users.controller.js";

const router = Router();

router.route("/").get(getAllUsers);
router.route("/register").post(createUser);

export default router;
