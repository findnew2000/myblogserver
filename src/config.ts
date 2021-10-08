/*
 * @Description:系统配置
 * @Version: 2.0
 * @Date: 2021-08-27 02:54:22
 * @LastEditTime: 2021-10-05 22:25:04
 */
export const JWT_SECRET = 'thisaresecretkey';
export const WebServerPort = 3001;
export const ServerName = 'https://www.snmimi.ml:3000';

import { ConnectionOptions } from 'typeorm';
import { User } from './models/user';
import { Post } from './models/post';
import { Comment } from './models/comment';
import { UserFollow } from './models/userfollow';
import { PostFollow } from './models/postfollow';

export const Mysql: ConnectionOptions = {
	type: 'mysql',
	host: 'n1.lan',
	port: 3306,
	username: 'root',
	password: 'Wanlov2008',
	database: 'test',
	synchronize: true,
	entities: [User, Post, Comment, UserFollow, PostFollow],
};
