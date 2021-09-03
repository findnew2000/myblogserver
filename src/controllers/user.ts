/*
 * @Description: 用户账户
 * @Version: 2.0
 * @Date: 2021-08-26 01:06:35
 * @LastEditTime: 2021-09-04 01:03:42
 */
import Router = require('koa-router');
import { Context } from 'koa';
import { User } from '../models/user';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import * as argon from 'argon2';

const router = new Router({
	prefix: '/user',
});

/**
 * @description: get /user
 * @param {jwt} token
 * @return {*} [username]
 */
router.get('/', async (ctx: Context) => {
	let jwtid: string = '';
	if (!ctx.header.authorization) ctx.throw(404);
	let playload = ctx.header.authorization.split(' ');
	jwt.verify(playload![1], JWT_SECRET, (e, dec) => {
		jwtid = dec?.id!;
	});

	let user = await User.findOne({
		select: ['username'],
		where: {
			id: jwtid,
		},
	});
	if (!user) ctx.throw(401, '没有登陆');

	const users = await User.find({
		select: ['username'],
	});

	ctx.status = 200;
	ctx.body = users;
});

/**
 * @description: get /user/:id 列出用户详细信息
 * @param {jwt} token
 * @return {*} {name,avatar,mood} | 401
 */
router.get('/:id', async (ctx: Context) => {
	// const username = ctx.state.user.sub;
	// console.log(username, ctx.params.id);
	// if (username !== ctx.params.id) ctx.throw(401, '没有登录');
	const user = await User.findOne({
		select: ['name', 'avatar', 'mood', 'backimage', 'gender', 'address', 'bp'],
		where: { username: ctx.params.id },
	});
	if (!user) ctx.throw(401, '没有此用户');
	ctx.status = 200;
	ctx.body = user;
});

/**
 * @description: 更改用户信息
 * @param {string} id
 * @param {jwt} token
 * @param {string} {oldpass,newpass,ava,img,moo,name,gender,add}
 * @return {boolean}
 */
router.put('/:id', async (ctx: Context) => {
	const auth = ctx.state.user.sub;
	const target = ctx.params.id;
	if (auth !== target) ctx.throw(401);
	const { oldpass, newpass, ava, img, moo, name, gender, add } =
		ctx.request.body;
	let user = await User.findOne({
		select: [
			'username',
			'password',
			'avatar',
			'backimage',
			'mood',
			'name',
			'gender',
			'address',
		],
		where: {
			username: auth,
		},
	});
	if (!user) ctx.throw(400);
	if (newpass) {
		if (
			/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
				newpass
			)
		) {
			if (await argon.verify(user.password, oldpass)) {
				user.password = await argon.hash(newpass);
			} else ctx.throw(401);
		} else ctx.throw(400);
	}

	user.avatar = ava ?? user.avatar;
	user.backimage = img ?? user.backimage;
	user.mood = moo ?? user.mood;
	user.name = name ?? user.name;
	user.gender = gender ?? user.gender;
	user.address = add ?? user.address;
	// console.warn(user);
	await user.save();

	ctx.status = 200;
	ctx.body = { message: true };
});

router.delete('/:id', async (ctx: Context) => {
	// TODO 暂时不删除用户
	const user = ctx.state.user.sub;
});

export { router };
