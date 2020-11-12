import { Router } from "express";
import { uploadFile } from "../controllers/image.controller";

const router = Router();

router.post("/upload", uploadFile);

export { router };