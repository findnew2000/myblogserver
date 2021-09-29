/*
 * @Description:删除回帖
 * @Version: 1.0
 * @Date: 2021-08-28 20:18:39
 * @LastEditTime: 2021-08-28 21:46:17
 */
import supertest = require('supertest');
import server from '../src/app';
import { Connection, createConnection } from 'typeorm';
import { Mysql } from '../src/config';
import { Comment } from '../src/models/comment';

describe('回复功能', () => {
	const req = supertest(server);
	let db: Connection;
	let token: string;

	beforeAll(async () => {
		db = await createConnection(Mysql);
		const res: any = await req
			.post('/v2/auth/login')
			.send({ username: 'findnew', password: '123456' });
		token = JSON.parse(res.text).token;
	});

	describe('留言', () => {
		it('发留言参数正确', async () => {
			const res = await req
				.post('/v2/comment/findnew')
				.set({ Authorization: token })
				.send({ postid: 2, content: '自动化测试' });
			expect(res.statusCode).toBe(200);
		});
		it('发留言参数错误', async () => {
			const res = await req
				.post('/v2/comment/snwxf')
				.set({ Authorization: token })
				.send({ postid: 2, content: '自动化测试' });
			expect(res.statusCode).toBe(401);
		});
	});
	describe('删除留言', () => {
		it('删除留言', async () => {
			const comment = await Comment.findOne({
				where: { content: '自动化测试' },
			});
			// delete 方法是通过url送参数，koa-body没解析body参数
			const res = await req
				.delete(`/v2/comment/${comment!.id}`)
				.set({ Authorization: token });
			// .send({ commentid: comment!.id });
			expect(res.statusCode).toBe(200);
		});
	});

	afterAll(async () => {
		// 消除多的记录
		// const comments = await Comment.find({ where: { content: '自动化测试' } });
		// for (let v of comments) {
		// 	console.log(v);
		// 	await v.remove();
		// }
		await db.close();
		server.close();
	});
});
