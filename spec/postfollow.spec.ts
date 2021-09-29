/*
 * @Description:喜欢帖子
 * @Version: 1.0
 * @Date: 2021-08-28 17:40:16
 * @LastEditTime: 2021-08-28 20:28:03
 */
import supertest = require('supertest');
import server from '../src/app';
import { Connection, createConnection } from 'typeorm';
import { Mysql } from '../src/config';
import { PostFollow } from '../src/models/postfollow';

describe('喜欢帖子功能测试', () => {
	const request = supertest(server);
	let db: Connection;
	let token: string;
	beforeAll(async () => {
		db = await createConnection(Mysql);
		const res: any = await request
			.post('/v2/auth/login')
			.send({ username: 'findnew', password: '123456' });
		token = JSON.parse(res.text).token;
		// console.log(token);
	});
	describe('查询喜欢帖子状态', () => {
		it('POST /v2/post/follow/:followpostid 参数齐全', async () => {
			const res = await request
				.post('/v2/post/follow/2')
				.set({ Authorization: token })
				.send({ fansusername: 'findnew' });
			// console.log(res.text);
			expect(res.statusCode).toBe(200);
		});
		it('POST /v2/post/follow/:followpostid followpostid错误', async () => {
			const res = await request
				.post('/v2/post/follow/ff')
				.set({ Authorization: token })
				.send({ fansusername: 'findnew' });
			expect(res.statusCode).toBe(400);
		});
		it('POST /v2/post/follow/:followpostid fansusername没有', async () => {
			const res = await request
				.post('/v2/post/follow/2')
				.set({ Authorization: token });
			// .send({ fansusername: 'findnew' });
			expect(res.statusCode).toBe(400);
		});
		it('POST /v2/post/follow/:followpostid fansusername错误', async () => {
			const res = await request
				.post('/v2/post/follow/2')
				.set({ Authorization: token })
				.send({ fansusername: 'snwxf' });
			expect(res.statusCode).toBe(401);
		});
	});

	describe('设置喜欢帖子状态', () => {
		it('PUT /v2/post/follow/:followpostid 参数齐全', async () => {
			const res = await request
				.put('/v2/post/follow/2')
				.set({ Authorization: token })
				.send({ fansusername: 'findnew' });
			expect(res.statusCode).toBe(200);
		});
		it('PUT /v2/post/follow/:followpostid 参数齐全 切换状态', async () => {
			const res = await request
				.put('/v2/post/follow/2')
				.set({ Authorization: token })
				.send({ fansusername: 'findnew' });
			expect(res.statusCode).toBe(200);
		});
	});

	afterAll(async () => {
		const follow = await db.manager.findOne(PostFollow, {
			where: {
				followPostid: 2,
				fansUsername: 'findnew',
			},
		});
		await db.manager.remove(follow);
		await db.close();
		server.close();
	});
});
