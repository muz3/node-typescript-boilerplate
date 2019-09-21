import mongoose from 'mongoose';

export const bookSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export const Book = mongoose.model('Book', bookSchema);
