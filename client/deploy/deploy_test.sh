#!/usr/bin/env bash

npm run-script build:test && scp -r '../build' myserver:~/frontend
