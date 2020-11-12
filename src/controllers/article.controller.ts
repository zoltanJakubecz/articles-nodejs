import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Article } from "../entity/Article";
import { Token } from "../entity/Token";

export const getArticles = async (req: Request, res: Response): Promise<Response> => {
    const articles = await getRepository(Article).find();
    return res.status(200).json(articles);
}


export const createArticle = async (req: Request, res: Response): Promise<Response> => {
    const newArticle = await getRepository(Article).create(req.body);
    const result = await getRepository(Article).save(newArticle);
    return res.status(200).json(result);
}


export const getArticle = async (req: Request, res: Response): Promise<Response> => {
    const { cookies } = req;
    let token: Token;
    console.log(cookies);
    if("token" in cookies) token = await getRepository(Token).findOne(cookies.token);
    if(token && token.remaining > 0) {
        token.remaining -= 1;
        await getRepository(Token).save(token); 
        const article = await getRepository(Article).findOne(req.params.id);
        return res.status(200).json(article);
    }
    res.status(404).json({
        message: "Access denied!"
    })
}


