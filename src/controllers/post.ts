/*
 * @Description:发帖相关路由
 * @Version: 2.0
 * @Date: 2021-08-26 01:06:35
 * @LastEditTime: 2021-10-05 22:40:38
 */
import Router = require('koa-router');
import { Context } from 'koa';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { MoreThan } from 'typeorm';

const router = new Router({
	prefix: '/post',
});

/**
 * @description: get /post/list 列出所有帖子
 * @param {number} postid default 0
 * @param {number} len 		default 10
 * @param {number} kind 		default 0
 * @return {[{id,author,title,pv}]} length default 10
 */
router.get('/list', async (ctx: Context) => {
	const postid = ctx.query.postid || 0;
	const len = Number(ctx.query.len) || 10;
	const kind = Number(ctx.query.kind) || 0;
	// console.warn(postid, len, kind);
	const posts = await Post.find({
		select: ['id', 'author', 'title', 'pv'],
		where: { kindid: kind, id: MoreThan(postid) },
		take: len,
		cache: true,
	});
	ctx.status = 200;
	ctx.body = posts;
});

/**
 * @description: /post/upload/:id
 * @param {jwt} token
 * @param {File} file
 * @return {*} 200 url| 401
 */
router.post('/upload/:id', async (ctx: Context) => {
	const name = ctx.state.user.sub;
	const https = ctx.state.user.iss;
	if (name === ctx.params.id) {
		let file: any = ctx.request.files?.file;
		if (file) {
			let url: string = file.path;
			url =
				https +
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
 * @param {number} postid
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
 * @param {number} kind
 * @return {*} 200 | 401
 */
router.post('/:id', async (ctx: Context) => {
	const name = ctx.params.id;
	if (name !== ctx.state.user.sub) ctx.throw(401, '没有权限');

	const { title, content, image, kind } = ctx.request.body;
	const post = new Post();
	post.kindid = kind;
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

/**
 * @description: /post/:postid 删帖
 * @param {number} postid
 * @param {string} ctx.state.user.sub
 * @return {bool}
 */
router.delete('/:postid', async (ctx: Context) => {
	const name = ctx.state.user.sub;
	const postid = ctx.params.postid;
	const post = await Post.findOne({
		select: ['id'],
		where: {
			id: postid,
			author: name,
		},
	});
	if (!post) ctx.throw(401);
	await post.remove();
	ctx.status = 200;
	ctx.body = { message: true };
});

/**
 * @description: /post/:postid 改贴
 * @param {number} postid
 * @param {*} jwt
 * @param {string} (title content image)
 * @return {bool}
 */
router.put('/:postid', async (ctx: Context) => {
	const name = ctx.state.user.sub;
	const postid = ctx.params.postid;
	const post = await Post.findOne({
		select: ['id', 'title', 'content', 'avatar'],
		where: {
			author: name,
			id: postid,
		},
	});
	if (!post) ctx.throw(401);
	const { title, content, image } = ctx.request.body;
	post.title = title;
	post.content = content;
	if (image && image.length >= 30) post.avatar = image;
	try {
		await post.save();
	} catch (e) {}
	ctx.status = 200;
	ctx.body = { message: true };
});

export { router };
