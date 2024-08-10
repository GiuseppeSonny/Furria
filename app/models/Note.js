import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.models.Note || mongoose.model("Note", noteSchema);
