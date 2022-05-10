#! /bin/bash

# build gatsby image with plugins
docker build -t gatsbyjs:blog -f Dockerfile.gatsby .
# build blog image from gatsby image
docker build -t imrancio-blog:latest .
