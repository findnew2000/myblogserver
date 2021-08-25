# 表结构

> ## 用户表：user

| No  | 字段名   | 数据类型   | 默认值        |
| :-: | -------- | ---------- | ------------- |
|  1  | id       | char36     | uuid          |
|  2  | username | varchar50  | 主键          |
|  3  | password | varchar100 | argon2        |
|  4  | avatar   | varchar255 | null          |
|  5  | mood     | varchar50  | null          |
|  6  | name     | varchar30  | user.username |

> ## 关注表：userfollow

| No  | Field          | Type      | Default       |
| :-: | -------------- | --------- | ------------- |
|  1  | id             | int11     | Generate      |
|  2  | followUsername | varchar50 | user.username |
|  3  | fansUsername   | varchar50 | user.username |
|  4  | status         | boolean   | 1             |
|  5  | createtime     | Date      | Auto          |
|  6  | updatetime     | Date      | Auto          |

> ## 帖子表：post

| No  | 字段名  | 数据类型   | 默认值        |
| :-: | ------- | ---------- | ------------- |
|  1  | id      | int11      | 自增主键      |
|  2  | author  | varchar50  | user.username |
|  3  | title   | varchar200 | null          |
|  4  | content | text       | null          |
|  5  | pv      | int11      | 0             |
|  6  | avatar  | varchar200 | null          |

> ## 回帖表：comment

| No  | 字段名  | 数据类型  | 默认值        |
| :-: | ------- | --------- | ------------- |
|  1  | id      | int11     | 自增主键      |
|  2  | author  | varchar50 | user.username |
|  3  | post    | int11     | post=>id      |
|  4  | content | text      | null          |

# 接口

> ## 验证接口（AuthController）

| No  | 方法 | 路由          | ID  | 参数              | 返回值                          | 函数     |
| :-: | ---- | ------------- | :-: | ----------------- | ------------------------------- | -------- |
|  1  | post | /auth/login   |     | username,password | "Authorization":"Bearer "+token | login    |
|  2  | post | /ath/register |     | username,password | 200                             | register |

> ## 用户接口（UserController）

| No  | 方法   | 路由       | ID  | 参数 | 返回值                 | 函数           |
| :-: | ------ | ---------- | :-: | ---- | ---------------------- | -------------- |
|  1  | get    | /users     | jwt |      | user=>username list    | listUsers      |
|  2  | post   | /user/:id  | jwt |      | user=>name,avatar,mood | showUserDetail |
|  3  | put    | /users/:id |     |      |                        | updateUser     |
|  4  | delete | /users/:id |     |      |                        | deleteUser     |

> ## 帖子接口（PostController）

| No  | 方法   | 路由              | ID  | 参数                | 返回值                               | 函数         |
| :-: | ------ | ----------------- | :-: | ------------------- | ------------------------------------ | ------------ |
|  1  | get    | /api/posts        | jwt |                     | posts=>id author title pv            | getListPosts |
|  2  | get    | /api/post/:postid |     |                     | post=>all comment=>id author content | getPost      |
|  3  | post   | /api/post/:id     | jwt | title content image |                                      | postPost     |
|  4  | put    | /api/post/:id     |     |                     |                                      | putPost      |
|  5  | delete | /api/post/:id     |     |                     |                                      | deletePost   |
|  6  | post   | /api/upload/:id   | jwt | file                | url / 401                            | uploadFile   |

> ## 回帖接口（CommentController）

| No  | Method | Route            | ID  | Param          | Return | Func          |
| :-: | ------ | ---------------- | :-: | -------------- | ------ | ------------- |
|  1  | post   | /api/comment/:id | jwt | postid content |        | postComment   |
|  2  | delete | /api/comment/:id |     |                |        | deleteComment |

> ## 关注接口（FollowController）

| No  | Method | Route                 | ID  | Param          | Return     | Func    |
| :-: | ------ | --------------------- | :-: | -------------- | ---------- | ------- |
|  1  | post   | /api/follow/:id       | jwt | followusername | true/flase | setFans |
|  2  | post   | /api/followstatus/:id | jwt | followusername | true/flase | getFans |
