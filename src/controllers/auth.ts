import { Context } from 'koa';
import jwt = require('jsonwebtoken');
import { JWT_SECRET } from '../config';
import * as argon2 from 'argon2';
import { User } from '../models/user';

export default class AuthController {
	public static async login(ctx: Context) {
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
							iss: '172.27.1.3',
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
	}

	public static async register(ctx: Context) {
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
				User.save(newUser);

				ctx.status = 200;
				ctx.body = { message: '注册成功' };
			} else {
				ctx.throw(401, '用户名已注册');
			}
		} else {
			ctx.throw(401, '用户名或密码不合规');
		}
	}
}
