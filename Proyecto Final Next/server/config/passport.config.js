import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import { Strategy as GithubStrategy } from "passport-github2";
import UsersController from "../controllers/users.controller.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { JWT_SECRET } from "../utils.js";
import dotenv from "dotenv";
dotenv.config();

const localOpts = {
  usernameField: "email",
  passReqToCallback: true,
};

const githubOpts = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
};

function coookieExtractor(req) {
  let token = null;
  if (req && req.signedCookies) {
    token = req.signedCookies["access_token"];
  }
  return token;
}

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([coookieExtractor]),
  secretOrKey: JWT_SECRET,
};

export const init = () => {
  passport.use(
    "jwt",
    new JwtStrategy(opts, (payload, done) => {
      return done(null, payload);
    })
  );
  passport.use(
    "current",
    new JwtStrategy(opts, (payload, done) => {
      return done(null, payload);
    })
  );
  passport.use(
    "register",
    new LocalStrategy(localOpts, async (req, email, password, done) => {
      try {
        const user = await UsersController.getByEmail({ email });
        if (user) {
          return done(new Error("User already register 😨"));
        }
        const newUser = await UsersController.create({
          ...req.body,
          password: createHash(password),
        });
        done(null, newUser);
      } catch (error) {
        done(
          new Error(
            `Ocurrio un error durante la autenticacion ${error.message} 😨.`
          )
        );
      }
    })
  );

  passport.use(
    "login",
    new LocalStrategy(localOpts, async (req, email, password, done) => {
      try {
        const user = await UsersController.getByEmail({ email });
        if (!user) {
          return done(new Error("Correo o contraseña invalidos 😨"));
        }
        const isPassValid = isValidPassword(password, user);
        if (!isPassValid) {
          return done(new Error("Correo o contraseña invalidos 😨"));
        }
        done(null, user);
      } catch (error) {
        done(
          new Error(
            `Ocurrio un error durante la autenticacion ${error.message} 😨.`
          )
        );
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (uid, done) => {
    const user = await UsersController.getById(uid);
    done(null, user);
  });

  passport.use(
    "github",
    new GithubStrategy(
      githubOpts,
      async (accessToken, refreshToken, profile, done) => {
        let email = profile._json.email;
        let user = await UsersController.getByEmail({ email });
        if (user) {
          return done(null, user);
        }
        user = {
          first_name: profile._json.name,
          last_name: "",
          email,
          age: 18,
          password: "",
          provider: "Github",
        };

        const newUser = await UsersController.create(user);
        done(null, newUser);
      }
    )
  );
};
