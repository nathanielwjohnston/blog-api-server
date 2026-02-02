import { Router } from "express";
import passport from "passport";

import * as controller from "../controllers/userController.js";
import { authoriseComment } from "../middleware/authorisation.js";

const userRouter = Router();

userRouter.post("/register", controller.register);
userRouter.post("/login", controller.login);
// Check if the user is loggen in
// TODO: should return 200 or other if fails auth
// Still only works rarely, mostly just returns a 401
userRouter.get(
  "/user",
  (req, res, next) => {
    console.log(req.headers);
    next();
  },
  // TODO: check to see what is coming from the frontend
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log("authenticated");
    return res.json({ message: "Auth success" });
  },
);

// get posts
userRouter.get("/posts", controller.getPosts);
// get specific post
userRouter.get("/posts/:id", controller.getPost);

// leave a comment
userRouter.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  controller.createComment,
);
// update a comment
userRouter.put(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  authoriseComment,
  controller.editComment,
);
// delete a comment
userRouter.delete(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  authoriseComment,
  controller.deleteComment,
);

export default userRouter;
