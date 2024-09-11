export default router;
/**
 * Middleware function type.
 */
export type Middleware = (ctx: any, next: Function) => any;
/**
 * @type {{
 *   [method: string]: (path: string, ...handlers: Middleware[]) => Middleware
 * } & {
 *   del: (path: string, ...handlers: Middleware[]) => Middleware,
 *   all: (path: string, ...handlers: Middleware[]) => Middleware
 * }}
 */
declare const router: {
    [method: string]: (path: string, ...handlers: Middleware[]) => Middleware;
} & {
    del: (path: string, ...handlers: Middleware[]) => Middleware;
    all: (path: string, ...handlers: Middleware[]) => Middleware;
};
