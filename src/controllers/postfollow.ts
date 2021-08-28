/*
 * @Description: 喜欢帖子
 * @Version: 1.0
 * @Date: 2021-08-27 21:35:29
 * @LastEditTime: 2021-08-28 17:46:18
 */
import Router = require('koa-router');
import { Context } from 'koa';
import { PostFollow } from '../models/postfollow';

const route = new Router({
	prefix: '/post',
});

/**
 * @description: 新建或更新喜欢帖子状态
 * @param {number} followpostid
 * @param {string} fansusername
 * @return {bool}
 */
route.put('/follow/:followpostid', async (ctx: Context) => {
	// console.log(ctx.state.user.sub, ctx.request.body.fansusername);
	if (!ctx.request.body.fansusername) ctx.throw(400);
	if (ctx.state.user.sub !== ctx.request.body.fansusername) ctx.throw(401);
	// 非0正数
	if (!/^[1-9]\d*$/.test(ctx.params.followpostid)) ctx.throw(400);
	const postFollow = await PostFollow.findOne({
		select: ['id', 'status'],
		where: {
			followPostid: ctx.params.followpostid,
			fansUsername: ctx.request.body.fansusername,
		},
	});
	if (postFollow) {
		// console.log(postFollow);
		postFollow.status = !postFollow.status;
		postFollow.save();
		ctx.status = 200;
		ctx.body = { message: postFollow.status };
	} else {
		const postf = new PostFollow();
		postf.followPostid = ctx.params.followpostid;
		postf.fansUsername = ctx.request.body.fansusername;
		postf.status = true;
		postf.save();
		ctx.status = 200;
		ctx.body = { message: postf.status };
	}
});

/**
 * @description: 查询帖子喜欢状态
 * @param {number} followpostid
 * @param {string} fansusername
 * @return {bool}
 */
route.post('/follow/:followpostid', async (ctx: Context) => {
	if (!ctx.request.body.fansusername) ctx.throw(400);
	if (!/^[1-9]\d*$/.test(ctx.params.followpostid)) ctx.throw(400);
	if (ctx.state.user.sub !== ctx.request.body.fansusername) ctx.throw(401);
	const postFollow = await PostFollow.findOne({
		select: ['status'],
		where: {
			followPostid: ctx.params.followpostid,
			fansUsername: ctx.request.body.fansusername,
		},
	});
	if (postFollow) {
		ctx.status = 200;
		ctx.body = { message: postFollow.status };
	} else {
		ctx.status = 200;
		ctx.body = { message: false };
	}
});

export default route;
