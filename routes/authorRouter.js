import { Router } from "express";
const authorRouter = Router();

import * as userController from "../controllers/userController.js";
import * as authorController from "../controllers/authorController.js";

// TODO: will need verification for both routers.
// need to verify logged in, correct user, and in
// the case of the author that comments they are editing
// are only under their own post if they don't own them

// post a post
authorRouter.post("/posts", authorController.createPost);
// edit a post
authorRouter.put("/posts/:id", authorController.editPost);
// delete a post
authorRouter.delete("/posts/:id", authorController.deletePost);

// edit a comment under your post
authorRouter.put("/comments/:id", userController.editComment);
// delete a comment under your post
authorRouter.delete("/comments/:id", userController.deleteComment);

export default authorRouter;
