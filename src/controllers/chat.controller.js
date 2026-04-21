import { askAI } from "../services/ai.service.js";
import { searchChunks } from "../services/search.service.js";

export const handleQuery = async (req, res) => {
  try {
    const { query } = req.body;
    const chunks = await searchChunks(query);
    const context = chunks.map((c) => c.text).join("\n\n");
    const answer = await askAI(query, context);
    res.json({
      answer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed" });
  }
};
