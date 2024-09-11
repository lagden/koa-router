import { test } from 'node:test'
import assert from 'node:assert/strict'
import Koa from 'koa'
import bodyparser from '@koa/bodyparser'
import compose from 'koa-compose'

import {start, stop} from './helper/server.js'
import router from '../src/router.js'

// test('get', async () => {
// 	const middleware = ctx => {
// 		ctx.body = {
// 			alreadyMatched: ctx.alreadyMatched,
// 			routePath: ctx.routePath,
// 			path: ctx.path,
// 			params: ctx.params,
// 		}
// 	}

// 	// prettier-ignore
// 	const routes = [
// 		router.get('/:product/:company/list', middleware),
// 		router.get('/:product/:company/:id/read', middleware),
// 		router.get('/:product/:company', middleware),
// 		router.get('/:product/:company/:unit', middleware),
// 	]

// 	const koa = new Koa()
// 	koa.use(compose(routes))

// 	const {app, server} = start(koa)
// 	const results = await Promise.all([
// 		app.get('/iphone/apple/list'),
// 		app.get('/iphone/apple/123/read'),
// 		app.get('/iphone/apple'),
// 		app.get('/iphone/apple/1'),
// 	])

// 	for (const response of results) {
// 		assert.equal(response.status, 200)
// 		console.log(response.body)
// 	}

// 	await stop(server)
// })

test('post', async () => {
	const go = (ctx, next) => {
		console.log('gooooo')
		return next()
	}
	const middleware = ctx => {
		console.log('entrouuu???')
		ctx.body = 'xxx'
		// const {
		// 	alreadyMatched,
		// 	routePath,
		// 	path,
		// 	params,
		// 	body,
		// } = ctx.request

		// ctx.body = {
		// 	alreadyMatched,
		// 	routePath,
		// 	path,
		// 	params,
		// 	body,
		// }
	}

	const koa = new Koa()
	koa.use(router.post('/:product/:company/save', go, middleware))

	const {app, server} = start(koa)
	const response = await app
		.post('/galaxy/samsung/save')
		.set('content-type', 'application/json')
		.set('Accept', 'application/json')
		.send({name: 'S3'})

	assert.equal(response.status, 200)
	console.log(response.body)

	await stop(server)
})
