import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Article } from "../entity/Article";
import { Token } from "../entity/Token";

export const getArticles = async (req: Request, res: Response): Promise<Response> => {
    if(isNaN(req.body.pageSize) || isNaN(req.body.page)) {
        return res.status(404).json({
            message: "Data must be number"
        });
    }
    const dbSize: number = await getRepository(Article).createQueryBuilder("article").getCount();
    const articles: Article[] = await getRepository(Article).createQueryBuilder("article").limit(req.body.pageSize).offset((req.body.page - 1) * req.body.pageSize).getMany();
    return res.status(200).json({
        list: articles,
        meta: {
            pageSize: req.body.pageSize,
            count: dbSize,
            pageCount: Math.ceil(dbSize / req.body.pageSize),
            page: req.body.page
        }
    });
}


export const createArticle = async (req: Request, res: Response): Promise<Response> => {
    const newArticle: Article[] = await getRepository(Article).create(req.body);
    const result: Article[] = await getRepository(Article).save(newArticle);
    return res.status(200).json(result);
}


export const getArticle = async (req: Request, res: Response): Promise<Response> => {
    const { cookies } = req;
    let token: Token;
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


