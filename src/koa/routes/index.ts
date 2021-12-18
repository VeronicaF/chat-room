import Router from '@koa/router'
import passport from 'koa-passport';

const router = new Router()

router.get('/', async (ctx, next) => {
  const data = await ctx.mongo
    .db('test')
    .collection('users')
    .find({}, { projection: { _id: 0 } })
    .toArray()
  ctx.body = JSON.stringify(data)
  await next()
})

router.post('/login', async (ctx, next) => {
  passport.authenticate('local', (err, user, msg, status, ...others) => {
    if (user === false) {
      ctx.body = { success: false, msg, }
      ctx.status = status
      return
    } else {
      ctx.body = { success: true }
      return ctx.login(user)
    }
  })(ctx, next)
})

export {
  router,
}
