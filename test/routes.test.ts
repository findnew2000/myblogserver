/*
 * @Description:http test
 * @Version: 1.0
 * @Date: 2021-08-26 23:23:12
 * @LastEditTime: 2021-08-27 01:34:59
 */
import server from '../src/app';
import request = require('supertest');

it('login', async () => {
	const res = await request(server.callback()).post('/v2/auth/login').send({
		username: 'findnew',
		password: '123456',
	});
	console.log(res.statusCode);
});
