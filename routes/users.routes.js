import { Router } from "express";
import {
  index,
  signUser,
  getDashboard,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/", index);
router.get("/SignIn", signUser);
router.get("/dashboard", getDashboard);

export default router;
