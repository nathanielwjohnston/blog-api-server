import { Router } from "express";

import * as controller from "../controllers/userController.js";
import passport from "passport";

const userRouter = Router();

userRouter.post("/register", controller.register);
userRouter.post("/login", controller.login);

// get posts
userRouter.get("/posts", controller.getPosts);
// get specific post
userRouter.get("/posts/:id", controller.getPost);

// leave a comment
userRouter.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  controller.createComment
);
// update a comment
userRouter.put(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  controller.editComment
);
// delete a comment
userRouter.delete(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deleteComment
);

export default userRouter;
