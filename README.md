# koa-router

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![Snyk badge][snyk-img]][snyk]

[npm-img]:         https://img.shields.io/npm/v/@tadashi/koa-router.svg
[npm]:             https://www.npmjs.com/package/@tadashi/koa-router
[ci-img]:          https://github.com/lagden/koa-router/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/koa-router/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/koa-router/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/koa-router?branch=main
[snyk-img]:        https://snyk.io/test/github/lagden/koa-router/badge.svg
[snyk]:            https://snyk.io/test/github/lagden/koa-router


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

> [!INFORMATION]  
> It's possible to use `koa-compose` to group routes.  
> See an example in [router.spec.js](https://github.com/lagden/koa-router/blob/main/test/router.spec.js#L26-L35).

---

> [!IMPORTANT]  
> Buy me a coffee!  
> BTC: `bc1q7famhuj5f25n6qvlm3sssnymk2qpxrfwpyq7g4`


## License

MIT © [Thiago Lagden](https://github.com/lagden)
