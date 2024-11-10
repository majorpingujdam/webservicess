import cors from 'cors'
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creating an instance of an express application
const app = express();
app.use(cors({
    origin: '*'
}));

// Defining the port we want to listen on
const port = process.env.PORT || 3001;

// Load book data from data.json file
const books = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));




// Endpoint 1: Query books by genre
app.get('/books', (req, res) => {
    const requestedGenre = req.query.genre;
    const matchingBooks = [];

    for (const book in books) {
        if (books[book].genre === requestedGenre) {
            matchingBooks.push({
                title: book,
                author: books[book].author,
                releaseDate: books[book].releaseDate
            });
        }
    }

    res.send(matchingBooks.length ? matchingBooks : No books found in the genre "${requestedGenre}");
});

// Endpoint 2: Query books by author
app.get('/author', (req, res) => {
    const requestedAuthor = req.query.author;
    const matchingBooks = [];

    for (const book in books) {
        if (books[book].author === requestedAuthor) {
            matchingBooks.push({
                title: book,
                genre: books[book].genre,
                releaseDate: books[book].releaseDate
            });
        }
    }

    res.send(matchingBooks.length ? matchingBooks : No books found by the author "${requestedAuthor}");
});

// Endpoint 3: Query books by release month only
app.get('/release-month', (req, res) => {
    const requestedMonth = req.query.month; // Format: MM
    const matchingBooks = [];

    for (const book in books) {
        const bookMonth = books[book].releaseDate.split("-")[1]; // Extract month from release date
        if (bookMonth === requestedMonth) {
            matchingBooks.push({
                title: book,
                genre: books[book].genre,
                author: books[book].author
            });
        }
    }

    res.send(matchingBooks.length ? matchingBooks : No books found released in month "${requestedMonth}");
});

// Endpoint 4: Get a specific book by title with full details
app.get('/book/:title', (req, res) => {
    const bookTitle = req.params.title;

    if (books[bookTitle]) {
        res.send({
            title: bookTitle,
            genre: books[bookTitle].genre,
            author: books[bookTitle].author,
            releaseDate: books[bookTitle].releaseDate
        });
    } else {
        res.send(The book "${bookTitle}" does not exist in our records.);
    }
});

// Setting up our application to listen on the port we defined above
app.listen(port, () => {
    console.log(My app is listening on port ${port});
});