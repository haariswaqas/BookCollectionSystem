const { Book, Genre } = require('../models/book'); // Import the models

// Books Controller Functions
// Retrieve all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                {
                    model: Genre,
                    attributes: ['name'], // Include genre name in the response
                },
            ],
        });
        res.json(books);
    } catch (error) {
        console.error('Error retrieving books:', error);
        res.status(500).json({ error: 'Error retrieving books' });
    }
};

// Retrieve a particular book by id
const getBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id, {
            include: [
                {
                    model: Genre,
                    attributes: ['name'], // Include genre name in the response
                },
            ],
        });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error retrieving book:', error);
        res.status(500).json({ error: 'Error retrieving book' });
    }
};

// Create a new book
const createBook = async (req, res) => {
    const { title, author, price, genre_id, copies_left } = req.body;

    try {
        const newBook = await Book.create({
            title,
            author,
            price,
            genre_id,
            copies_left,
        });
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(400).json({ error: error.message || 'Error creating book' });
    }
};

// Update an existing book
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, price, genre_id, copies_left } = req.body;

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (title !== undefined) book.title = title;
        if (author !== undefined) book.author = author;
        if (price !== undefined) book.price = price;
        if (genre_id !== undefined) book.genre_id = genre_id;
        if (copies_left !== undefined) book.copies_left = copies_left;

        await book.save();
        res.json(book);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(400).json({ error: error.message || 'Error updating book' });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await book.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Error deleting book' });
    }
};

// Genres Controller Functions
// Retrieve all genres
const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (error) {
        console.error('Error retrieving genres:', error);
        res.status(500).json({ error: 'Error retrieving genres' });
    }
};

// Retrieve a particular genre by id
const getGenre = async (req, res) => {
    const { id } = req.params;

    try {
        const genre = await Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        res.json(genre);
    } catch (error) {
        console.error('Error retrieving genre:', error);
        res.status(500).json({ error: 'Error retrieving genre' });
    }
};

// Create a new genre
const createGenre = async (req, res) => {
    const { name } = req.body;

    try {
        const newGenre = await Genre.create({ name });
        res.status(201).json(newGenre);
    } catch (error) {
        console.error('Error creating genre:', error);
        res.status(400).json({ error: error.message || 'Error creating genre' });
    }
};

// Update an existing genre
const updateGenre = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const genre = await Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }

        if (name !== undefined) genre.name = name;

        await genre.save();
        res.json(genre);
    } catch (error) {
        console.error('Error updating genre:', error);
        res.status(400).json({ error: error.message || 'Error updating genre' });
    }
};

// Delete a genre
const deleteGenre = async (req, res) => {
    const { id } = req.params;

    try {
        const genre = await Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }

        await genre.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting genre:', error);
        res.status(500).json({ error: 'Error deleting genre' });
    }
};

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    getAllGenres,
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre,
};
