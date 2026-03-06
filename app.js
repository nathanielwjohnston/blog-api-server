import "dotenv/config";

import express from "express";
import cors from "cors";

const app = express();

import passport from "passport";
import "./config/localStrategy.js";
import "./config/jwtStrategy.js";

import userRouter from "./routes/userRouter.js";
import authorRouter from "./routes/authorRouter.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/user-api", userRouter);
app.use("/author-api", authorRouter);

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Listening on port ${port}`);
});
