import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import {router as articlesRoute} from "./routes/articlesRoute";
import { router as tokenRouter } from "./routes/tokensRoute";
import { router as fileRouter } from "./routes/filesRoute";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'));

app.use("/api/articles", articlesRoute);
app.use("/api/tokens", tokenRouter);
app.use("/api/files", fileRouter);


createConnection().then(() => {
    app.listen(5000, () =>{
        console.log("Server started....")
    });
}).catch(error => console.log(error));

