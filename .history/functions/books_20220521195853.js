exports = async function(payload, response) {

    const {booksPerPage = 20, page = 0} = payload.query;
  
    let query = {};

    const collection = context.services.get("mongodb-atlas").db("booklib").collection("books");
    let restaurantsList = await collection.find(query).skip(page*restaurantsPerPage).limit(restaurantsPerPage).toArray()
  
    restaurantsList.forEach(restaurant => {
      restaurant._id = restaurant._id.toString();
    });
  
    const responseData = {
      restaurants: restaurantsList,
      page: page.toString(),
      filters: {},
      entries_per_page: restaurantsPerPage.toString(),
      total_results: restaurantsList.length.toString(),
    };
    
    return responseData;
  };