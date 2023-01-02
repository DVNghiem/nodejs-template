import { Redis } from "ioredis";
import { Model } from "mongoose";

export class DAOModel {
    redis: Redis;
    collection: Model<any>;
    coll_name: string;
    constructor(redis: Redis, collection: Model<any>, coll_name: string) {
        this.redis = redis;
        this.collection = collection;
        this.coll_name = coll_name;
    }

    key(filters: any) {
        const _key = [] as string[];
        for (const k of Object.keys(filters)) {
            _key.push(`${k}:${filters[k]}`);
        }
        return `${this.coll_name}:${_key.join(":")}`;
    }

    async find_from_cache(filters: any) {
        const _key = this.key(filters);
        const value = await this.redis.get(_key);
        return value ? JSON.parse(value) : {};
    }

    save_to_cache(filters: any, value: any, ttl: number) {
        const _key = this.key(filters);

        if(ttl===-1)
            this.redis.set(_key, value);
        else
            this.redis.setex(_key, ttl, value)
    }

}
