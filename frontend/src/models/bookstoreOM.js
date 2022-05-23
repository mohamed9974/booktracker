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

  
    static reviewSchema = {
      name: 'review',
      properties: {
        _id: 'objectId?',
        _partition: 'string?',
        book_id: 'objectId?',
        book_title: 'string?',
        rating: 'double',
        review: 'string?',
        reviewer: 'objectId?',
        title: 'string',
      },
      primaryKey: '_id',
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
    static Books_reviewsSchema = {
      name: 'Books_reviews',
      embedded: true,
      properties: {
        _id: 'objectId?',
        rating: { type: 'double', default: 0 },
        review: 'string',
        reviewer: 'objectId?',
        title: 'string?',
      },
    };
}

const bookstore = bookstoreOM();
bookstore.init();

bookstore.addReader({
  name: 'John Smith',
  favorite_Books: [
    {
      "author": "John Smith",
      "genre": "Fiction",
      "rating": 0,
      "title": "The Hobbit"
    },
    {
      "author": "John Smith",
      "genre": "Fiction",
      "rating": 0,
      "title": "The Lord of the Rings"
    }],
  reviews: [
    {
      "book_id": "1",
      "book_title": "The Hobbit",
      "rating": 5,
      "review": "This is a review of The Hobbit",
      "title": "The Hobbit",
      "reviewer": "John Smith"
    },
    {
      "book_id": "2",
      "book_title": "The Lord of the Rings",
      "rating": 5,
      "review": "This is a review of The Lord of the Rings",
      "title": "The Lord of the Rings",
      "reviewer": "John Smith"
    }
  ]
});
bookstore.addReader({
  name: 'Jane Smith',
  favorite_Books: [
    {
      "author": "Jane Smith",
      "genre": "Fiction",
      "rating": 0,
      "title": "The Hobbit"
    },
    {
      "author": "Jane Smith",
      "genre": "Fiction",
      "rating": 0,
      "title": "The Lord of the Rings"
    }],
  reviews: [
    {
      "book_id": "1",
      "book_title": "The Hobbit",
      "rating": 5,
      "review": "This is a review of The Hobbit",
      "title": "The Hobbit",
      "reviewer": "Jane Smith"
    },
    {
      "book_id": "2",
      "book_title": "The Lord of the Rings",
      "rating": 5,
      "review": "This is a review of The Lord of the Rings",
      "title": "The Lord of the Rings",
      "reviewer": "Jane Smith"
    }
  ]
});



