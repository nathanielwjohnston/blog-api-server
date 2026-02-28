import { prisma } from "../lib/prisma.js";
import passport from "passport";
import jwt from "jsonwebtoken";

// TODO: test functions

export async function login(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: err.message });
    const opts = {};
    opts.expiresIn = 600;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id }, secret, opts);
    console.log(user);
    if (user.role === "AUTHOR") {
      return res.json({ message: "Auth success", token, user });
    } else {
      return res.status(401).json({ error: err.message });
    }
  })(req, res, next);
}

export async function getPosts(req, res, next) {
  const authorId = req.user.id;

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        author: true,
        comments: true,
      },
    });
    return res.json(posts);
  } catch (error) {
    next(error);
  }
}

export async function getPost(req, res, next) {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: {
          include: {
            user: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    console.log(post);
    return res.json(post);
  } catch (error) {
    next(error);
  }
}

export async function createPost(req, res, next) {
  const post = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...post,
      },
    });
    return res.json(newPost);
  } catch (error) {
    next(error);
  }
}

export async function editPost(req, res, next) {
  const { id } = req.params;
  const post = req.body;
  try {
    const editedPost = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...post,
      },
      include: {
        author: {
          include: {
            user: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    return res.json(editedPost);
  } catch (error) {
    next(error);
  }
}

export async function deletePost(req, res, next) {
  const { id } = req.params;
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json(deletedPost);
  } catch (error) {
    next(error);
  }
}
