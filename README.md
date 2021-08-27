<!--
 * @Description:
 * @Version: 1.0
 * @Date: 2021-08-14 20:04:57
 * @LastEditTime: 2021-08-27 17:49:52
-->

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

# 接口 http://server/v2

> ## 验证接口（Auth）

| No  | Method | Route          | ID  | Params            | Return                          |
| :-: | ------ | -------------- | :-: | ----------------- | ------------------------------- |
|  1  | post   | /auth/login    |     | username,password | "Authorization":"Bearer "+token |
|  2  | post   | /auth/register |     | username,password | 200                             |

> ## 用户接口（User）

| No  | Method | Route      | ID  | Params | Return                 |
| :-: | ------ | ---------- | :-: | ------ | ---------------------- |
|  1  | get    | /user      | jwt |        | user=>username list    |
|  2  | get    | /user/:id  |     |        | user=>name,avatar,mood |
|  3  | put    | /users/:id |     |        |                        |
|  4  | delete | /users/:id |     |        |                        |

> ## 帖子接口（Post）

| No  | Method | Route            | ID  | Params              | Return                             |
| :-: | ------ | ---------------- | :-: | ------------------- | ---------------------------------- |
|  1  | get    | /post/list       |     |                     | [{id,author,title,pv}]             |
|  2  | get    | /post/:postid    |     |                     | {post=>all, [{id,author,content}]} |
|  3  | post   | /post/:id        | jwt | title content image |                                    |
|  4  | put    | /post/:id        |     |                     |                                    |
|  5  | delete | /post/:id        |     |                     |                                    |
|  6  | post   | /post/upload/:id | jwt | file                | url / 401                          |

> ## 回帖接口（Comment）

| No  | Method | Route        | ID  | Param          | Return |
| :-: | ------ | ------------ | :-: | -------------- | ------ |
|  1  | post   | /comment/:id | jwt | postid content |        |
|  2  | delete | /comment/:id |     |                |        |

> ## 关注接口（Follow）

| No  | Method | Route       | ID  | Param          | Return     |
| :-: | ------ | ----------- | :-: | -------------- | ---------- |
|  1  | put    | /follow/:id | jwt | followusername | true/flase |
|  2  | post   | /follow/:id | jwt | followusername | true/flase |
