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
import schedule from "node-schedule"
import User from "./database/schema/userSchema.js";
import nodemailer from "nodemailer";

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

//infoRoute
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

//schedule the cron job for 7 am each day
schedule.scheduleJob("* * * * *", async _ =>{
    console.log("This job runs at 7am each day")
    const date = new Date();
    let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = monthArray.indexOf(date.toDateString().split(" ")[1]) + 1

    if(month < 10){
     month = "0" + month.toString();
    }
  
    let day = date.toDateString().split(" ")[2]

    const birthdaySqwa = await User.find({day_of_birth: day, month_of_birth: month})
    let emailArray = []
    for(let i = 0; i < birthdaySqwa.length; i++){
        //console.log(birthdaySqwa[i])
        emailArray.push(birthdaySqwa[i].email)
    }

    console.log(emailArray)

})  



