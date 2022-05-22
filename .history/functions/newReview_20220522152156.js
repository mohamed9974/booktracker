exports = async function(payload, response) {

    if (payload.body) {
        const body =  EJSON.parse(payload.body.text());
        const reviews = context.services.get("mongodb-atlas").db("booklib").collection("reviews");
        
        const reviewDoc = {
            title: body.name,
            reviewer: body.user_id,
            review: body.text,
            book_id: BSON.ObjectId(body.book_id),
            rating : body.rating,

        };
    
        return await reviews.insertOne(reviewDoc);
    }
  
    return  {};
  };