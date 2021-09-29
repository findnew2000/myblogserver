/*
 * @Description:系统配置
 * @Version: 2.0
 * @Date: 2021-08-27 02:54:22
 * @LastEditTime: 2021-09-30 01:23:05
 */
export const JWT_SECRET = 'thisaresecretkey';
export const WebServerPort = 3001;
export const ServerName = 'http://findnew.ddns.net:3001';

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
