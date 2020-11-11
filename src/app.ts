import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';
import { getArticles, createArticle } from './controllers/article.controller';

const app = express();

app.use(express.json());

app.get('/', getArticles);
app.post('/', createArticle);

createConnection().then(() => {
    app.listen(5000, () =>{
        console.log("Server started....")
    });
}).catch(error => console.log(error));

