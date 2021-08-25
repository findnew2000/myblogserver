import { Context } from 'koa';
import { Comment } from '../models/comment';

export default class CommentController {
	public static async postComment(ctx: Context) {
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
	}

	public static async deleteComment(ctx: Context) {}
}
