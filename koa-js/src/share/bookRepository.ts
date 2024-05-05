import { Books } from '../handlers/books/books.interface';
import { books } from '../share/data-distionary';
import fs from 'fs';

const getAll = () => {
  return books;
};

const getById = (id: any) => {
  return books.find((book) => book.id === id);
};

const create = (data: Books) => {
  const updatedBooks = [data, ...books];
  return fs.writeFileSync(
    './src/database/books.json',
    JSON.stringify({
      data: updatedBooks,
    })
  );
};

const deleted = async (id: string) => {
  try {
    const bookToDelete = await books.find((book) => book.id === id);

    if (!bookToDelete) {
      return null;
    }

    const updatedData = await books.filter((book) => book.id !== id);

    fs.writeFileSync(
      './src/database/books.json',
      JSON.stringify({
        data: updatedData,
      })
    );
  } catch (error) {
    throw error;
  }
};

const updated = async (id: string, data: Books) => {
  try {
    const book = await getById(id);
    console.log('book', book);

    if (!book) {
      return null;
    }

    book.name = data.name;
    book.author = data.author;

    return fs.writeFileSync(
      './src/database/books.json',
      JSON.stringify({
        data: books,
      })
    );
  } catch (error) {
    throw error;
  }
};

export default {
  getById,
  getAll,
  create,
  deleted,
  updated,
};
