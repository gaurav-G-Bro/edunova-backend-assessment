import { Router } from "express";
import {
  issueBook,
  returnBook,
  getBookHistory,
  getTotalRentByBook,
  getBooksByUser,
  getTransactionsByDateRange,
} from "../controllers/transactions.controller.js";

const router = Router();

router.route("/issue").post(issueBook);
router.route("/return").post(returnBook);
router.route("/book-history").get(getBookHistory);
router.route("/total-rent").get(getTotalRentByBook);
router.route("/user-books").get(getBooksByUser);
router.route("/date-range").get(getTransactionsByDateRange);

export default router;
