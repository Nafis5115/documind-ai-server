import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    name: String,
    size: Number,
  },
  { timestamps: true },
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
