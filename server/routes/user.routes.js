import { Router } from "express";
import {
  addAgent,
  getAllAgent,
  getMyProfile,
  login,
  logout,
  makeTestAdmin,
} from "../controller/user.controller.js";
import { AuthorizeRole, isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
router.post("/add-agent", isAuthenticated, AuthorizeRole, addAgent);
router.get("/get-all-agent", isAuthenticated, AuthorizeRole, getAllAgent);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", logout);

// ***********************************disclaimer******************************
// this route is only added to let the evaluator to  test the application by making an admin account
//*************************************************************
router.post("/test/admin", makeTestAdmin);
export default router;
