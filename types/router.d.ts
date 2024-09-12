export default router;
/**
 * Middleware function type.
 */
export type Middleware = (ctx: import("koa").Context & {
    request: any;
}, next: import("koa").Next) => Promise<any>;
/**
 * Defines an object mapping HTTP methods to their route-handling functions.
 *
 * @type {{
 *   [method: string]: (path: string|string[], ...handlers: Middleware[]) => Middleware
 * } & {
 *   del: (path: string|string[], ...handlers: Middleware[]) => Middleware,
 *   all: (path: string|string[], ...handlers: Middleware[]) => Middleware
 * }}
 */
declare const router: {
    [method: string]: (path: string | string[], ...handlers: Middleware[]) => Middleware;
} & {
    del: (path: string | string[], ...handlers: Middleware[]) => Middleware;
    all: (path: string | string[], ...handlers: Middleware[]) => Middleware;
};
