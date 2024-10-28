// Import the express library
import express from 'express';

// Creating an instance of an express application
const app = express();

// Defining the port we want to listen on
const port = process.env.PORT || 3001;

// Top 50 selling books data (sample entries for each book)
const books = {
    "Moby Dick": { 
        genre: "Fiction", 
        author: "Herman Melville", 
        releaseDate: "1851-10" },
    "Sapiens": { genre: "Non-Fiction", author: "Yuval Noah Harari", releaseDate: "2011-09" },
    "1984": { genre: "Fiction", author: "George Orwell", releaseDate: "1949-06" },
    "The Selfish Gene": { genre: "Science", author: "Richard Dawkins", releaseDate: "1976-03" },
    "Atomic Habits": { genre: "Self-Help", author: "James Clear", releaseDate: "2018-10" },
    "The Silent Patient": { genre: "Thriller", author: "Alex Michaelides", releaseDate: "2019-02" },
    "Educated": { genre: "Memoir", author: "Tara Westover", releaseDate: "2018-02" },
    "The Night Circus": { genre: "Fantasy", author: "Erin Morgenstern", releaseDate: "2011-09" },
    "Where the Crawdads Sing": { genre: "Mystery", author: "Delia Owens", releaseDate: "2018-08" },
    "Becoming": { genre: "Biography", author: "Michelle Obama", releaseDate: "2018-11" },
    "The Subtle Art of Not Giving a F*ck": { genre: "Self-Help", author: "Mark Manson", releaseDate: "2016-09" },
    "The Great Alone": { genre: "Historical Fiction", author: "Kristin Hannah", releaseDate: "2018-02" },
    "Little Fires Everywhere": { genre: "Fiction", author: "Celeste Ng", releaseDate: "2017-09" },
    "Circe": { genre: "Fantasy", author: "Madeline Miller", releaseDate: "2018-04" },
    "The Vanishing Half": { genre: "Historical Fiction", author: "Brit Bennett", releaseDate: "2020-06" },
    "Normal People": { genre: "Fiction", author: "Sally Rooney", releaseDate: "2018-08" },
    "It Ends with Us": { genre: "Romance", author: "Colleen Hoover", releaseDate: "2016-08" },
    "The Seven Husbands of Evelyn Hugo": { genre: "Historical Fiction", author: "Taylor Jenkins Reid", releaseDate: "2017-06" },
    "A Man Called Ove": { genre: "Fiction", author: "Fredrik Backman", releaseDate: "2012-08" },
    "The Girl on the Train": { genre: "Thriller", author: "Paula Hawkins", releaseDate: "2015-01" },
    "The Testaments": { genre: "Dystopian", author: "Margaret Atwood", releaseDate: "2019-09" },
    "The Goldfinch": { genre: "Fiction", author: "Donna Tartt", releaseDate: "2013-10" },
    "The Tattooist of Auschwitz": { genre: "Historical Fiction", author: "Heather Morris", releaseDate: "2018-01" },
    "The Book Thief": { genre: "Historical Fiction", author: "Markus Zusak", releaseDate: "2005-03" },
    "The Handmaid's Tale": { genre: "Dystopian", author: "Margaret Atwood", releaseDate: "1985-09" },
    "Dune": { genre: "Science Fiction", author: "Frank Herbert", releaseDate: "1965-08" },
    "Pachinko": { genre: "Historical Fiction", author: "Min Jin Lee", releaseDate: "2017-02" },
    "The Road": { genre: "Post-Apocalyptic", author: "Cormac McCarthy", releaseDate: "2006-09" },
    "Harry Potter and the Sorcerer's Stone": { genre: "Fantasy", author: "J.K. Rowling", releaseDate: "1997-06" },
    "The Catcher in the Rye": { genre: "Fiction", author: "J.D. Salinger", releaseDate: "1951-07" },
    "To Kill a Mockingbird": { genre: "Fiction", author: "Harper Lee", releaseDate: "1960-07" },
    "The Alchemist": { genre: "Fiction", author: "Paulo Coelho", releaseDate: "1988-05" },
    "The Hitchhiker's Guide to the Galaxy": { genre: "Science Fiction", author: "Douglas Adams", releaseDate: "1979-10" },
    "Good Omens": { genre: "Fantasy", author: "Neil Gaiman", releaseDate: "1990-05" },
    "The Name of the Wind": { genre: "Fantasy", author: "Patrick Rothfuss", releaseDate: "2007-03" },
    "Twilight": { genre: "Fantasy", author: "Stephenie Meyer", releaseDate: "2005-10" },
    "The Hunger Games": { genre: "Dystopian", author: "Suzanne Collins", releaseDate: "2008-09" },
    "The Lightning Thief": { genre: "Fantasy", author: "Rick Riordan", releaseDate: "2005-06" },
    "Life of Pi": { genre: "Fiction", author: "Yann Martel", releaseDate: "2001-09" },
    "Fahrenheit 451": { genre: "Dystopian", author: "Ray Bradbury", releaseDate: "1953-10" },
    "The Lovely Bones": { genre: "Fiction", author: "Alice Sebold", releaseDate: "2002-07" },
    "Ender's Game": { genre: "Science Fiction", author: "Orson Scott Card", releaseDate: "1985-01" },
    "The Pillars of the Earth": { genre: "Historical Fiction", author: "Ken Follett", releaseDate: "1989-08" },
    "The Help": { genre: "Historical Fiction", author: "Kathryn Stockett", releaseDate: "2009-02" },
    "A Game of Thrones": { genre: "Fantasy", author: "George R.R. Martin", releaseDate: "1996-08" },
    "The Shining": { genre: "Horror", author: "Stephen King", releaseDate: "1977-01" },
    "Gone Girl": { genre: "Thriller", author: "Gillian Flynn", releaseDate: "2012-06" }
};

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

    res.send(matchingBooks.length ? matchingBooks : `No books found in the genre "${requestedGenre}"`);
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

    res.send(matchingBooks.length ? matchingBooks : `No books found by the author "${requestedAuthor}"`);
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

    res.send(matchingBooks.length ? matchingBooks : `No books found released in month "${requestedMonth}"`);
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
        res.send(`The book "${bookTitle}" does not exist in our records.`);
    }
});

// Setting up our application to listen on the port we defined above
app.listen(port, () => {
    console.log(`My app is listening on port ${port}`);
});
