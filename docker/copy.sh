#!/bin/sh

# 复制项目的文件到对应docker路径，便于一键生成镜像。
usage() {
	echo "Usage: sh copy.sh"
	exit 1
}

# copy html
echo "begin copy dist "
mkdir ./html/dist
cp -r ../dist/** ./html/dist

