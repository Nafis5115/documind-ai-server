import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import Document from "../models/document.model.js";
import { chunkText } from "../helpers/chunkText.js";
import Chunk from "../models/chunk.model.js";
import { createEmbedding } from "../utils/embedding.js";

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

    const document = await Document.create({
      name: file.originalname,
      size: file.size,
    });
    // 🔹 Chunk text
    const chunks = chunkText(text);

    // 🔹 Save chunks
    const chunkDocs = await Promise.all(
      chunks.map(async (chunk, index) => {
        const embedding = await createEmbedding(chunk);

        return {
          documentId: document._id,
          text: chunk,
          chunkIndex: index,
          embedding,
        };
      }),
    );

    await Chunk.insertMany(chunkDocs);
    // cleanup file
    fs.unlinkSync(file.path);

    res.json({
      message: "File uploaded & processed",
      documentId: document._id,
      totalChunks: chunks.length,
    });
  } catch (error) {
    console.error("PDF ERROR:", error);
    res.status(500).json({ error: "Error processing file" });
  }
};
