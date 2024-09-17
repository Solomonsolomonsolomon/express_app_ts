import express, { Application } from "express";
import { ErrorHandler } from "./utils/errorHandler";
import helmet from "helmet";
import cors from "cors";

import appRoutes from ".";
const app: Application = express();
import "express";
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", appRoutes);
app.use(ErrorHandler);

export default app;
