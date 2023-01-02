import express, {
    Express,
    NextFunction,
    Request,
    Response,
} from "express";
import resources from "../apis";
import { Schema } from "../schemas";
import { RouteDefinition } from "./security";
import {BadRequest, Forbidden} from './exception'
import cors from "cors";
import morgan from "morgan";
import { user_model } from "../models";
import { verify } from "jsonwebtoken";
import logger from "../logs";

const format_res = (_target: any, _name: any, descriptor: any) => {
    const fn = descriptor.value
    descriptor.value = async function (
        request: Request,
        response: Response,
        next: NextFunction,
        func: CallableFunction,
        schema: Object,
        login_required: boolean

    ) {
        const _res = {
            data: "",
            msg: "",
            errors: []
        };
        let status = 200
        try {
            const [data, user] = await fn( request,
                response,
                next,
                func,
                schema,
                login_required)
            _res.data = await func(data, user)
        } catch (error:any) {
            _res.msg = error.message           
            _res.errors = error.errors
            status = error.status
            logger.error(error.toString())
        }    
        return response.status(status).json(_res);
    };
};

class Server {
    private app: Express;
    constructor() {
        this.app = express();
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.init_route();
    }
    run(port: number) {
        this.app.listen(port);
    }

    @format_res
    private async validate_data(
        request: Request,
        _response: Response,
        _next: NextFunction,
        _func: CallableFunction,
        schema: any,
        _login_required: boolean
    ) {

        let user = null
        if (_login_required){
            const authorization = request.headers.authorization
            if (authorization){
                if(!authorization.toLowerCase().includes('bearer ')){
                    throw new Forbidden("authenication fail", ["not provide token type"])
                }
                const _token = authorization.split(" ")[1]
                user = await user_model.find_from_cache({access_token: _token})
                
                if(Object.keys(user).length === 0){
                    try {
                        user = verify(_token, process.env.ACCESS_TOKEN_SECRET || "")
                    } catch (error: any) {
                        throw new Forbidden("authenication fail", [error.message])
                    }
                }
            }
        }
        // check data here
        if(!schema) return [{}, user]
        const validator = new schema() as Schema
        const data = validator.parse(request.method.toLocaleLowerCase() === "get"?request.query:request.body)
        if (data instanceof Array){
            throw new BadRequest("", data)
        }
        return [data, user]
    }

    private init_route() {
        resources.forEach((item: any) => {
            const { path, api } = item;
            const routers: RouteDefinition[] = Reflect.getMetadata(
                "routes",
                api.constructor
            );
            const exRouter = express.Router();
            routers.forEach(({ method, path, methodName, schema, login_required}) => {
                exRouter[method](
                    path,
                    (
                        request: Request,
                        response: Response,
                        next: NextFunction
                    ) =>
                        this.validate_data(
                            request,
                            response,
                            next,
                            api[String(methodName)].bind(api),
                            schema,
                            login_required
                        )
                );
            });
            this.app.use(path, exRouter);
        });
    }
}
export default Server;
