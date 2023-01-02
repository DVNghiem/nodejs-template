import { Http } from "../libs/security";
import { RegisterSchema, LoginSchema } from "../schemas/user";
import user_helper from "../helpers/user";

export class User {

    @Http('post', RegisterSchema, false, '/register')
    async register(data:any, user:any){
        return await user_helper.register(data)
    }
    
    @Http('post', LoginSchema, false, '/login')
    async login(data:any, user:any){
       return await user_helper.login(data)
    }
}
