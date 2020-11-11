import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Token } from "../entity/Token";
import { v4 as uuidv4 } from 'uuid';

export const createToken = async (req: Request, res: Response): Promise<Response> => {
    const newToken: Token = new Token();
    newToken.token = uuidv4();
    newToken.remaining = 5;
    return res.status(200).json({
        token: newToken.token,
        remaining: newToken.remaining
    });
}