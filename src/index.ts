import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose, { connect } from "mongoose";
mongoose.set('strictQuery', true)
connect(
    process.env.MONGO_URI || "mongodb://username:password@localhost:27017"
).then(() => console.log("db connected"));


import Server from "./libs/server";
const PORT = parseInt(process.env.PORT + "") | 5000;
export const app = new Server();
app.run(PORT);
require("./tasks");
