import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.model.js";
import { Book } from "../models/book.model.js";
import { User } from "../models//user.model.js";

const issueBook = asyncHandler(async (req, res) => {
  const { bookId, userId, returnDate } = req.body;
  try {
    if (!bookId) throw new ApiError(400, "Book Id is required");
    if (!userId) throw new ApiError(400, "User Id is required");

    const existingTransaction = await Transaction.findOne({ userId, bookId });
    if (existingTransaction) {
      throw new ApiError(400, "You have already issued this book.");
    }

    const booksData = {
      bookId,
      userId,
      returnDate,
    };
    const transaction = await Transaction.create(booksData);
    if (!transaction)
      throw new ApiError(500, "Failed to do transaction, please try again");

    const transactedUserData = await User.findById(transaction?.userId).select(
      "-_id -createdAt -updatedAt -__v"
    );

    const book = await Book.findById(bookId);

    res.status(200).json(
      new ApiResponse(200, "Book issued successfully", {
        Book: book.name,
        IssuedBy: transactedUserData,
      })
    );
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const returnBook = asyncHandler(async (req, res) => {
  const { bookId, userId, returnDate } = req.body;

  try {
    if (!bookId) throw new ApiError(400, "Book Id is required");
    if (!userId) throw new ApiError(400, "User Id is required");
    if (!returnDate || returnDate.trim() === "")
      throw new ApiError(400, "Return date is required");

    const transaction = await Transaction.findOne({
      bookId,
      userId,
    });

    if (!transaction) {
      throw new ApiError(404, "No record found for this book being borrowed.");
    }

    if (transaction.status === "returned") {
      throw new ApiError(400, "You have already returned this book.");
    }

    transaction.status = "returned";
    transaction.returnDate = returnDate;

    const book = await Book.findById(bookId);
    const daysRented = Math.ceil(
      (new Date(returnDate) - new Date(transaction.issueDate)) /
        (1000 * 3600 * 24)
    );
    transaction.totalRent = daysRented * book.rentPerDay;

    await transaction.save();
    res.status(200).json(
      new ApiResponse(200, "Book returned and rent calculated", {
        totalRent: transaction.totalRent,
      })
    );
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const getBookHistory = asyncHandler(async (req, res) => {
  const { bookId } = req.query;
  try {
    if (!bookId || bookId.trim() === "")
      throw new ApiError(400, "Book Id is required");

    if (bookId.length < 24 || bookId.length > 24)
      throw new ApiError(400, "Book Id must be of 24 characters only.");

    const transactions = await Transaction.find({ bookId }).populate("userId");
    if (!transactions)
      throw new ApiError(400, "No transaction found for this book");

    const currentlyIssued = transactions.find((t) => !t.returnDate);
    const pastTransactions = transactions.filter((t) => t.returnDate);

    const currentlyIssue = currentlyIssued;

    res
      .status(200)
      .json(new ApiResponse(200, currentlyIssue, pastTransactions));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const getTotalRentByBook = asyncHandler(async (req, res) => {
  const { bookId } = req.query;

  try {
    if (!bookId || bookId.trim() === "")
      throw new ApiError(400, "Book Id is required");

    const totalRent = await Transaction.aggregate([
      {
        $match: {
          bookId: mongoose.Types.ObjectId(bookId),
          returnDate: { $ne: null },
        },
      },
      { $group: { _id: "$bookId", totalRent: { $sum: "$totalRent" } } },
    ]);

    if (!totalRent) throw new ApiError(400, "No rent available for the user");

    const totalRents = totalRent[0] || { totalRent: 0 };
    if (!totalRents) throw new ApiError(500, "failed to calculate rent");

    res
      .status(200)
      .json(new ApiResponse(200, totalRents, "rent calculated successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const getBooksByUser = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  try {
    if (!userId || userId.trim() === "")
      throw new ApiError(400, "User Id is required");

    const transactions = await Transaction.find({ userId }).populate("bookId");
    if (!transactions)
      throw new ApiError(400, "user has not borrowed this book");

    res
      .status(200)
      .json(new ApiResponse(200, transactions, "Book fetched successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const getTransactionsByDateRange = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const transactions = await Transaction.find({
      issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate("bookId userId");

    if (!transactions)
      throw new ApiError(500, "failed to fetch transaction in date range");

    res
      .status(200)
      .json(
        new ApiResponse(200, transactions, "Transaction fetched successfully")
      );
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export {
  issueBook,
  returnBook,
  getBookHistory,
  getTotalRentByBook,
  getBooksByUser,
  getTransactionsByDateRange,
};
