# Assessment By Edunova Pvt Ltd Gujarat
# Backend Developer: Node.js, Express.js, and MongoDB

A simple Node.js-based library management system with **Express.js**, **Mongoose**, and **MongoDB**. The system allows managing books, users, and transactions (borrowing and returning books).

## Features
- Register and search books.
- Filter books by rent range and categories.
- Issue and return books.
- Track total rent and borrowing history.
- Register and manage users.

## Technologies Used
- **Node.js** with **Express.js** for backend routing.
- **MongoDB** for database storage.
- **Mongoose** as an ODM (Object Data Modeling) library.
- **CORS** middleware for cross-origin requests.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or any other database, if desired)
- [Postman](https://www.postman.com/) or a similar API client for testing
- A .env file for environment variables

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/gaurav-G-Bro/edunova-backend-assessment.git
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

    ```env
    PORT=3000

    MONGO_URI=mongodb://localhost:27017/your-database-name
                      or
    MONGO_URI=mongodb+srv://username:password@cluster0.ocxwbhi.mongodb.net/database_name?authSource=admin

    ```

4. **Run the application:**
    ```bash
    npm run start 
        or 
    npm run dev
    ```
5. **package.json file should have:**
    ```bash
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
    ```
 
### API Endpoints

#### USERS ROUTES:

| Method | Endpoint               	       | Description                                 |
|--------|-------------------------------------|---------------------------------------------|
| POST   | `/api/v1/users/register`            | Register a new user                         |
| GET    | `/api/v1/users/`         	       | Get all users                     	     |

####BOOKS ROUTES:

| Method | Endpoint               	       | Description                                 |
|--------|-------------------------------------|---------------------------------------------|
| POST   | `/api/v1/books/register`    	       | Register a new book                         |
| GET    | `/api/v1/books/search`              | Search books by name or category            |
| GET    | `/api/v1/books/rent`                | Get books by rent range                     |
| GET    | `/api/v1/books/filter`              | Filter books by category                    |

#### TRANSACTIONS ROUTES:

| Method | Endpoint               	       | Description                                 |
|--------|-------------------------------------|---------------------------------------------|
| POST   | `/api/v1/transactions/issue`        | Issue a book                                |
| POST   | `/api/v1/transactions/return`       | Return a book            		     |
| GET    | `/api/v1/transactions/book-history` | Get borrowing history of a book             |
| GET    | `/api/v1/transactions/total-rent`   | Get total rent of a book                    |
| GET    | `/api/v1/transactions/user-books`   | Get books borrowed by a user                |
| GET    | `/api/v1/transactions/date-range`   | Get transactions within a date range        |

### Example Requests

#### 1. **Register a User**

- **Endpoint**: `POST /api/v1/users/register`
- **Body**:
    ```json
    {
  	"name": "John Doe",
  	"email": "johndoe@example.com",
  	"phone": "1234567890"
    }
    ```

#### 2. **Register a Book**

- **Endpoint**: `POST /api/v1/books/register`
- **Body**:
    ```json
    {
  	"name": "JavaScript: The Good Parts",
  	"category": "Programming",
  	"rentPerDay": 10
    }

    ```

#### 3. **Issue a Book**

- **Endpoint**: `POST /api/v1/transactions/issue`
- **Body**:
    ```json
    {
      "bookId": "605c5f9e5362f1b4e47d9bf7",
      "userId": "605c5f9e5362f1b4e47d9bf1"
    }
    ```

#### 4. **Return a Book**

- **Endpoint**: `POST /api/v1/transactions/return`
- **Body**:
    ```json
    {
	"bookId": "605c5f9e5362f1b4e47d9bf7",
  	"userId": "605c5f9e5362f1b4e47d9bf1",
  	"returnDate": "09/28/2024" **month/day/year**
    }
    ```

## Error Handling

The API uses comprehensive error handling to ensure that all errors are captured and meaningful messages are returned to the client. Common HTTP status codes used include:

- **400 Bad Request**: The request could not be understood or was missing required parameters.
- **401 Unauthorized**: Authentication failed or user does not have permissions for the requested operation.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occurred on the server.

## Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## License

This project is open to use for the Beginner to Intermediate level students, programmers or coders.

---

**Happy Coding!**
**Gaurav**
**LinkedIn: https://www.linkedin.com/in/gaurav-kumar-a945231b0/**
