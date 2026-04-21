import Chunk from "../models/chunk.model.js";
import { createEmbedding } from "../utils/embedding.js";
import { cosineSimilarity } from "../utils/similarity.js";

export const searchChunks = async (query) => {
  const queryEmbedding = await createEmbedding(query);

  const chunks = await Chunk.find();

  const scored = chunks.map((chunk) => ({
    ...chunk._doc,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
};
