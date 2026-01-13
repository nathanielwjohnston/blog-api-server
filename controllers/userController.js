import { prisma } from "../lib/prisma.js";

export async function getPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany();
    return res.json(posts);
  } catch (error) {
    // TODO: is this the right way to go about this?
    next(error);
  }
}
export async function getPost(req, res) {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
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
export async function deleteComment(req, res) {
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
