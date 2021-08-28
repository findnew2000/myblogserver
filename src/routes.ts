/*
 * @Description: 导入路由
 * @Version: 2.0
 * @Date: 2021-08-26 01:06:35
 * @LastEditTime: 2021-08-28 15:15:32
 */
import Router = require('koa-router');
import * as Auth from './controllers/auth';
import * as User from './controllers/user';
import * as Post from './controllers/post';
import * as Comment from './controllers/comment';
import * as Follow from './controllers/userfollow';
import * as PostFollow from './controllers/postfollow';

const v2 = new Router({
	prefix: '/v2',
});

v2.use(Auth.router.routes());
v2.use(Comment.router.routes());
v2.use(Post.router.routes());
v2.use(User.router.routes());
v2.use(Follow.router.routes());
v2.use(PostFollow.default.routes());

export default v2;
