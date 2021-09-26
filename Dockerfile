# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.194.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="14-buster"
FROM node:14.17.1-alpine

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-list -here>"
# 设置时区
ENV TIME_ZONE=Asia/Shanghai

# 在容器内运行命令
RUN \
  mkdir -p /usr/src/app \
  && apk add --no-cache tzdata \
  && echo "${TIME_ZONE}" > /etc/timezone \ 
  && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime 

# 创建 docker 工作目录
WORKDIR /usr/src/app

# 拷贝，把本机当前目录下的 package.json 拷贝到 Image 的 /usr/src/app/ 文件夹下
COPY package*.json ./

# 使用 npm 安装 app 所需要的所有依赖
# RUN npm i

RUN npm install node-gyp nodemon cross-env  -g --registry=https://registry.npm.taobao.org
RUN npm install --registry=https://registry.npm.taobao.org

# 拷贝本地的所有文件到路径中去
COPY . .

# 暴露端口。如果程序是一个服务器，会监听一个或多个端口，可以用 EXPOSE 来表示这个端口
EXPOSE 3001

# 给容器指定一个执行入口
CMD npm run start