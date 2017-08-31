start:
			npm run nodemon -- --exec npm run gulp server

build:
			rm -rf dist
			npm run build

lint:
			npm run eslint -- src

test:
			npm run test

testwatch:
			npm run testwatch

testtasks:
			npm run test __tests__/tasks.test.js

db:
			npm run babel-node -- src/db/db.js
