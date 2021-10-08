/*
 * @Description:main
 * @Version: 1.4
 * @Date: 2021-08-27 02:54:22
 * @LastEditTime: 2021-10-07 21:01:24
 */
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { Mysql, JWT_SECRET, WebServerPort } from './config';

import conditional = require('koa-conditional-get');
import etag = require('koa-etag');
import helmet = require('koa-helmet');
import * as http2 from 'http2';
import Koa = require('koa');
import jwt = require('koa-jwt');
import cors = require('@koa/cors');
import v2 from './routes';

// import serve = require('koa-static');	//nginx处理静态资源
import koaBody = require('koa-body');
import UpFile from './util/upfile';
import path = require('path');
import { logger } from './middlewares/logger';

const app = new Koa();
import * as fs from 'fs';
const option = {
	key: fs.readFileSync('./privkey1.pem', 'utf8'),
	cert: fs.readFileSync('./cert1.pem', 'utf8'),
	allowHTTP1: true,
};
const server = http2.createSecureServer(option, app.callback());

(async () => {
	try {
		await createConnection(Mysql);
		console.log('db connected');

		server.listen(WebServerPort, '0.0.0.0', () => {
			console.log(`https server listen port ${WebServerPort}`);
		});
	} catch (e) {
		console.log(e);
	}
})();

app.use(logger());
app.use(conditional());
app.use(etag());
app.use(helmet());
app.use(cors());
// app.use(serve('public'));	//nginx反代接口，不需要处理静态资源

// 用户错误处理
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err: any) {
		ctx.status = err.status;
		ctx.body = { message: err.message };
		ctx.app.emit('error', err, ctx);
	}
});

// JWT拦截
app.use(
	jwt({ secret: JWT_SECRET }).unless({
		method: 'GET',
		path: [/\/register/, /\/login/],
	})
);

// 解析POST 和上传文件目录动态设置
app.use(
	koaBody({
		multipart: true,
		// encoding: 'gzip',
		formidable: {
			uploadDir: 'public/uploads',
			keepExtensions: true,
			maxFileSize: 5 * 1024 * 1024,
			onFileBegin: (name, file) => {
				// TODO 上传时如何根据权限确定上传文件大小限制
				const filename = UpFile.getUpFileName(file.path);
				const dir = path.join(`public`, `uploads`, `${UpFile.getUpDirName()}`);
				UpFile.checkDirExist(dir);
				file.path = path.join(dir, filename);
			},
		},
		onError: (e) => {
			console.log(`upload failed: ${e}`);
		},
	})
);

app.use(v2.routes()).use(v2.allowedMethods());

// 控制台输出用户错误
app.on('error', (err, ctx: Koa.Context) => {
	// console.error(`${ctx.method} ${ctx.originalUrl} ${err.message}`);
});

export default server;
