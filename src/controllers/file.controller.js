import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const dataBuffer = new Uint8Array(fs.readFileSync(file.path));

    const pdf = await pdfjsLib.getDocument({ data: dataBuffer }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const strings = content.items.map((item) => item.str);
      text += strings.join(" ") + "\n";
    }

    // cleanup file
    fs.unlinkSync(file.path);

    res.json({
      message: "File processed successfully",
      text,
    });
  } catch (error) {
    console.error("PDF ERROR:", error);
    res.status(500).json({ error: "Error processing file" });
  }
};
