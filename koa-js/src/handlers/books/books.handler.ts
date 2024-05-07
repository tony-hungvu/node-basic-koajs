import { Context } from 'koa';
import bookRepository from '../../share/bookRepository';

const getBooks = async (ctx: Context) => {
  try {
    const books = await bookRepository.getAll();

    ctx.body = {
      data: books,
    };
  } catch (error: any) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

const getBookById = async (ctx: Context) => {
  const { id } = ctx.params;

  try {
    const book = await bookRepository.getById(id);

    ctx.body = {
      data: book,
    };
  } catch (error: any) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

const createdBook = async (ctx: any) => {
  try {
    const postData = ctx.request.body;
    const res = await bookRepository.create(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
      res,
    });
  } catch (error: any) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};
const deletedBook = async (ctx: Context) => {
  const { id } = ctx.params;
  try {
    await bookRepository.deleted(id);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Book deleted successfully',
    };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

const updatedBook = async (ctx: any) => {
  const { id } = ctx.params;
  const postData = ctx.request.body;
  try {
    await bookRepository.updated(id, postData);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: `Book updated successfully with id: ${id}`,
    };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

export default {
  getBooks,
  getBookById,
  createdBook,
  deletedBook,
  updatedBook,
};
