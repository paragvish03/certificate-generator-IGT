import express, { Request, Response } from "express";
import router from "./routes";
import { join } from "path";

const app = express();
const port = 3030;

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(router);

//unknow endpoints
app.use((req: Request, res: Response): any =>
  res.status(404).sendFile(join(__dirname, "/public/notFound.html"))
);

//starting
app.listen(port, () => {
  console.log(
    "Server is running follow url in browser",
    `http://localhost:${port}/`
  );
});
