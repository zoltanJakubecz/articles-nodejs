import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import fileUpload from "express-fileupload";
import { getArticles, createArticle } from "./controllers/article.controller";
import { uploadFile } from "./controllers/image.controller";
import { createToken, renewToken } from "./controllers/token.controller";

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

app.get('/', getArticles);
app.post('/', createArticle);
app.post('/upload', uploadFile);
app.post('/token/new/:platform', createToken);
app.put('/token/renew/:token', renewToken);

createConnection().then(() => {
    app.listen(5000, () =>{
        console.log("Server started....")
    });
}).catch(error => console.log(error));

