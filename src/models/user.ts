import { model, Schema } from "mongoose";

interface User {
    username: string;
    password: string;
    email: string;
}

const UserSChema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
});

const user_coll = model('user', UserSChema)
export default user_coll