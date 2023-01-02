import Redis from "ioredis";
import { DAOModel } from "../libs/dao";
import user_coll from "./user";

const redis = new Redis(process.env.REDIS || "redis://redis:6379");
export const user_model = new DAOModel(redis, user_coll, "user");
