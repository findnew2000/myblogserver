/*
 * @Description:用户测试
 * @Version: 1.0
 * @Date: 2021-09-01 15:40:33
 * @LastEditTime: 2021-09-04 01:04:33
 */
import server from '../src/app';
import supertest = require('supertest');
import { createConnection, Connection } from 'typeorm';
import { Mysql } from '../src/config';

describe('用户接口', () => {
	let db: Connection;
	const req = supertest(server);
	let token: string;
	beforeAll(async () => {
		db = await createConnection(Mysql);
		const res = await req
			.post('/v2/auth/login')
			.send({ username: 'findnew', password: '123456' });
		token = JSON.parse(res.text).token;
		// console.warn(token);
	});

	it('GET /v2/user 列出所有用户', async () => {
		const res = await req.get('/v2/user').set({ Authorization: token });
		expect(res.statusCode).toBe(200);
		expect(JSON.parse(res.text)).toHaveLength(4);
	});

	it('GET /v2/user/:username', async () => {
		const res = await req.get('/v2/user/findnew').set({ Authorization: token });
		expect(res.statusCode).toBe(200);
		expect(JSON.parse(res.text)).toHaveProperty('name');
	});

	it('PUT /v2/user/:username', async () => {
		const res = await req
			.put('/v2/user/findnew')
			.set({ Authorization: token })
			.send({ moo: 'happy' });
		expect(res.statusCode).toBe(200);
	});

	it('DELETE /v2/user/:username', async () => {
		// TODO 未实现此路由
		const res = await req
			.delete('/v2/user/findnew')
			.set({ Authorization: token });
	});

	afterAll(async () => {
		await db.close();
		server.close();
	});
});
