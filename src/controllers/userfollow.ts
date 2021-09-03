/*
 * @Description: 用户关注
 * @Version: 2.0
 * @Date: 2021-08-26 01:06:35
 * @LastEditTime: 2021-09-04 01:21:52
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
	if (ctx.state.user.sub !== ctx.params.id) ctx.throw(401);
	if (!ctx.request.body.followUsername) ctx.throw(400);
	const user = ctx.state.user.sub;
	const followUsername = ctx.request.body.followUsername;
	if (user === followUsername) ctx.throw(400, 'fuck youself');
	return true;
}

export { router };
