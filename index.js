import express from "express";
import mongoose from "mongoose";
import router from "./routes/tasks.js";
import cors from "cors";
import {fileURLToPath} from "url";
import path, { dirname } from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __direname = dirname(__filename)


// start:
const app = express();
// port:
const PORT = process.env.PORT;

// Middleware:
app.use(express.json());
app.use(cors({origin:"*"}))


// DB connection:
// * must be before using mongoStore for the sessions and cookies
mongoose.connect("mongodb://localhost:27017/to-do-list")
.then(()=>{console.log("connection to database")})
.catch((error)=>{console.log(`Error: ${error}`)});

// sessions & cookies:
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
   secret: process.env.SESSION_SECRET,
   saveUninitialized: false,
   resave: false,
   cookie:{
      maxAge:60000
   },
   store: MongoStore.create({
      client: mongoose.connection.getClient(),
   })
}))

app.use(router)
app.use(express.static(path.join(__direname, "frontend")))



app.listen(PORT, ()=>{
   console.log(`Server Started on Port ${PORT}`)
})