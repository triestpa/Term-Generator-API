const Koa = require('koa');
const Joi = require('joi')
const generate = require('./generate')

const app = new Koa();

/** Setup schema for URL query params */
const querySchema = Joi.object().keys({
    seed: Joi.string(),
    offset: Joi.number().integer().min(0).max(10 ** 6),
    letter: Joi.string().regex(/^[A-Z]$/),
    minYear: Joi.number().integer().min(0).max(4000),
    maxYear: Joi.string().min(0).max(4000),
})

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

/** Validate Parameters */
app.use(async (ctx, next) => {
  const query = ctx.request.query
  const result = Joi.validate(query, querySchema)

  if (result.error) {
    ctx.status = 400
    ctx.body = result.error.details[0].message
  } else {
    return next()
  }
})

/** Generate words and return result */
app.use(async ctx => {
  if (ctx.request.path === '/generate') {
    const query = ctx.request.query
    const words = generate.getWords(query.seed, query.offset, query.letter,
                                    query.minYear, query.maxYear)
    ctx.body = words
  }
})

/** Log Error */
app.on('error', err => {
  console.error('server error', err)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Sever listening on *:${port}`)
})
