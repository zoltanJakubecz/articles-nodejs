import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Article } from "../entity/Article";

export const getArticles = async (req: Request, res: Response): Promise<Response> => {
    const articles = await getRepository(Article).find();
    return res.json(articles);
}


export const createArticle = async (req: Request, res: Response): Promise<Response> => {
    const newArticle = await getRepository(Article).create(req.body);
    const result = await getRepository(Article).save(newArticle);
    return res.json(result);
}


