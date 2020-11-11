import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Token, Platform } from "../entity/Token";
import { v4 as uuidv4 } from 'uuid';

const MAX_TRY = 5;

export const createToken = async (req: Request, res: Response): Promise<Response> => {

    const values:string[] = Object.values(Platform);
    if(!values.includes(req.params.platform)){ 
        return res.status(404).json({
            message: "Unknown platform!"
        });
    }
    const newToken: Token = new Token();
    newToken.token = `${uuidv4()}:${req.params.platform}`;
    newToken.platform = req.params.platform as Platform;
    newToken.remaining = MAX_TRY;
    await getRepository(Token).save(newToken);
    return res.status(200).json({
        token: newToken.token,
        remaining: newToken.remaining
    });
}

export const renewToken = async (req: Request, res: Response): Promise<Response> => {
    const token = await getRepository(Token).findOne(req.params.token);
    token.remaining = MAX_TRY;
    await getRepository(Token).save(token);
    return res.status(200).json({
        remaining: token.remaining
    });
}