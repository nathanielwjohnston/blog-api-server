import { Router } from "express";
const userRouter = Router();

import * as controller from "../controllers/userController.js";

// get posts
userRouter.get("/posts", controller.getPosts);
// get specific post
userRouter.get("/posts/:id", controller.getPost);

// leave a comment
userRouter.post("/comments", controller.createComment);
// update a comment
userRouter.put("/comments/:id", controller.editComment);
// delete a comment
userRouter.delete("/comments/:id", controller.deleteComment);

export default userRouter;
