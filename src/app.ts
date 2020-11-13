import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import {router as articlesRoute} from "./routes/articlesRoute";
import { router as tokenRouter } from "./routes/tokensRoute";
import { router as fileRouter } from "./routes/filesRoute";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json"


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'));
app.use(cors());

const DisableTryItOutPlugin = function() {
    return {
      statePlugins: {
        spec: {
          wrapSelectors: {
            allowTryItOutFor: () => () => false
          }
        }
      }
    }
  }
  
  const options = {
    swaggerOptions: {
        plugins: [
             DisableTryItOutPlugin
        ]
     }
  };

app.use("/api/articles", articlesRoute);
app.use("/api/tokens", tokenRouter);
app.use("/api/files", fileRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));


createConnection().then(() => {
    app.listen(5000, () =>{
        console.log("Server started....")
    });
}).catch(error => console.log(error));

