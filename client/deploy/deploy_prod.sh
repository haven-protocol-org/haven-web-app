#!/usr/bin/env bash

#npm build && scp -r '../build' user@testserver:/path/to/frontend
npm run-script build:production && scp -r '../build' myserver:~/frontend
