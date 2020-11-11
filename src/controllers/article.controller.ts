import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Article } from "../entity/Article";

export const getArticles = async (req: Request, res: Response) => {
    const articles = await getRepository(Article).find();
    return res.json(articles);
}
