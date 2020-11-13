import { Router } from "express";
import { createArticle, getArticle, getArticles } from "../controllers/article.controller";

const router = Router();

router.get('/paginated', getArticles);
router.post('/', createArticle);
router.get('/:id', getArticle);

export { router };