import { Context } from 'koa';
import { UserFollow } from '../models/userfollow';

export default class FollowController {
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
}
