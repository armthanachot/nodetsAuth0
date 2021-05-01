/*
 * Copyright (C) 2020 Depwhite Software
 *
 * This file is part of the Depwhite Software project.
 *
 * Depwhite Software project can not be copied and/or distributed without the express
 */

import * as express from "express"
import * as bodyParser from "body-parser"
import { APP } from "./env/production"
/**
 * ROUTER
 */
import router from "../app/routes/index.route"
import * as passport from "passport"
import * as cookieSession from "cookie-session"
import * as GoogleStrategy from "passport-google-oauth20"
import * as Auth0Strategy from "passport-auth0"
import * as cors from "cors"
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
  // User.findById(id,(err,user) => {
  // })
})

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: "429844871156-up6ij1ua1ooc34i1j7e9pjj77aq8p1gs.apps.googleusercontent.com",
      clientSecret: "KwWFZIJ4qGKN1aYCDrvBhXA6",
      callbackURL: "http://localhost:4400/login/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("accessToken: ",accessToken)
      // console.log("refreshToken: ",refreshToken)
      // console.log("profile: ",profile)
      return done(null, profile)
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   })
    }
  )
)
const auth0Strategy = new Auth0Strategy(
  {
    domain: "maam.axa.com/maam/v2",
    clientID: "ff1ae215",
    clientSecret: "12345678",
    callbackURL: "https://maam.axa.com/maam/v2/api/v1/oauth2-redirect.html",
    passReqToCallback: false,
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    //
    // State value is in req.query.state ...
    //
    return done(null, profile)
  }
)
passport.use(auth0Strategy)

class App {
  public express: express.Application
  constructor() {
    this.express = express()
    this.express.use(cors())
    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
      res.header("Access-Control-Allow-Headers", "Content-Type, Option, Authorization")
      next()
    })
    this.express.use(
      cookieSession({
        name: "my-session",
        keys: ["key1", "key2"],
      })
    )
    this.express.use(passport.initialize())
    this.express.use(passport.session())
    const isLoggedIn = (req, res, next) => {
      if (req.user) {
        return next()
      } else {
        return res.status(401).json({ message: "INVALID" })
      }
    }
    this.express.get("/", (req, res) => {
      return res.send("You are not logged in")
    })
    this.express.get("/failed", (req, res) => {
      return res.send("Login Fail")
    })
    this.express.get("/good", isLoggedIn, (req: any, res) => {
      return res.send("Login Success")
    })
    this.express.get("/login", passport.authenticate("google", { scope: ["profile", "email"] }))
    this.express.get("/login/callback", passport.authenticate("google", { failureRedirect: "/failed" }), (req: any, res) => {
      console.log("user: ", req.user)
      console.log("headers: ", req.headers)
      return res.send("Logged In")
      // return res.redirect("/good")
    })
    this.express.get("/logout", (req, res) => {
      return res.redirect("/")
    })

    // axa
    const scope = "urn:axa:maam:management:read urn:axa:maam:management:write urn:axa:maam:session:read"
    this.express.get("/login/axa", passport.authenticate("auth0",{scope}))
    this.setup()
    this.mountRoutes()
  }

  private mountRoutes(): void {
    router(this.express)
  }

  private setup(): void {
    /**
     * Setting application local variables
     */
    this.express.locals.title = APP.title
    this.express.locals.description = APP.description
    this.express.locals.keywords = APP.keywords

    // let express support JSON bodies
    this.express.use(bodyParser.json())
  }
}

export default new App().express
