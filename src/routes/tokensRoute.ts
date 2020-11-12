import { Router } from "express";
import { createToken, renewToken } from "../controllers/token.controller";

const router = Router();

router.post('/:platform', createToken);
router.put('/renew', renewToken);

export { router };