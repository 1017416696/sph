# 打包项目

打开终端，将路径定位到项目 `sph` 根目录下运行下面的命令

```
yarn run dev
```

or

```
npm run dev
```

# 拷贝 dist 文件

将终端目录定位到 `sph/docker` 目录下运行下面的命令

``` 
sh copy.sh
```

# 构建镜像 

在 `sph/docker` 目录下运行下面的命令

``` 
docker build -t sph:1.0 .
```

# 使用镜像 

``` 
docker run -d -p 8080:8080 sph:1.0
```
