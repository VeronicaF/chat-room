import Router from '@koa/router'
import passport from 'koa-passport';

const router = new Router()

router.get('/current-user', async (ctx, next) => {
  const data = {
    name: ctx.state.user.username,
  }
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
      ctx.login(user)
      ctx.body = { username: ctx.state.user.username }
    }
  })(ctx, next)
})

export {
  router,
}
