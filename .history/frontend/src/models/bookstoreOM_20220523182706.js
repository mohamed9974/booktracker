import Realm from "realm";
export class bookstoreOM extends Realm.Object {
  static generate(description, userId) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      isComplete: false,
      createdAt: new Date(),
      userId: userId || '_SYNC_DISABLED_',
    };
  }

  static BooksSchema = {
    name: 'Books',
    properties: {
      _id: 'objectId',
      _partition: { type: 'string?', default: 'books' },
      author: 'string?',
      book_id: 'double?',
      cover: { type: 'string?', default: 'http://www.example.com/cover.jpg' },
      editor: 'string?',
      genre: { type: 'string?', default: 'Fiction' },
      is_Fiction: { type: 'bool?', default: true },
      publishDate: { type: 'string?', default: '2018-01-01' },
      publisher: { type: 'string?', default: 'John Smith' },
      rating: { type: 'double?', default: 0 },
      reviews: 'Books_reviews[]',
      title: 'string?',
      translator: 'string?',
    },
    primaryKey: '_id',
  };

  static Books_reviewsSchema = {
    name: 'Books_reviews',
    embedded: true,
    properties: {
      _id: 'objectId?',
      rating: { type: 'double', default: 0 },
      review: 'string',
      reviewer: 'string',
      title: 'string?',
    },
  };

  static readerSchema = {
    name: 'reader',
    properties: {
      _id: 'objectId?',
      _partition: 'string?',
      average_Rating: { type: 'double?', default: 0 },
      favorite_Books: 'reader_favorite_Books[]',
      name: 'string',
      number_of_Books_Read: { type: 'double', default: 0 },
      reviews: 'reader_reviews[]',
    },
    primaryKey: '_id',
  };

  static reader_favorite_BooksSchema = {
    name: 'reader_favorite_Books',
    embedded: true,
    properties: {
      author: 'string?',
      genre: 'string?',
      rating: 'double?',
      title: 'string?',
    },
  };

  static reader_reviewsSchema = {
    name: 'reader_reviews',
    embedded: true,
    properties: {
      _id: 'objectId?',
      book_id: 'string?',
      book_title: 'string?',
      rating: 'double?',
      review: 'string?',
      title: 'string?',
    },
  };

  static reviewSchema = {
    name: 'review',
    properties: {
      _id: 'objectId?',
      _partition: 'string?',
      book_id: 'string?',
      book_title: 'string?',
      rating: 'double',
      review: 'string?',
      reviewer: 'string?',
      title: 'string',
    },
    primaryKey: '_id',
  };
}