/*
 * @Description:注册和登陆
 * @Version: 1.0
 * @Date: 2021-08-28 12:48:42
 * @LastEditTime: 2021-08-28 19:23:43
 */
import supertest = require('supertest');
import server from '../src/app';
import { Connection, createConnection } from 'typeorm';
import { Mysql } from '../src/config';
import { User } from '../src/models/user';

describe('api测试', () => {
	const request = supertest(server);
	let db: Connection;
	beforeAll(async () => {
		db = await createConnection(Mysql);
	});

	describe('POST /v2/auth/login', () => {
		it('错误密码', async () => {
			const res = await request
				.post('/v2/auth/login')
				.send({ username: 'findnew', password: '12345' });
			expect(res.statusCode).toEqual(401);
		});
		it('错误用户', async () => {
			const res = await request
				.post('/v2/auth/login')
				.send({ username: 'abc' });
			expect(res.statusCode).toBe(401);
		});
		it('正确用户和密码', async () => {
			const res = await request
				.post('/v2/auth/login')
				.send({ username: 'findnew', password: '123456' });
			expect(res.statusCode).toBe(200);
		});
	});

	describe('POST /v2/auth/register', () => {
		it('已存在用户名', async () => {
			const res = await request
				.post('/v2/auth/register')
				.send({ username: 'findnew', password: 'Abc12?' });
			expect(res.statusCode).toBe(401);
		});
		it('不合规用户名', async () => {
			const res = await request
				.post('/v2/auth/register')
				.send({ username: 'abc' });
			expect(res.statusCode).toBe(401);
		});
		it('不合规密码', async () => {
			const res = await request
				.post('/v2/auth/register')
				.send({ username: 'abcdef', password: '12345' });
			expect(res.statusCode).toBe(401);
		});
		it('合规用户名密码', async () => {
			const res = await request
				.post('/v2/auth/register')
				.send({ username: 'abcdefg', password: 'Abc12?' });
			expect(res.statusCode).toBe(200);
		});
	});

	afterAll(async () => {
		const user = new User();
		user.username = 'abcdefg';
		await db.manager.remove(user);
		await db.close();
		server.close();
	});
});
