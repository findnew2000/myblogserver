/*
 * @Description:用户关注
 * @Version: 1.0
 * @Date: 2021-09-04 01:07:46
 * @LastEditTime: 2021-09-04 01:24:49
 */
import server from '../src/app';
import supertest = require('supertest');
import { createConnection, Connection } from 'typeorm';
import { Mysql } from '../src/config';

describe('用户关注接口测试', () => {
	const req = supertest(server);
	let db: Connection;
	let token: string;

	beforeAll(async () => {
		db = await createConnection(Mysql);
		const res = await req
			.post('/v2/auth/login')
			.send({ username: 'findnew', password: '123456' });
		token = JSON.parse(res.text).token;
	});

	it('/v2/follow/:id', async () => {
		const res = await req
			.post('/v2/follow/findnew')
			.set({ Authorization: token })
			.send({ followUsername: 'snwxf' });
		expect(res.status).toBe(200);
		expect(JSON.parse(res.text).message).toBe(true);
	});

	it('/v2/follow/:id', async () => {
		let res = await req
			.put('/v2/follow/findnew')
			.set({ Authorization: token })
			.send({ followUsername: 'snwxf' });
		expect(res.status).toBe(200);
		expect(JSON.parse(res.text).message).toBe(false);
		res = await req
			.put('/v2/follow/findnew')
			.set({ Authorization: token })
			.send({ followUsername: 'snwxf' });
		expect(res.status).toBe(200);
		expect(JSON.parse(res.text).message).toBe(true);
	});

	afterAll(async () => {
		await db.close();
		server.close();
	});
});
