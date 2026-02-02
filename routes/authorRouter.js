import { Router } from "express";
import passport from "passport";

import * as userController from "../controllers/userController.js";
import * as authorController from "../controllers/authorController.js";
import {
  isAuthor,
  ownsPost,
  ownsPostOfComment,
} from "../middleware/authorisation.js";

const authorRouter = Router();

// get all (incl. not published) posts for specific author
authorRouter.get(
  "/posts",
  // passport.authenticate("jwt", { session: false }),
  // isAuthor,
  authorController.getPosts,
);
// post a post
authorRouter.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  authorController.createPost,
);
// edit a post
authorRouter.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  ownsPost,
  authorController.editPost,
);
// delete a post
authorRouter.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  ownsPost,
  authorController.deletePost,
);

// edit a comment under your post
authorRouter.put(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  ownsPostOfComment,
  userController.editComment,
);
// delete a comment under your post
authorRouter.delete(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  ownsPostOfComment,
  userController.deleteComment,
);

export default authorRouter;
