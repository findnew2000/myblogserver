# 表结构

> ## 用户表：User

| No  | 字段名     | 数据类型   | 默认值        | 备注   |
| :-: | ---------- | ---------- | ------------- | ------ |
|  1  | id         | char36     | uuid          |        |
|  2  | username   | varchar50  | 主键          | 用户名 |
|  3  | password   | varchar100 | argon2        | 密码   |
|  4  | avatar     | varchar255 | null          | 头像   |
|  5  | backimage  | varchar255 | null          | 背景图 |
|  6  | mood       | varchar50  | null          | 心情   |
|  7  | name       | varchar30  | user.username | 昵称   |
|  8  | gender     |            | Uknown        | 性别   |
|  9  | address    | varchar200 | null          | 地址   |
| 10  | bp         | int        | 0             | 积分   |
| 11  | createdate | Date       |               ||
| 12  | updatadate | Date       |               ||
| 13  | version    | int        |              ||

> ## 关注表：UserFollow

| No  | Field          | Type      | Default       |
| :-: | -------------- | --------- | ------------- |
|  1  | id             | int11     | Generate      |
|  2  | followUsername | varchar50 | user.username |
|  3  | fansUsername   | varchar50 | user.username |
|  4  | status         | boolean   | 1             |
|  5  | createtime     | Date      | Auto          |
|  6  | updatetime     | Date      | Auto          |

> ## 帖子表：Post

|  No  | 字段名     | 数据类型   | 默认值        | 备注         |
| :--: | ---------- | ---------- | ------------- | ------------ |
|  1   | id         | int11      | 自增主键      |              |
|  2   | author     | varchar50  | user.username | 用户名       |
|  3   | kindid     | int11      | 1             | 论坛分类     |
|  4   | title      | varchar200 | string        | 标题         |
|  5   | content    | text       | string        | 内容         |
|  6   | pv         | int11      | 0             | 浏览量       |
|  7   | avatar     | varchar200 | null          | 图片         |
|  8   | createtime | Date       |               | 发帖时间     |
|  9   | updatetime | Date       |               | 最后修改时间 |

> ## 帖子喜欢表：PostFollow

| No  | 字段名       | 数据类型  | 默认值        | 备注           |
| :-: | ------------ | --------- | ------------- | -------------- |
|  1  | id           | int11     | 自增主键      |                |
|  2  | followPostid | int11     | post.id       | 被喜欢帖子 id  |
|  3  | fansUsername | varchar50 | user.username | 喜欢帖子用户名 |
|  4  | status       | boolean   | true          | 喜欢状态       |
|  5  | createtime   | Date      |               |                |
|  6  | updatetime   | Date      |               |                |

> ## 帖子点赞表：PostOK

| No  | 字段名     | 数据类型  | 默认值        | 备注           |
| :-: | ---------- | --------- | ------------- | -------------- |
|  1  | id         | int11     | 自增主键      |                |
|  2  | okPostid   | int11     | post.id       | 被点赞帖子 id  |
|  3  | okUsername | varchar50 | user.username | 点赞帖子用户名 |
|  4  | status     | boolean   | true          | 点赞状态       |
|  5  | createtime | Date      |               |                |
|  6  | updatetime | Date      |               |                |

> ## 回帖表：Comment

| No  | 字段名  | 数据类型  | 默认值        | 备注        |
| :-: | ------- | --------- | ------------- | ----------- |
|  1  | id      | int11     | 自增主键      |             |
|  2  | author  | varchar50 | user.username | 用户名      |
|  3  | post    | int11     | post.id       | 所属帖子 id |
|  4  | content | text      | string        | 评论内容    |

> ## 分类表：Kind

| No  | 字段名     | 数据类型   | 默认值   | 备注     |
| :-: | ---------- | ---------- | -------- | -------- |
|  1  | id         | int11      | 自增主键 |          |
|  2  | name       | varchar50  | string   | 分类名称 |
|  3  | pio        | varchar200 | string   | 分类介绍 |
|  4  | avatar     | varchar255 | string   | 图片链接 |
|  5  | createtime | Date       |          |          |

> ## 帖子分类表：KindFollow

| No  | 字段名     | 数据类型 | 默认值   | 备注        |
| :-: | ---------- | -------- | -------- | ----------- |
|  1  | id         | int11    | 自增主键 |             |
|  2  | followKind | int11    | 1        | 所属分类 ID |
|  3  | fansPostId | int11    | 1        | 帖子 ID     |
|  4  | status     | boolean  | true     | 从属状态    |

> ## 用户关注分类表：KindFollowUser

| No  | 字段名       | 数据类型  | 默认值        | 备注            |
| :-: | ------------ | --------- | ------------- | --------------- |
|  1  | id           | int11     | 自增主键      |                 |
|  2  | followKind   | int11     | 1             | 被关注的分类 ID |
|  3  | fansUsername | varchar50 | user.username | 关注用户名      |
|  4  | status       | boolean   | true          | 关注状态        |
|  5  | createtime   | Date      |               |                 |
|  6  | updatetime   | Date      |               |                 |

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

|  No  | Method | Route                      |  ID  | Params                    | Return                             |
| :--: | ------ | -------------------------- | :--: | ------------------------- | ---------------------------------- |
|  1   | get    | /post/list                 |      |                           | [{id,author,title,pv}]             |
|  2   | get    | /post/:postid              |      |                           | {post=>all, [{id,author,content}]} |
|  3   | post   | /post/:id                  | jwt  | title content image       |                                    |
|  4   | put    | /post/:id                  |      |                           |                                    |
|  5   | delete | /post/:id                  |      |                           |                                    |
|  6   | post   | /post/upload/:id           | jwt  | file                      | url / 401                          |
|  7   | put    | /post/follow/:followpostid | jwt  | followpostid,fansusername | true/false                         |
|  8   | post   | /post/follow/:followpostid | jwt  | followpostid,fansusername | true/falseuser                     |

> ## 回帖接口（Comment）

|  No  | Method | Route               |  ID  | Param          | Return |
| :--: | ------ | ------------------- | :--: | -------------- | ------ |
|  1   | post   | /comment/:id        | jwt  | postid content |        |
|  2   | delete | /comment/:commentid | jwt  |                |        |

> ## 关注接口（Follow）

| No  | Method | Route       | ID  | Param          | Return     |
| :-: | ------ | ----------- | :-: | -------------- | ---------- |
|  1  | put    | /follow/:id | jwt | followusername | true/flase |
|  2  | post   | /follow/:id | jwt | followusername | true/flase |
