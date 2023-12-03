import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import { Strategy as GithubStrategy } from "passport-github2";
import UserModel from "../dao/models/user.model.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { JWT_SECRET } from "../utils.js";

const localOpts = {
  usernameField: "email",
  passReqToCallback: true,
};

const githubOpts = {
  clientID: "Iv1.3ed7e564645fa70d", // Este dato debe ser pasado por parametro
  clientSecret: "2ab2fe9b042472fd35d15139fcc1562c36b4dd4f", // Este dato debe ser pasado por parametro
  callbackURL: "http://localhost:8080/api/sessions/github/callback", // Este dato debe ser pasado por parametro
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
        const user = await UserModel.findOne({ email });
        if (user) {
          return done(new Error("User already register 😨"));
        }
        const newUser = await UserModel.create({
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
        const user = await UserModel.findOne({ email });
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
    const user = await UserModel.findById(uid);
    done(null, user);
  });

  passport.use(
    "github",
    new GithubStrategy(
      githubOpts,
      async (accessToken, refreshToken, profile, done) => {
        let email = profile._json.email;
        let user = await UserModel.findOne({ email });
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

        const newUser = await UserModel.create(user);
        done(null, newUser);
      }
    )
  );
};
