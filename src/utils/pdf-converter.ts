import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

export const convertIntoPdf = async (htmlBody: string, filePath: string) => {
  try {
    console.log(htmlBody);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlBody, { waitUntil: "networkidle0" });

    await page.pdf({
      path: filePath,
      format: "A4",
      landscape: true,
      margin: {
        top: "1in",
        right: "1in",
        bottom: "1in",
        left: "1in",
      },
      printBackground: true,
    });

    await browser.close();
    return "successful";
  } catch (error) {
    throw new Error(error as any);
  }
};
