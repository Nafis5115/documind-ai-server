import { pipeline } from "@xenova/transformers";

const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2",
);

export async function createEmbedding(text) {
  const result = await embedder(text);

  const dims = result.dims;
  const embeddingSize = dims[dims.length - 1]; //384

  const data = result.data;

  const embedding = data.slice(0, embeddingSize);

  return Array.from(embedding);
}
