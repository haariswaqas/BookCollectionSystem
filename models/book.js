const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define the Genre model
const Genre = sequelize.define('Genre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Define the Book model
const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Genre, // References the Genre model
            key: 'id', // The field in the Genre model
        },
        onUpdate: 'CASCADE', // Optional: handles updates
        onDelete: 'SET NULL', // Optional: handles deletions
    },
    copies_left: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

// Establish associations
Book.belongsTo(Genre, { foreignKey: 'genre_id' });
Genre.hasMany(Book, { foreignKey: 'genre_id' });

module.exports = { Book, Genre };
