#! /bin/bash

docker build -t gatsbyjs:blog -f gatsbyjs.Dockerfile .
docker build -t blog:latest .