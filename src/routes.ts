/*
 * @Description: 导入路由
 * @Version: 2.0
 * @Date: 2021-08-26 01:06:35
 * @LastEditTime: 2021-08-26 22:38:08
 */
import Router = require('koa-router');
import * as Auth from './controllers/auth';
import * as User from './controllers/user';
import * as Post from './controllers/post';
import * as Comment from './controllers/comment';
import * as Follow from './controllers/userfollow';

const v2 = new Router({
	prefix: '/v2',
});

v2.use(Auth.router.routes());
v2.use(Comment.router.routes());
v2.use(Post.router.routes());
v2.use(User.router.routes());
v2.use(Follow.router.routes());

export default v2;

/* const router = new Router();

router.post('/auth/login', AuthController.login); //
router.post('/auth/register', AuthController.register); //

router.get('/users', UserController.listUsers);
router.get('/user/:id', UserController.showUserDetail);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

router.post('/api/upload/:id', PostController.uploadFile);
router.get('/api/posts', PostController.getListPosts); //
router.get('/api/post/:postid', PostController.getPost); //
router.post('/api/post/:id', PostController.postPost); //
router.put('/api/post/:id', PostController.putPost);
router.delete('/api/post/:id', PostController.deletePost);

router.post('/api/comment/:id', CommentController.postComment); //
router.delete('/api/comment/:id', CommentController.deleteComment);

router.post('/api/follow/:id', FollowController.setFans);
router.post('/api/followstatus/:id', FollowController.getFans);

export { router }; */
