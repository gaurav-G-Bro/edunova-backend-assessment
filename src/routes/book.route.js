import { Router } from "express";
import {
  registerBooks,
  searchBooks,
  getBooksByRentRange,
  filterBooks,
} from "../controllers/books.controller.js";

const router = Router();

router.route("/register").post(registerBooks);
router.route("/search").get(searchBooks);
router.route("/rent").get(getBooksByRentRange);
router.route("/filter").get(filterBooks);

export default router;
