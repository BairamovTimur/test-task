develop:
	npx webpack-dev-server

install:
	npm install

build:
	rm -rf dist
	NODE_ENV=production npx webpack

start:
	npx webpack-dev-server

lint:
	npx eslint .
