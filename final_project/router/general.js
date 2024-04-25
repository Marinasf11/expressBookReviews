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
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
