/*
 * @Description:发帖相关路由
 * @Version: 2.0
 * @Date: 2021-08-26 01:06:35
 * @LastEditTime: 2021-08-26 21:29:24
 */
import Router = require('koa-router');
import { Context } from 'koa';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

const router = new Router({
	prefix: '/post',
});

/**
 * @description: /post/posts 列出所有帖子
 * @param {*}
 * @return {*} (id author title pv)
 */
router.get('/posts', async (ctx: Context) => {
	const posts = await Post.find({
		select: ['id', 'author', 'title', 'pv'],
	});
	ctx.status = 200;
	ctx.body = posts;
});

/**
 * @description: /post/upload/:id
 * @param {jwt} token
 * @param {File} (file)
 * @return {*} 200 url| 401
 */
router.post('/upload/:id', async (ctx: Context) => {
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
});

/**
 * @description: /post/:postid 返回帖子正文
 * @param {string} postid
 * @return {*} 200 {{id,author,title,content,pv,avatar},[{id,author,content}]}|404
 */
router.get('/:postid', async (ctx: Context) => {
	let post = await Post.findOne({
		where: { id: ctx.params.postid },
	});
	if (!post) ctx.throw(404);
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
});

/**
 * @description: /post/:id 发帖
 * @param {*} token
 * @param {string} (title,content,image)
 * @return {*} 200 | 401
 */
router.post('/:id', async (ctx: Context) => {
	const name = ctx.params.id;
	if (name !== ctx.state.user.sub) ctx.throw(401, '没有权限');

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
});

export { router };

/* export default class PostController {
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
 */
