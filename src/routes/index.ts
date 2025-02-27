import { Request, Response, Router } from "express";
import handlebars from "handlebars";
import { join } from "path";
import fs from "fs";
import { convertIntoPdf } from "../utils/pdf-converter";

const router = Router();

router.get("/", (req: Request, res: Response): any => {
  return res.status(200).sendFile(join(__dirname, "../public/input.html"));
});

router.post(
  "/generate-pdf",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { name, email, phone, dob, bloodgroup, gender, issueDate } =
        req.body;
      if (
        !name ||
        !email ||
        !phone ||
        !dob ||
        !bloodgroup ||
        !gender ||
        !issueDate
      )
        return res.status(400).json({ message: "Missing required fields." });

      const template = handlebars.compile(
        fs.readFileSync(join(__dirname, "../public/certificate.html"), "utf-8")
      );

      const html = template({
        name: name.toUpperCase(),
        email,
        phone,
        dob,
        bloodgroup,
        gender,
        issueDate,
      });
      const path = "./files/output.pdf";
      await convertIntoPdf(html, path);
      res.download(path);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Sowething went wrong" });
    }
  }
);

export default router;
