import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import socket from 'socket.io';
import http from 'http';
import mongo from 'koa-mongo';
import { router } from './routes';
import session from 'koa-session';
import passport from 'koa-passport';
import './auth';

const app = new Koa();

// middleware
// cors
app.use(cors({
  allowHeaders: '*',
  allowMethods: '*',
}))
// log
app.use(logger())
// mongo
app.use(mongo({
  url: 'mongodb://127.0.0.1:27017/',
}))
// session
app.keys = ['fuck u all'];
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
}
const sessionMiddleware = session(CONFIG, app)
app.use(sessionMiddleware)

app
  .use(passport.initialize())
  .use(passport.session())

// auth
const excludePath = [
  '/api/login',
  '/login'
]
app.use(async (ctx, next) => {
  if (excludePath.includes(ctx.path) || ctx.isAuthenticated()) {
    await next()
    return
  } else if (ctx.isUnauthenticated()) {
    ctx.status = 401
    ctx.type = 'application/json'
    ctx.body = {
      msg: 'user not auth'
    }
    return
  }
})

// body
app.use(bodyParser())
// routes
app
  .use(router.routes())
  .use(router.allowedMethods())

const server = http.createServer(app.callback())

const io = new socket.Server(server, {
  cors: {
    origin: true,
  },
})

io.on('connection', (socket) => {
  console.log('a user connected...');
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
  console.log('Press CTRL-C to stop \n');
})

export {
  app,
}
