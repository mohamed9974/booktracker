
import {Realm, createRealmContext } from '@realm/react';
import { bookstoreOM } from './bookstoreOM';

export const appRealmContext = Realm.App.getApp(
    '5e8f8f8f-f9c1-4b3e-b8c8-f8f8f8f8f8f8',
    'bookstore',
);
export const bookstore = appRealmContext.services.mongodb('bookstore');
export const booksCollection = bookstore.db('bookstore').collection('books');
export const reviewsCollection = bookstore.db('bookstore').collection('reviews');
export const usersCollection = bookstore.db('bookstore').collection('users');
export const auth = appRealmContext.auth;
export const user = appRealmContext.user;
export const userId = appRealmContext.userId;


export const BookstoreContext = createRealmContext(bookstoreOM);
