import {promisify} from 'node:util'
import {createServer} from 'node:http'
import request from 'supertest'
import toPort from 'hash-to-port'
import hexId from '@tadashi/hex-id'

export function start(koa) {
	const server = createServer(koa.callback())
	return {
		server: server,
		app: request.agent(server.listen(toPort(hexId()))),
	}
}

export async function stop(server) {
	await promisify(server.close.bind(server))()
}
