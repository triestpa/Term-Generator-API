const Koa = require('koa')
const serve = require('koa-static')
const mount = require('koa-mount');
const Joi = require('joi')
const generator = require('./generator')

const app = new Koa();

/** Setup Default Handler Middleware */

/** Log Requests */
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
})

/** Set Default Headers */
app.use(async (ctx, next) => {
  // Allow CORS
  ctx.set('Access-Control-Allow-Origin', '*');
  return next()
})

/** Log Error */
app.on('error', err => {
  console.error('server error', err)
})


/** Serve the sample page */
const htmlPageServer = new Koa();
htmlPageServer.use(serve('public'))
app.use(mount('/', htmlPageServer))

/** Setup term generator API route */
const termGenerateServer = new Koa();

/** Setup schema for URL query params */
const querySchema = Joi.object().keys({
    seed: Joi.string(),
    offset: Joi.number().integer().min(0).max(10 ** 6),
    letter: Joi.string().regex(/^[A-Z]$/),
    minYear: Joi.number().integer().min(0).max(4000),
    maxYear: Joi.string().min(0).max(4000),
})

/** Validate Parameters */
termGenerateServer.use(async (ctx, next) => {
  const query = ctx.request.query
  const result = Joi.validate(query, querySchema)

  if (result.error) {
    ctx.status = 400
    ctx.body = result.error.details[0].message
  } else {
    return next()
  }
})

/** Generate psuedorandom values */
termGenerateServer.use(async (ctx) => {
  const query = ctx.request.query
  const words = generator.getWords(query.seed, query.offset, query.letter,
                                  query.minYear, query.maxYear)
  ctx.body = words
})

/** Validate input, generate words, and return result */
app.use(mount('/api', termGenerateServer))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Sever listening on *:${port}`)
})
