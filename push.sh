#!/bin/bash

git add .
git commit
git push -u origin $1
git push -u heroku $1
git push -u lab $1
git status