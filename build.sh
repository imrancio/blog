#! /bin/bash

docker build -t gatsbyjs:blog -f gatsby.Dockerfile .
docker build -t blog:latest .