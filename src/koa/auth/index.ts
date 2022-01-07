import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local'

const users = new Set<string>()

const fetchUser = (() => {
  // This is an example! Use password hashing in your project and avoid storing passwords in your code
  return async function (username: string) {
    users.add(username)
    return { username }
  }
})()

passport.serializeUser(function(user, done) {
  // @ts-ignore
  if (user.username) {
    // @ts-ignore
    users.add(user.username)
  }
  // @ts-ignore
  done(null, user.username)
})

passport.deserializeUser<string>(async function(username, done) {
  try {
    const user = await fetchUser(username)
    done(null, user)
  } catch(err) {
    done(err)
  }
})

const excludePath = [
  '/api/login',
]

passport.use(new LocalStrategy(function(username, password, done) {
  fetchUser(username)
    .then(user => {
      console.log(username, user, [...users])
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch(err => done(err))
}))

