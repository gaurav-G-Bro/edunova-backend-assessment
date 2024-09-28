import { asyncHandler } from "../utils/AsyncHandler.js";
import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerBooks = asyncHandler(async (req, res) => {
  try {
    const { name, category, rentPerDay } = req.body;

    if (!name || name?.trim() === "")
      throw new ApiError(400, "name is required");

    if (!category || category?.trim() === "")
      throw new ApiError(
        400,
        "category is required. Only choose from `Programming, Data Science, AI, Databases, Frontend, Design, Marketing`"
      );

    if (!rentPerDay) throw new ApiError(400, "rentPerDay is required");

    const booksData = {
      name,
      category,
      rentPerDay,
    };

    const book = await Book.create(booksData);
    if (!book) throw new ApiError(500, "book not registered, please try again");

    return res
      .status(200)
      .json(new ApiResponse(201, "Book registered successfully", book));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const searchBooks = asyncHandler(async (req, res) => {
  const { bookname } = req.query;
  try {
    const books = await Book.find({
      name: { $regex: bookname, $options: "i" },
    });
    res.status(200).json(new ApiResponse(200, books));
  } catch (error) {
    throw new ApiError(500, "Failed to search books", error.message);
  }
});

const getBooksByRentRange = asyncHandler(async (req, res) => {
  const { min, max } = req.query;
  try {
    const books = await Book.find({
      rentPerDay: { $gte: min, $lte: max },
    });
    res.status(200).json(new ApiResponse(200, books));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch books", error.message);
  }
});

const filterBooks = asyncHandler(async (req, res) => {
  const { category, bookname, min, max } = req.query;
  try {
    const books = await Book.find({
      category: category,
      name: { $regex: bookname, $options: "i" },
      rentPerDay: { $gte: min, $lte: max },
    });
    res.status(200).json(new ApiResponse(200, books));
  } catch (error) {
    throw new ApiError(500, "Failed to filter books", error.message);
  }
});

export { registerBooks, searchBooks, getBooksByRentRange, filterBooks };
