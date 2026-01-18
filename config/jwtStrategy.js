import "dotenv/config";

import passport from "passport";
import { prisma } from "../lib/prisma.js";

import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

// id passed with a cryptographically secure token, thus can just pull
// the id straight from it with the secret from above. This is why
// you do not need to check password hash like with the local strategy
const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  const user = await prisma.user.findUnique({
    where: {
      id: jwt_payload.id,
    },
  });
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});

passport.use(strategy);
