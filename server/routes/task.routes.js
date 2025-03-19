import { Router } from "express";
import { uploadTaskCSV } from "../controller/task.controller.js";
import upload from "../middleware/multer.js";
const router = Router();
router.post("/upload", upload.single("file"), uploadTaskCSV);

export default router;
