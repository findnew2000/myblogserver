/*
 * @Description: 处理用户注册和登录授权
 * @Version: 2.0
 * @Date: 2021-08-26 01:06:35
 * @LastEditTime: 2021-09-04 00:14:57
 */
import { ServerName, JWT_SECRET } from '../config';
import jwt = require('jsonwebtoken');
import * as argon2 from 'argon2';
import { User } from '../models/user';
import { Context } from 'koa';
import Router = require('koa-router');

const router = new Router({
	prefix: '/auth',
});

/**
 * @description: /auth/login
 * @param {string} username
 * @param {string} password
 * @return {code}  200 token/401
 */
router.post('/login', async (ctx: Context) => {
	const user = await User.findOne({
		select: ['username', 'password', 'id'],
		where: {
			username: ctx.request.body.username,
		},
	});
	if (!user) {
		ctx.throw(401, '用户名不存在');
	} else if (await argon2.verify(user.password, ctx.request.body.password)) {
		ctx.status = 200;
		ctx.body = {
			login: user.username,
			token:
				`Bearer ` +
				jwt.sign(
					{
						iss: ServerName,
						sub: user.username,
						id: user.id,
					},
					JWT_SECRET,
					{
						expiresIn: '12h',
						// algorithm: 'ES256',
					}
				),
		};
	} else {
		ctx.throw(401, '密码错误');
	}
});

/**
 * @description: /auth/register
 * @param {string} username //4-16位字母数字下划线
 * @param {string} password //6位以上包含1个大写1个小写，1个数字和1个符号
 * @return {Code} 200/401
 */
router.post('/register', async (ctx: Context) => {
	if (
		/^[a-zA-Z0-9_-]{4,16}$/.test(ctx.request.body.username) &&
		/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
			ctx.request.body.password
		)
	) {
		const newUser = new User();
		newUser.username = ctx.request.body.username;
		const user = await User.findOne({
			where: { username: newUser.username },
		});
		if (!user) {
			newUser.password = await argon2.hash(ctx.request.body.password);
			newUser.avatar = ctx.origin + '/uploads/logo.png';
			newUser.name = newUser.username;
			newUser.mood = '⛱';
			newUser.bp = 0;
			User.save(newUser);

			ctx.status = 200;
			ctx.body = { message: '注册成功' };
		} else {
			ctx.throw(401, '用户名已注册');
		}
	} else {
		ctx.throw(401, '用户名或密码不合规');
	}
});

export { router };
