# koa-router

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[npm-img]:         https://img.shields.io/npm/v/@tadashi/koa-router.svg
[npm]:             https://www.npmjs.com/package/@tadashi/koa-router
[ci-img]:          https://github.com/lagden/koa-router/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/koa-router/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/koa-router/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/koa-router?branch=main


The simple and tiny route middleware for koa.


## Install

```
$ npm i @tadashi/koa-router
```


## Usage

Contrived example:

```js
import Koa from 'koa'
import router from '@tadashi/koa-router'

const fakeAuth = (ctx, next) => {
  ctx.state.auth = true
  return next()
}

const productMiddleware = ctx => {
  ctx.body = {
    auth: ctx.state.auth,
    id: ctx.params.id
  }
}

const app = new Koa()
app
  .use(router.get('/product/:id', fakeAuth, productMiddleware))
  .use(router.all('/', ctx => {
    ctx.body = 'nothing to see here!'
  }))

//...
```

> [!TIP]  
> It's possible to use [koa-compose](https://www.npmjs.com/package/koa-compose) to group routes.  
> See an example in [router.spec.js](./test/router.spec.js#L25-L37).

---

> [!IMPORTANT]  
> Buy me a coffee!  
> BTC: `bc1q7famhuj5f25n6qvlm3sssnymk2qpxrfwpyq7g4`


## License

MIT © [Thiago Lagden](https://github.com/lagden)
