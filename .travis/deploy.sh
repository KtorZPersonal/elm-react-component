#!/bin/sh

git add .
git commit -m "Prepare deploy"
git subtree push -P dist deploy build </dev/null >/dev/null 2>/dev/null
