// Import the express library
import express from 'express';

// Creating an instance of an express application
const app = express();

// Defining the port we want to listen on
const port = process.env.PORT || 3001;

const books = {
    "Moby Dick": {
        genre: "Fiction",
        author: "Herman Melville"
    },
    "Sapiens": {
        genre: "Non-Fiction",
        author: "Yuval Noah Harari"
    },
    "1984": {
        genre: "Fiction",
        author: "George Orwell"
    },
    "The Selfish Gene": {
        genre: "Science",
        author: "Richard Dawkins"
    }
}


// Query string example: Get books by genre
app.get('/', (req, res) => {
    const requestedGenre = req.query.genre;
    const matchingBooks = [];

    // Loop through books to find matches
    for (const book in books) {
        if (books[book].genre === requestedGenre) {
            matchingBooks.push(book);
        }
    }

    // Send response with matching books
    res.send(matchingBooks);
});

//curl "149.31.228.185:3001?genre=Fiction"
//curl "149.31.228.185:3001?genre=Non-Fiction"
//curl "149.31.228.185:3001/book/Sapiens"




// URL params example: Get a specific book by title
app.get('/book/:title', (req, res) => {
    const bookTitle = req.params.title;

    // If the book exists, send its details
    if (books[bookTitle]) {
        res.send(`The book "${bookTitle}" is in the genre: ${books[bookTitle].genre} and was written by ${books[bookTitle].author}.`);
    } else {
        res.send(`The book "${bookTitle}" does not exist in our records.`);
    }
});

// Setting up our application to listen on the port we defined above
app.listen(port, () => {
    console.log(`My app is listening on port ${port}`);
});
 