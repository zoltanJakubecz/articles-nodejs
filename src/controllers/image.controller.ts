import { Request, Response } from "express-fileupload";
import path from "path";

const baseUrl = process.env.BASE_URL || "http://localhost:5000";

export const uploadFile = (req: Request, res: Response): Promise<Response> => {
    try {
        const file = req.files.file;
        const fileName = `${Date.now()}-${file.name}`;
        const extension = path.extname(fileName);
        const allowedExtensions = /png|jpeg|jpg|gif/;

        if(!allowedExtensions.test(extension)) throw "Unsupported extension";
        file.mv("./public/imgs/" + fileName);
        return res.status(200).send(`${baseUrl}/imgs/${fileName}`);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    }

    
}
