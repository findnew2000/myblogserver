import { Context, Next } from 'koa';
import * as Log4 from 'log4js';
const log = Log4.getLogger();
log.level = 'debug';

export function logger() {
	return async (ctx: Context, next: Next) => {
		const start = Date.now();
		await next();
		const ms = Date.now() - start;
		log.info(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
	};
}
