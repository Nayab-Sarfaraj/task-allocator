import { Router } from "express";
import {
  addAgent,
  getAllAgent,
  getMyProfile,
  login,
} from "../controller/user.controller.js";
import { AuthorizeRole, isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
router.post("/add-agent", isAuthenticated, AuthorizeRole, addAgent);
router.get("/get-all-agent", isAuthenticated, AuthorizeRole, getAllAgent);
router.get("/me", isAuthenticated, getMyProfile);
export default router;
