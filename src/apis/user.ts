import { Http } from "../libs/security";
import { UserSChema } from "../schemas/user";
import user_helper from "../helpers/user";

export class User {

    @Http('post', UserSChema, false, '/register')
    register(data:any){
        return user_helper.register(data)
    }
    
}
