import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    text: String,
    chunkIndex: Number,
    embedding: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true },
);

const Chunk = mongoose.model("Chunk", chunkSchema);
export default Chunk;
