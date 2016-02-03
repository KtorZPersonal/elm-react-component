#!/bin/sh

GH_REPO=$(basename `git rev-parse --show-toplevel`)
GH_REMOTE=$(git remote -v | head -n 1 | sed "s/.*github.com\/\([0-9a-zA-Z_-]*\)\/.*/\1/g")

git config --local user.name $GH_USER
git config --local user.username $GH_USER

git remote add deploy https://$GH_USER:$GH_TOKEN@github.com/$GH_REMOTE/$GH_REPO.git
