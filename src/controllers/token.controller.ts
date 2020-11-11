import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Token, Platform } from "../entity/Token";
import { v4 as uuidv4 } from 'uuid';

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
    newToken.remaining = 5;
    await getRepository(Token).save(newToken);
    return res.status(200).json({
        token: newToken.token,
        remaining: newToken.remaining
    });
}

