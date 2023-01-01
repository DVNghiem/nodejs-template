import { user_model } from "../models"
import msgBroker from "../tasks/broker"
import { BadRequest } from "../libs/exception";
import user_coll from "../models/user";

class UserHelper{
    async register(data:any){
        const existUser = await user_model.collection.findOne({ username: data.username });
        if(existUser){
            throw new BadRequest("register fail", ["user is existed"])
        }
        msgBroker.publish("register", JSON.stringify(data))
        return "waiting save"
    }
}
const user_helper = new UserHelper()
export default user_helper
