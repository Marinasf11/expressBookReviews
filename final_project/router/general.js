const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  // Use JSON.stringify to convert the books array to a JSON string
  const booksJSON = JSON.stringify(books);

  // Set the response content type to JSON
  res.setHeader('Content-Type', 'application/json');

  // Send the JSON stringified array of books as the response
  res.status(200).send(booksJSON);
});

  
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
    
  // Check if the requested ISBN exists in the books object
  if (books.hasOwnProperty(isbn)) {
      // If the ISBN exists, return the book details
      return res.status(200).json(books[isbn]);
  } else {
      // If the ISBN doesn't exist, return a 404 error
      return res.status(404).json({ message: "Book not found" });
  }

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const authors = {}; // Object to store authors and their books

    // Iterate through the 'books' object to gather authors and their books
    for (const key in books) {
        if (books.hasOwnProperty(key)) {
            const book = books[key];
            const author = book.author;

            // Check if the author is already in the 'authors' object
            if (authors.hasOwnProperty(author)) {
                authors[author].push(book); // Add the book to the author's existing array
            } else {
                authors[author] = [book]; // Create a new array for the author and add the book
            }
        }
    }

    // Check if any authors were found
    if (Object.keys(authors).length > 0) {
        res.status(200).json(authors); // Return the object containing authors and their books
    } else {
        res.status(404).json({ message: "No authors found in the database." }); // Return a message if no authors were found
    }

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
   // Initialize an array to store book details
   let allBooks = [];

   // Iterate over each book in the books database
   for (let key in books) {
       if (books.hasOwnProperty(key)) {
           // Extract title and other details for the current book
           let bookDetails = {
               title: books[key].title,
               author: books[key].author,
               reviews: books[key].reviews
               // Add more fields as needed
           };

           // Push the current book details to the array
           allBooks.push(bookDetails);
       }
   }

   // Check if any books were found
   if (allBooks.length > 0) {
       // Return the array of book details as a response
       res.status(200).json(allBooks);
   } else {
       // If no books were found, return a message
       res.status(404).json({ message: "No books found in the database." });
   }

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  // Retrieve ISBN from request parameters
  const isbn = req.params.isbn;

  // Check if the book with the provided ISBN exists in the database
  if (books.hasOwnProperty(isbn)) {
      // Retrieve reviews for the book with the provided ISBN
      const bookReviews = books[isbn].reviews;

      // Check if there are any reviews for the book
      if (Object.keys(bookReviews).length > 0) {
          // Return the reviews as a response
          res.status(200).json(bookReviews);
      } else {
          // If no reviews are found, return a message
          res.status(404).json({ message: "No reviews found for the provided ISBN." });
      }
  } else {
      // If the book with the provided ISBN is not found, return a message
      res.status(404).json({ message: "Book not found for the provided ISBN." });
  }

});

module.exports.general = public_users;
