import { Request, Response } from "express";
import { Http } from "../libs/security";
import { HelloSchema } from "../schemas/hello";

export class Hello {
    base_url: string 
    constructor(base_url:string){
        this.base_url = base_url
    }

    @Http("get", HelloSchema, false, "/hello")
    hello(data:any, user:any){
        return data
    }

}