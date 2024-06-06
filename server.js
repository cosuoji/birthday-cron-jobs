import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import logger from "./logger/logger.js";
import httpLogger from "./logger/httplogger.js";
import infoRoute from "./routes/infoRoute.js";
import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"

const app = express();
dotenv.config()
app.use(express.json());
app.use(express.urlencoded());
app.use(httpLogger);
app.use(morgan('dev'))

const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname))

app.set("view engine, 'ejs")
app.set("views", "./views")



//main route setup 
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})

app.use("/", infoRoute)

//catch 
app.all("*", (req, res)=>{
    res.status(404);
    res.json({
        message: "Not Found"
    })
})

mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("connected to DB");
        app.listen(PORT, _ =>{
            logger.info("app is running")
        })
    })