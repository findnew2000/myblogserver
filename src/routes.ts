import Router = require('koa-router');
import AuthController from './controllers/auth';
import UserController from './controllers/user';
import PostController from './controllers/post';
import CommentController from './controllers/comment';
import FollowController from './controllers/userfollow';

const router = new Router();

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

export { router };
