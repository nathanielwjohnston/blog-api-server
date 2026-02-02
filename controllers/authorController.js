import { prisma } from "../lib/prisma.js";

// TODO: test functions

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
