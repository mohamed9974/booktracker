exports = async function(payload, response) {

    if (payload.body) {
        const body =  EJSON.parse(payload.body.text());
        const reviews = context.services.get("mongodb-atlas").db("booklib").collection("reviews");
        
        const reviewDoc = {
            title: body.name,
            reviewer: body.user_id,
            date: new Date(),
            text: body.text,
            book_id: BSON.ObjectId(body.book_id)
        };
    
        return await reviews.insertOne(reviewDoc);
    }
  
    return  {};
  };