import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { User } from './models/user';
import { Post } from './models/post';
import { Comment } from './models/comment';
import { UserFollow } from './models/userfollow';

import Koa = require('koa');
import jwt = require('koa-jwt');
import * as config from './config';
import cors = require('@koa/cors');
import { router } from './routes';

import serve = require('koa-static');
import koaBody = require('koa-body');
import UpFile from './util/upfile';
import path = require('path');
import { logger } from './middlewares/logger';

createConnection({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'wanlov2008',
	database: 'test',
	synchronize: true,
	entities: [User, Post, Comment, UserFollow],
})
	.then(() => {
		const app = new Koa();
		app.use(logger());
		app.use(cors());
		app.use(serve('public'));

		// 用户错误处理
		app.use(async (ctx, next) => {
			try {
				await next();
			} catch (err) {
				ctx.status = err.status;
				ctx.body = { message: err.message };
				ctx.app.emit('error', err, ctx);
			}
		});

		// JWT拦截
		app.use(
			jwt({ secret: config.JWT_SECRET }).unless({
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
						const dir = path.join(
							`public`,
							`uploads`,
							`${UpFile.getUpDirName()}`
						);
						UpFile.checkDirExist(dir);
						file.path = path.join(dir, filename);
					},
				},
				onError: (e) => {},
			})
		);

		app.use(router.routes()).use(router.allowedMethods());

		// 控制台输出用户错误
		app.on('error', (err, ctx: Koa.Context) => {
			// console.error(`${ctx.method} ${ctx.originalUrl} ${err.message}`);
		});

		app.listen(config.WebServerPort);
		console.log(`Service @ port ${config.WebServerPort} ...`);
	})
	.catch((e) => {
		console.log(`TypeORM connection error: ${e}`);
	});
