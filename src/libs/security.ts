export interface RouteDefinition {
    path: string;
    method: "get" | "post" | "delete" | "put";
    methodName: string;
    schema: any,
    login_required: boolean
}

export const Http = (
    method: "get" | "post" | "delete" | "put",
    schema: any,
    login_required: boolean = false,
    path: string
) => {
    return (target: any, propertyKey: string): void => {
        if (!Reflect.hasMetadata("routes", target.constructor)) {
            Reflect.defineMetadata("routes", [], target.constructor);
        }
        const routes = Reflect.getMetadata(
            "routes",
            target.constructor
        ) as Array<RouteDefinition>;
        routes.push({
            method,
            path,
            methodName: propertyKey,
            schema,
            login_required
        });
        Reflect.defineMetadata("routes", routes, target.constructor);
    };
};
