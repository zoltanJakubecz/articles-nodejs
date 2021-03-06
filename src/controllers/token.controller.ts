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
    return res.cookie("token", newToken.token).status(200).json({
        message: `Your token has been set up you have ${newToken.remaining} tries`
    });
}

export const renewToken = async (req: Request, res: Response): Promise<Response> => {
    const { cookies } = req;
    let token: Token;
    if("token" in cookies) token = await getRepository(Token).findOne(cookies.token);
    if(!token){
        return res.status(404).json({
            message: "Token not found"
        })
    }
    token.remaining = MAX_TRY;
    await getRepository(Token).save(token);
    return res.status(200).json({
        remaining: token.remaining
    });
}