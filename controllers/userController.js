import { prisma } from "../lib/prisma.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { generateHash } from "../lib/passwordUtils.js";

export async function register(req, res, next) {
  const { username, password } = req.body;

  const pwHash = await generateHash(password);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        hash: pwHash,
      },
    });
    const { hash, ...newUser } = user;
    return res.json({ message: "Register success" }, newUser);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  // Local strategy is used for log in, after which
  // a jwt token is created to be used for future requests
  // until it has expired

  // authenticate returns a function, this syntax
  // just enables us to call that function
  // with req, res, next
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message });
    const opts = {};
    opts.expiresIn = 600;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id }, secret, opts);
    console.log(token);
    return res.json({ message: "Auth success", token });
  })(req, res, next);
}

export async function getPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          include: {
            user: true,
          },
        },
      },
    });
    return res.json(posts);
  } catch (error) {
    // TODO: is this the right way to go about this?
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

export async function createComment(req, res, next) {
  const comment = req.body;
  console.log(comment);
  try {
    const newComment = await prisma.comment.create({
      data: {
        ...comment,
      },
    });
    return res.json(newComment);
  } catch (error) {
    next(error);
  }
}

export async function editComment(req, res, next) {
  const { id } = req.params;
  const comment = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...comment,
      },
    });
    return res.json(updatedComment);
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req, res, next) {
  const { id } = req.params;

  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json(deletedComment);
  } catch (error) {
    next(error);
  }
}
