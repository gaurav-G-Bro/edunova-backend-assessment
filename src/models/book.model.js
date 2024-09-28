import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: [
          "Programming",
          "Data Science",
          "AI",
          "Databases",
          "Frontend",
          "Design",
          "Marketting",
        ],
        message:
          "{VALUE} is not a matching status. Choose from Programming, Data Science, AI, Databases, Frontend, Design, Marketting",
      },
    },
    rentPerDay: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export { Book };
