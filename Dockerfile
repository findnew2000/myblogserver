# 第一级（阶段）创建指令
# FROM node:14-alpine as builder

# ARG NODE_ENV=development
# ENV NODE_ENV=${NODE_ENV}

# RUN apk --no-cache add python make g++

# COPY package*.json ./
# RUN npm install

# # 第二级（阶段）创建指令
# FROM node:10-alpine

# WORKDIR /usr/src/app
# COPY --from=builder node_modules node_modules

# COPY . .

# CMD [ "npm", “run”, "start:prod" ]

#ARG VARIANT="14-buster"
FROM node:14-alpine

# 设置时区
#ENV TIME_ZONE=Asia/Shanghai
# 在容器内运行命令
# RUN \
#   mkdir -p /usr/src/app \
#   && apk add --no-cache tzdata \
#   && echo "${TIME_ZONE}" > /etc/timezone \ 
#   && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime 

# 创建 docker 工作目录
WORKDIR /usr/src/app

# 拷贝，把本机当前目录下的 package.json 拷贝到 Image 的 /usr/src/app/ 文件夹下
COPY package*.json ./
COPY *pem ./
# 拷贝本地的所有文件到路径中去
COPY lib ./

# 使用 npm 安装 app 所需要的所有依赖
# RUN npm i

ENV NODE_ENV=production
RUN \
  npm install node-gyp -g --registry=https://registry.npm.taobao.org \
  && npm install --registry=https://registry.npm.taobao.org \
  && npm uninstall node-gyp -g


# 暴露端口。如果程序是一个服务器，会监听一个或多个端口，可以用 EXPOSE 来表示这个端口
EXPOSE 3001

# 给容器指定一个执行入口
CMD node src/app