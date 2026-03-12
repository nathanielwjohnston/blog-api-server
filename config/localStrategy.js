import passport from "passport";
import { prisma } from "../lib/prisma.js";

import { Strategy as LocalStrategy } from "passport-local";
import { validatePassword } from "../lib/passwordUtils.js";

const verifyCallback = async (username, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) return done(null, false);
    const isValid = await validatePassword(password, user.hash);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);
