import { Context } from 'koa';
import { User } from '../models/user';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export default class UserController {
	// 登陆才能列用户
	public static async listUsers(ctx: Context) {
		let jwtid: string = '';
		if (ctx.header.authorization !== undefined) {
			let playload = ctx.header.authorization.split(' ');
			jwt.verify(playload![1], JWT_SECRET, (e, dec) => {
				jwtid = dec?.id!;
			});
		}
		let user = await User.findOne({
			select: ['username'],
			where: {
				id: jwtid,
			},
		});
		if (!user) {
			ctx.throw(401, '没有登陆');
		} else {
			const users = await User.find({
				select: ['username'],
			});

			ctx.status = 200;
			ctx.body = users;
		}
	}

	public static async showUserDetail(ctx: Context) {
		const user = await User.findOne({
			select: ['name', 'avatar', 'mood'],
			where: { username: ctx.params.id },
		});
		if (user) {
			ctx.status = 200;
			ctx.body = user;
		} else ctx.throw(401, '没有注册');
	}

	public static async updateUser(ctx: Context) {
		ctx.body = `UpdateUser controller with ID = ${ctx.params.id}`;
	}

	public static async deleteUser(ctx: Context) {
		ctx.body = `DeleteUser controller with ID = ${ctx.params.id}`;
	}
}
