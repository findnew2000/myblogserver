/*
 * @Description: 用户关注
 * @Version: 2.0
 * @Date: 2021-08-26 01:06:35
 * @LastEditTime: 2021-08-27 17:30:17
 */
import Router = require('koa-router');
import { Context } from 'koa';
import { UserFollow } from '../models/userfollow';

const router = new Router({
	prefix: '/follow',
});

/**
 * @description: put /follow/:id 建立或改变关注状态
 * @param {jwt} token
 * @param {string} followusername
 * @return {bool} true | false
 */
router.put('/:id', async (ctx: Context) => {
	if (followAuth(ctx)) {
		let follow = await UserFollow.findOne({
			select: ['id', 'status'],
			where: {
				followUsername: ctx.request.body.followUsername,
				fansUsername: ctx.state.user.sub,
			},
		});
		if (follow) {
			follow.status = follow.status ? false : true;
			await follow.save();
			ctx.status = 200;
			ctx.body = { message: follow.status };
		} else {
			let newFol = new UserFollow();
			newFol.followUsername = ctx.request.body.followUsername;
			newFol.fansUsername = ctx.state.user.sub;
			newFol.status = true;
			await newFol.save();
			ctx.status = 200;
			ctx.body = { message: true };
		}
	}
});

/**
 * @description: post /follow/:id 查询关注状态
 * @param {jwt} token
 * @param {string} followusername
 * @return {bool} true | false
 */
router.post('/:id', async (ctx: Context) => {
	if (followAuth(ctx)) {
		const follow = await UserFollow.findOne({
			select: ['status'],
			where: {
				followUsername: ctx.request.body.followUsername,
				fansUsername: ctx.state.user.sub,
			},
		});
		if (!follow) {
			ctx.status = 201;
			ctx.body = { message: false };
		} else {
			ctx.status = 200;
			ctx.body = { message: follow.status };
		}
	}
});

/**
 * @description: 检查是否有权限，是否有关注用户名，是否自己关注自己
 * @param {Context} ctx
 * @return {boolean} true
 */
function followAuth(ctx: Context): boolean {
	if (ctx.state.user.sub !== ctx.params.id) ctx.throw(401, '没有权限');
	if (!ctx.request.body.followUsername) ctx.throw(401, 'param null');
	const user = ctx.state.user.sub;
	const followUsername = ctx.request.body.followUsername;
	if (user === followUsername) ctx.throw(401, 'fuck youself');
	return true;
}

export { router };

/* export default class FollowController {
	public static async setFans(ctx: Context) {
		const user = ctx.state.user.sub;
		const followUsername = ctx.request.body.followUsername;
		if (user === followUsername) ctx.throw(401, 'fuck youself');
		if (!followUsername) ctx.throw(401, 'param null');
		if (user !== ctx.params.id) ctx.throw(401, '没有权限');
		let follow = await UserFollow.findOne({
			select: ['id', 'status'],
			where: {
				followUsername: followUsername,
				fansUsername: user,
			},
		});
		if (follow) {
			follow.status = follow.status ? false : true;
			await follow.save();
			ctx.status = 200;
			ctx.body = { message: follow.status };
		} else {
			let newFol = new UserFollow();
			newFol.followUsername = ctx.request.body.followUsername;
			newFol.fansUsername = user;
			newFol.status = true;
			await newFol.save();
			ctx.status = 200;
			ctx.body = { message: true };
		}
	}

	public static async getFans(ctx: Context) {
		const user = ctx.state.user.sub;
		const followUsername = ctx.request.body.followUsername;
		if (user === followUsername) ctx.throw(401, 'fuck youself');
		if (!followUsername) ctx.throw(401, 'param null');
		if (user !== ctx.params.id) ctx.throw(401, '没有权限');
		const follow = await UserFollow.findOne({
			select: ['status'],
			where: {
				followUsername: followUsername,
				fansUsername: user,
			},
		});
		if (!follow) {
			ctx.status = 201;
			ctx.body = { message: false };
		} else {
			ctx.status = 200;
			ctx.body = { message: follow.status };
		}
	}
} */
