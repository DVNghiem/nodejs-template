import { user_model } from "../models"
import msgBroker from "../tasks/broker"
import { BadRequest } from "../libs/exception";
import bcrypt from 'bcrypt'
import { sign, verify } from "jsonwebtoken";

class UserHelper{
    async register(data:any){
        const existUser = await user_model.collection.findOne({ username: data.username });
        if(existUser){
            throw new BadRequest("register fail", ["user is existed"])
        }
        msgBroker.publish("register", JSON.stringify(data))
        return "waiting save"
    }
    async login(data:any){
        const user = await user_model.collection.findOne({
            username: data.username,
        })

        if(user && (await bcrypt.compare(data.password, user.password))){
            const access_token = sign(
                { username: user.username },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: '1d' }
            );
            const refresh_token = sign(
                { username: user.username },
                process.env.REFRESH_TOKEN_SECRET as string,
                { expiresIn: '365d' }
            );

            user_model.save_to_cache({access_token}, JSON.stringify(user), 24*60*60)

            return {user, access_token, refresh_token}
        }
        throw new BadRequest("Login fail", ["username or password incorrect"])
    }
}
const user_helper = new UserHelper()
export default user_helper
