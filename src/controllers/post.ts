import { Context } from 'koa';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

export default class PostController {
	// 上传文件接口
	public static async uploadFile(ctx: Context) {
		const name = ctx.state.user.sub;
		if (name === ctx.params.id) {
			let file: any = ctx.request.files?.file;
			if (file) {
				let url: string = file.path;
				url =
					ctx.origin +
					'/' +
					url
						.toString()
						.split(/[/|\\]/)
						.slice(1)
						.join('/');

				ctx.status = 200;
				ctx.body = { message: url };
			} else {
				ctx.throw(401, '上传失败');
			}
		} else {
			ctx.throw(401, '没有权限');
		}
	}
	//返回帖子列表标题
	public static async getListPosts(ctx: Context) {
		const posts = await Post.find({
			select: ['id', 'author', 'title', 'pv'],
		});
		ctx.status = 200;
		ctx.body = posts;
	}

	// 返回帖子内容和回帖
	public static async getPost(ctx: Context) {
		let post = await Post.findOne({
			where: { id: ctx.params.postid },
		});

		const comments = await Comment.find({
			select: ['id', 'author', 'content'],
			where: {
				post: ctx.params.postid,
			},
			order: {
				id: 'ASC',
			},
		});
		ctx.status = 200;
		ctx.body = { post: post, comments: comments };
	}
	//发布帖子
	public static async postPost(ctx: Context) {
		const name = ctx.params.id;
		if (name === ctx.state.user.sub) {
			const { title, content, image } = ctx.request.body;
			const post = new Post();
			post.author = name;
			post.title = title;
			post.content = content;
			if (image && image !== '') post.avatar = image;
			else post.avatar = '';
			post.pv = 0;
			await Post.save(post);

			ctx.status = 200;
			ctx.body = { message: '文章发布成功' };
		} else {
			ctx.throw(401, '没有权限');
		}
	}

	public static async putPost(ctx: Context) {}

	public static async deletePost(ctx: Context) {}
}
