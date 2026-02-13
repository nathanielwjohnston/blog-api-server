import { prisma } from "../lib/prisma.js";

export async function authoriseComment(req, res, next) {
  const { id } = req.params;
  const currentUserId = req.user.id;

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (parseInt(comment.userId) === parseInt(currentUserId)) {
      return next();
    }
  } catch (error) {
    return next(error);
  }

  return res.status(401).json({ message: "You are not permitted to do this" });
}

export async function isAuthor(req, res, next) {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    if (user.role === "AUTHOR") {
      return next();
    }

    return res
      .status(401)
      .json({ message: "You are not permitted to do this" });
  } catch (error) {
    next(error);
  }
}

export async function ownsPost(req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (post.authorId === parseInt(userId)) {
      return next();
    }
    return res
      .status(401)
      .json({ message: "You are not permitted to do this" });
  } catch (error) {
    next(error);
  }
}

export async function ownsPostOfComment(req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        post: true,
      },
    });
    if (comment.post.authorId === parseInt(userId)) {
      return next();
    } else if (comment.userId === parseInt(userId)) {
      return next();
    }
    return res
      .status(401)
      .json({ message: "You are not permitted to do this" });
  } catch (error) {
    next(error);
  }
}

export async function checkTokenBlacklist(req, res, next) {
  const authHeader = req.headers["authorization"];
  const [, token] = authHeader.split(" ");
  console.log("token " + token);
  try {
    const checkIfBlacklisted = await prisma.blacklistedToken.findUnique({
      where: {
        tokenId: token,
      },
    });
    if (checkIfBlacklisted) {
      console.log("Blacklisted token");
      return res.json({ message: "Blacklisted token" });
    }
  } catch (error) {
    next(error);
  }

  next();
}