bookstore.addBook({
  _id: 1,
  author: "J.R.R. Tolkien",
  title: "The Lord of the Rings",
  cover : "https://images-na.ssl-images-amazon.com/images/I/51Zr01ArzkL._SX331_BO1,204,203,200_.jpg",
description: "The Lord of the Rings is the eleventh novel in the J. R. R. Tolkien" +
"trilogy and the first of three volumes in the epic fantasy series." +
"It was published on 19 December 1937 by British Crown Publishing and" +
"later re-issued under the imprint of P. W. O'Brien and Sons. The story" +
"begins as Bilbo Baggins, a hobbit from the Shire, is swept away from" +
"his home in Mirkwood to the Lonely Mountain, where he must fight" +
"against an evil lord in order to save his home from falling into the" +
"hands of the Dark Lord Sauron, the one who has tried to destroy the" +
"Shire and the entire Middle-earth.",
  genre: "Fantasy",
  is_Fiction: true,
  publishDate: "1937-12-19",
  publisher: "P. W. O'Brien and Sons",
  rating: 5,
  reviews: [],
  translator: "",
});
bookstore.addBook({
  _id: 2,
  author: "J.K. Rowling",
  title: "Harry Potter and the Philosopher's Stone",
  cover : "https://images-na.ssl-images-amazon.com/images/I/51Zr01ArzkL._SX331_BO1,204,203,200_.jpg",
description: "Harry Potter and the Philosopher's Stone is the first novel" +
"in the Harry Potter series and Rowling's debut novel. It was released" +
"on 26 June 1997 by Bloomsbury Publishing. The plot follows Harry" +
"Potter, a young wizard who discovers his magical heritage on his" +
"one and only non-magical night in the year 1900, when he receives a" +
"letter of acceptance to Hogwarts School of Witchcraft and Wizardry." +
"Harry is invited to attend an induction of the school but he refuses" +
"and instead enrolls in the Department of Defense Academy, a school" +
"for gifted young people who can use their abilities to learn about" +
"magic. Harry Potter is also invited to attend the school's first" +
"wizarding conference, the International Conference on the Use of" +
"Magic, held in Edinburgh, Scotland, on 4 July, 1997. Harry Potter" +
"accepts the invitation and is accepted into the school. He is" +
"embarked on a mission to destroy the Horcruxes, a magical item" +
"that opens the Chamber of Secrets, which is the school's final" +
"location. He is also invited to attend the second wizarding" +
"conference, the International Conference on the Use of Magic, held" +
"in Edinburgh, Scotland, on 4 July, 1997. Harry Potter accepts the" +
"invitation and is accepted into the school. He is embarked on a" +
"mission to destroy the Horcruxes, a magical item that opens the" +
"Chamber of Secrets, which is the school's final location. He is" +
"also invited to attend the second wizarding conference, the" +
"International Conference on the Use of Magic, held in Edinburgh, Scotland," +
"on 4 July, 1997. Harry Potter accepts the invitation and is accepted" +
"into the school. He is embarked on a mission to destroy the" +
"Horcruxes, a magical item that opens the Chamber of Secrets, which" +
"is the school's final location. He is also invited to attend the" +
"second wizarding conference, the International Conference on the Use of" +
"Magic, held in Edinburgh, Scotland, on 4 July, 1997. Harry Potter" +
"accepts the invitation and is accepted into the school. He is" +
"embarked on a mission to destroy the Horcruxes, a magical item that" +
"opens the Chamber of Secrets, which is the school's final location.",
  genre: "Fantasy",
  is_Fiction: true,
  publishDate: "1997-06-26",
  publisher: "Bloomsbury Publishing",
  rating: 5,
  reviews: [],
  translator: "",
});
bookstore.addBook({
  _id: 3,
  author: "J.K. Rowling",
  title: "Harry Potter and the Chamber of Secrets",
  cover : "https://images-na.ssl-images-amazon.com/images/I/51Zr01ArzkL._SX331_BO1,204,203,200_.jpg",
description: "Harry Potter and the Chamber of Secrets is the second" +
"book in the Harry Potter series and is written by J.K. Rowling." +
"The story follows Harry Potter, a young wizard who discovers that" +
"he is a wizard and has been invited to attend Hogwarts School of" +
"Wizardry, a school of magic where the only remaining members of" +
"the Order of the Phoenix are supposed to be students. Harry" +
"accepts the invitation and is accepted into the school. He is" +
"embarked on a mission to destroy the Horcruxes, a magical item" +
"that opens the Chamber of Secrets, which is the school's final" +
"location. He is also invited to attend the second wizarding" +
"conference, the International Conference on the Use of Magic, held" +
"in Edinburgh, Scotland, on 4 July, 1997. Harry Potter accepts the" +
"invitation and is accepted into the school. He is embarked on a" +
"mission to destroy the Horcruxes, a magical item that opens the" +
"Chamber of Secrets, which is the school's final location. He is" +
"also invited to attend the second wizarding conference, the" +
"International Conference on the Use of Magic, held in Edinburgh, Scotland," +
"on 4 July, 1997. Harry Potter accepts the invitation and is accepted" +
"into the school. He is embarked on a mission to destroy the" +
"Horcruxes, a magical item that opens the Chamber of Secrets, which" +
"is the school's final location. He is also invited to attend the" +
"second wizarding conference, the International Conference on the Use of" +
"Magic, held in Edinburgh, Scotland, on 4 July, 1997. Harry Potter" +
"accepts the invitation and is accepted into the school. He is" +
"embarked on a mission to destroy the Horcruxes, a magical item that" +
"opens the Chamber of Secrets, which is the school's final location.",
  genre: "Fantasy",
  is_Fiction: true,
  publishDate: "1997-06-26",
  publisher: "Bloomsbury Publishing",
  rating: 5,
  reviews: [],
  translator: "",
});
