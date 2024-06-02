import { ChildEntity, Column } from "typeorm";
import BaseEntity from "./Entity";


@ChildEntity()
export default class User extends BaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;
}

