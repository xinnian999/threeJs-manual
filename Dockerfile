# 使用轻量级 Node 镜像，因为 npx serve 依赖 Node
FROM crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin-common/node-18

# 设置工作目录
WORKDIR /app

# 复制整个项目到镜像
COPY . .

# 暴露端口
EXPOSE 80

# 启动命令：用 npx serve 启动当前目录
CMD ["npx", "serve", ".", "-l", "80"]
