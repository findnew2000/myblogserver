/*
 * @Description: 用户账户
 * @Version: 2.0
 * @Date: 2021-08-26 01:06:35
 * @LastEditTime: 2021-08-26 22:02:12
 */
import Router = require('koa-router');
import { Context } from 'koa';
import { User } from '../models/user';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const router = new Router({
	prefix: '/user',
});

/**
 * @description: /user
 * @param {jwt} token
 * @return {*} [username]
 */
router.get('/', async (ctx: Context) => {
	let jwtid: string = '';
	if (!ctx.header.authorization) ctx.throw(404);
	let playload = ctx.header.authorization.split(' ');
	jwt.verify(playload![1], JWT_SECRET, (e, dec) => {
		jwtid = dec?.id!;
	});

	let user = await User.findOne({
		select: ['username'],
		where: {
			id: jwtid,
		},
	});
	if (!user) ctx.throw(401, '没有登陆');

	const users = await User.find({
		select: ['username'],
	});

	ctx.status = 200;
	ctx.body = users;
});

/**
 * @description: /user/:id 列出用户详细信息
 * @param {jwt} token
 * @return {*} {name,avatar,mood} | 401
 */
router.post('/:id', async (ctx: Context) => {
	const username = ctx.state.user.sub;
	if (username !== ctx.request.body.id) ctx.throw(401, '没有登录');
	const user = await User.findOne({
		select: ['name', 'avatar', 'mood'],
		where: { username: ctx.params.id },
	});
	if (!user) ctx.throw(401, '没有此用户');
	ctx.status = 200;
	ctx.body = user;
});

export { router };

/* export default class UserController {
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
} */
