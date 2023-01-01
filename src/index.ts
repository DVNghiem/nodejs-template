import express from 'express'
import 'reflect-metadata';
import * as dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import morgan from "morgan";
import Server from './libs/server';
const PORT = parseInt(process.env.PORT+"") | 5000

export const app = new Server()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.run(PORT)
