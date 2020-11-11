import { Request, Response } from "express-fileupload";
import path from "path";

export const uploadFile = (req: Request, res: Response): Promise<Response> => {
    try {
        const file = req.files.file;
        const fileName = file.name;
        const extension = path.extname(fileName);
        const allowedExtensions = /png|jpeg|jpg|gif/;

        if(!allowedExtensions.test(extension)) throw "Unsupported extension";
        console.log(extension);
        return res.send("Helly");
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    }

    
}
