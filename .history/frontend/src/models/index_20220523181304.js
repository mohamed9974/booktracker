
import {createRealmContext} from '@realm/react';
import {BooksSchema,Books_reviewsSchema,readerSchema,reader_favorite_BooksSchema,reader_reviewsSchema,reviewSchema} from './bookstoreOM';

export const TaskRealmContext = createRealmContext({
  schema: [BooksSchema,Books_reviewsSchema,readerSchema,reader_favorite_BooksSchema,reader_reviewsSchema,reviewSchema],
});