import { Book } from './types/Book';
import { Repository } from './core/Repository';

const bookRepo = new Repository<Book>();

bookRepo.add({ title: '1984', author: 'Джордж Оруэлл', year: 1949 });
bookRepo.add({ title: 'Скотный двор', author: 'Джордж Оруэлл', year: 1945 });

function updateBook(book: Book, updates: Partial<Book>): Book {
  return { ...book, ...updates };
}

const oldBook = bookRepo.getAll()[0];
const updatedBook = updateBook(oldBook, { year: 1950 });
console.log('Обновлённая книга:', updatedBook);

function getReadonlyBooks(repo: Repository<Book>): Readonly<Book[]> {
  return repo.getAll();
}

const readonlyBooks = getReadonlyBooks(bookRepo);
console.log('Все книги (только для чтения):', readonlyBooks);

// Пример кода, который выдаст ошибку (закомментирован)
/*
readonlyBooks[0] = { title: 'Ошибка', author: 'Ошибка', year: 0 };
// Ошибка: Cannot assign to '0' because it is a read-only property
*/
