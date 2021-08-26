/*
 * @Description:回帖处理
 * @Version: 2.0
 * @Date: 2021-08-26 01:06:35
 * @LastEditTime: 2021-08-26 19:36:00
 */
import Router = require('koa-router');
import { Context } from 'koa';
import { Comment } from '../models/comment';

const router = new Router({
	prefix: '/api/comment',
});

/**
 * @description: 发回复
 * @param {jwt} token
 * @param {*} (postid content)
 * @return {*} 200|401
 */
router.post('/:id', async (ctx: Context) => {
	const name = ctx.state.user.sub;
	if (name === ctx.params.id) {
		const { postid, content } = ctx.request.body;
		console.log(postid, content);
		let comment = new Comment();
		comment.author = name;
		comment.post = postid;
		comment.content = content;
		Comment.save(comment);

		ctx.status = 200;
		ctx.body = { message: '发表回复成功' };
	} else {
		ctx.throw(401, '没有回复权限');
	}
});

/**
 * @description: 删除回复
 * @param {*} token
 * @param {*} (commentid)
 * @return {*} 200|401
 */
router.delete('/:id', async (ctx: Context) => {
	// TODO
});

export { router };

// export default class CommentController {
// 	public static async postComment(ctx: Context) {
// 		const name = ctx.state.user.sub;
// 		if (name === ctx.params.id) {
// 			const { postid, content } = ctx.request.body;
// 			console.log(postid, content);
// 			let comment = new Comment();
// 			comment.author = name;
// 			comment.post = postid;
// 			comment.content = content;
// 			Comment.save(comment);

// 			ctx.status = 200;
// 			ctx.body = { message: '发表回复成功' };
// 		} else {
// 			ctx.throw(401, '没有回复权限');
// 		}
// 	}

// 	public static async deleteComment(ctx: Context) {}
// }
