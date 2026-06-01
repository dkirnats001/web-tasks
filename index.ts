import { LibraryBook } from './types/LibraryBook';
import { Book } from './types/Book';

const book1: Book = {
  title: 'Война и мир',
  author: 'Лев Толстой',
  year: 1869
};

const book2: Book = {
  title: 'Преступление и наказание',
  author: 'Фёдор Достоевский',
  year: 1866
};

const libraryBook1 = new LibraryBook(book1);
const libraryBook2 = new LibraryBook(book2);

libraryBook1.borrow('Анна');
libraryBook2.borrow('Иван');
