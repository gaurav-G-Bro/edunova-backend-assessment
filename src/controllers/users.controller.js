import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    const status =
      !users.length > 0 ? "No users found" : "All users fetched successfully";

    return res.status(200).json(new ApiResponse(200, users, status));
  } catch (error) {
    throw new ApiError(500, "Failed to retrieve users", error.message);
  }
});

const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || name?.trim() === "")
      throw new ApiError(400, "name is required");

    if (!email || email?.trim() === "")
      throw new ApiError(400, "email is required");

    if (!phone || phone?.trim() === "")
      throw new ApiError(400, "phone is required");

    if ((phone && phone.length < 10) || phone.length > 10)
      throw new ApiError(400, "phone number must be of 10 digits only");

    const existedUser = await User.findOne({ email });

    if (existedUser)
      throw new ApiError(400, "User already registered using this email");

    const userData = {
      name,
      email,
      phone,
    };

    const user = await User.create(userData);
    if (!user) throw new ApiError(500, "user not registered, please try again");

    return res
      .status(200)
      .json(new ApiResponse(201, "User registered successfully", user));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export { getAllUsers, createUser };
