/*
 * @Description:帖子测试
 * @Version: 1.0
 * @Date: 2021-08-28 21:57:21
 * @LastEditTime: 2021-08-29 02:26:55
 */
import server from '../src/app';
import supertest = require('supertest');
import { Mysql } from '../src/config';
import { createConnection, Connection } from 'typeorm';
import { Post } from '../src/models/post';
import UpFile from '../src/util/upfile';
import * as fs from 'fs';

describe('帖子功能测试', () => {
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

	describe('GET /v2/post/list?id=x&len=y&kind=z帖子列表', () => {
		it('列出帖子', async () => {
			const res = await req
				.get('/v2/post/list')
				.query({ postid: 1, len: 10, kind: 0 });
			expect(res.statusCode).toBe(200);
			expect(JSON.parse(res.text).length).toBe(10);
		});
	});

	describe('POST /v2/post/upload/:id 文件上传', () => {
		it('参数正确', async () => {
			const res = await req
				.post('/v2/post/upload/findnew')
				.set({ Authorization: token })
				.attach('file', 'README.md');
			expect(res.statusCode).toBe(200);
			expect(JSON.parse(res.text).message).toMatch(/^http:\/\//);
		});
	});

	describe('GET /v2/post/:postid 显示帖子内容', () => {
		it('参数正确', async () => {
			const res = await req.get('/v2/post/2');
			expect(res.statusCode).toBe(200);
			expect(JSON.parse(res.text).post.id).toBe(2);
		});
	});

	describe('POST /v2/post/:id 发帖', () => {
		it('参数正确', async () => {
			const res = await req
				.post('/v2/post/findnew')
				.set({ Authorization: token })
				.send({ title: '自动化测试', content: '无内容', kind: 0 });
			expect(res.statusCode).toBe(200);
		});
	});

	describe('DELETE /v2/post/:postid 删帖', () => {
		it('参数正确', async () => {
			const post = await Post.findOne({
				select: ['id'],
				where: {
					title: '自动化测试',
				},
			});
			const res = await req
				.delete(`/v2/post/${post!.id}`)
				.set({ Authorization: token });
			expect(res.statusCode).toBe(200);
		});
	});

	describe('PUT /v2/post/:postid 改贴', () => {
		it('参数正确', async () => {
			const res = await req
				.put('/v2/post/2')
				.set({ Authorization: token })
				.send({
					title: '自动化测试修改',
					content: '自动化测试修改的内容',
				});
			expect(res.statusCode).toBe(200);
		});
	});

	afterAll(async () => {
		// 删除上传的README.md改名后的文件，如果之后目录空也删除
		let path = __dirname.split('/').slice(0, -1).join('/');
		path += '/public/uploads/' + UpFile.getUpDirName();
		let filenames = fs.readdirSync(path);
		let filename: string;
		for (let v of filenames) {
			if (v.split('.')[1] === 'md') {
				filename = path + '/' + v;
				fs.unlinkSync(filename);
			}
			break;
		}
		filenames = fs.readdirSync(path);
		if (filenames.length === 0) fs.rmdirSync(path);

		await db.close();
		server.close();
	});
});
