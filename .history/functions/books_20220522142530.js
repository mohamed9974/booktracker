exports = async function (payload, response) {

  const { booksPerPage = 20, page = 0 } = payload.query;

  let query = {};
  if (payload.query.author) {
    query = { $text: { $search: payload.query.author} }
  }
  // else if (payload.query.zipcode) {
  //   query = { "address.zipcode": { $eq: payload.query.zipcode } }
  else if (payload.query.name) {
    query = { $text: { $search: payload.query.name } }
  }

  const collection = context.services.get("mongodb-atlas").db("booklib").collection("books");
  let booksList = await collection.find(query).skip(page * booksPerPage).limit(booksPerPage).toArray()

  booksList.forEach(book => {
    book._id = book._id.toString();
  });

  const responseData = {
    books: booksList,
    page: page.toString(),
    filters: {},
    entries_per_page: booksPerPage.toString(),
    total_results: booksList.length.toString(),
  };

  return responseData;
};