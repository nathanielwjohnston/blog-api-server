import { Router } from "express";
import passport from "passport";

import { prisma } from "../lib/prisma.js";

import * as controller from "../controllers/userController.js";
import {
  authoriseComment,
  checkTokenBlacklist,
} from "../middleware/authorisation.js";

const userRouter = Router();

userRouter.post("/register", controller.register);
userRouter.post("/login", controller.login);
userRouter.post("/logout", controller.logout);

// Check if the user is logged in
userRouter.get(
  "/user",
  checkTokenBlacklist,
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    return res.json({ message: "Auth success", user: req.user });
  },
);

// get posts
userRouter.get("/posts", controller.getPosts);
// get specific post
userRouter.get("/posts/:id", controller.getPost);

// leave a comment
userRouter.post(
  "/comments",
  checkTokenBlacklist,
  passport.authenticate("jwt", { session: false }),
  controller.createComment,
);
// update a comment
userRouter.put(
  "/comments/:id",
  checkTokenBlacklist,
  passport.authenticate("jwt", { session: false }),
  authoriseComment,
  controller.editComment,
);
// delete a comment
userRouter.delete(
  "/comments/:id",
  checkTokenBlacklist,
  passport.authenticate("jwt", { session: false }),
  authoriseComment,
  controller.deleteComment,
);

export default userRouter;
