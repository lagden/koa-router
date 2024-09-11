import { test } from 'node:test'
import assert from 'node:assert/strict'
import Koa from 'koa'
import bodyparser from '@koa/bodyparser'
import compose from 'koa-compose'

import { start, stop } from './helper/server.js'
import router from '../src/router.js'

test('get', async () => {
	const auth = (ctx, next) => {
		ctx.state._auth = true
		return next()
	}

	const middleware = (ctx) => {
		ctx.body = {
			auth: ctx.state?._auth ?? false,
			routePath: ctx.routePath,
			path: ctx.path,
			params: ctx.params,
		}
	}

	// prettier-ignore
	const routes = [
		router.get('/:product/:company/list', auth, middleware),
		router.get('/:product/:company/:id/read', middleware),
		router.all('/:product/:company/all', middleware),
		router.get('/:product/:company', middleware),
		router.get('/:product/:company/:unit', middleware),
	]

	const koa = new Koa()
	koa.use(compose(routes))

	const { app, server } = start(koa)
	const results = await Promise.all([
		app.get('/iphone/apple/list'),
		app.get('/iphone/apple/123/read'),
		app.get('/iphone/apple'),
		app.get('/iphone/apple/1'),
		app.get('/iphone/apple/all'),
	])

	for (const response of results) {
		assert.equal(response.status, 200)
		console.log(response.body)
	}

	await stop(server)
})

test('post', async () => {
	const go1 = (ctx, next) => {
		console.log('go 1')
		return next()
	}

	const go2 = (ctx, next) => {
		console.log('go 2')
		return next()
	}

	const middleware = (ctx) => {
		const {
			routePath,
			path,
			params,
			body,
		} = ctx.request

		ctx.body = {
			routePath,
			path,
			params,
			body,
		}
	}

	const koa = new Koa()
	koa.use(router.post('/:product/:company/save', go1, go2, bodyparser(), middleware))

	const { app, server } = start(koa)
	const response = await app
		.post('/galaxy/samsung/save')
		.send({ name: 'S3' })

	assert.equal(response.status, 200)
	console.log(response.body)

	await stop(server)
})

test('get > head', async () => {
	const middleware = (ctx) => {
		ctx.body = 'ok'
	}

	const koa = new Koa()
	koa.use(router.get('/:product/:company/head', middleware))

	const { app, server } = start(koa)
	const response = await app.head('/laranja/mercado/head')

	assert.equal(response.status, 200)
	console.log(response.body)

	await stop(server)
})

test('post > head', async () => {
	const middleware = (ctx) => {
		ctx.body = 'ok'
	}

	const koa = new Koa()
	koa.use(router.del('/:product/:company/head', middleware))

	const { app, server } = start(koa)
	const response = await app.head('/laranja/mercado/head')

	assert.equal(response.status, 404)

	await stop(server)
})

test('match routePath', async () => {
	const middleware = (ctx) => {
		ctx.body = {
			routePath: ctx.routePath,
			path: ctx.path,
			params: ctx.params,
		}
	}

	const koa = new Koa()
	koa
		.use(router.get('/:product/:company/:xxx', middleware))
		.use(router.get('/:product/:company/head', middleware))

	const { app, server } = start(koa)
	const response = await app.get('/laranja/mercado/head')

	assert.equal(response.status, 200)
	console.log(response.body)

	await stop(server)
})
