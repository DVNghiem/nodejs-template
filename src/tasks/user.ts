import { user_model } from "../models"
import _ from 'lodash'
import bcrypt from 'bcrypt'

class UserTask{
    static register(msg:string){
        const data = JSON.parse(JSON.parse(msg))
        data.password = bcrypt.hashSync(data.password, 10);
        const user = new user_model.collection(data);
        user.save()
    }
}

export default UserTask