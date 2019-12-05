#!/usr/bin/env bash

#npm build && scp -r '../build' user@testserver:/path/to/frontend
npm run-script build:web:mainnet && scp -r './build' havenprod:/www
