import express, { Request, Response } from "express";
import cors from "cors";
import env from "dotenv";
import { indexRouter } from "./routes/index.routes";
import { auth } from "./lib/auth";
import { fromNodeHeaders } from "better-auth/node";
env.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World");
  return;
});

app.use("/api", indexRouter);

app.get("/api/me", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.json(session);
  return;
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
