exports = async function(payload, response) {

    if (payload.body) {
        const body =  EJSON.parse(payload.body.text());
        const reviews = context.services.get("mongodb-atlas").db("booklib").collection("reviews");
    
        const updateResponse = await reviews.updateOne(
          { reviewer: body.reviewer, _id: BSON.ObjectId(body.review_id), book_id: BSON.ObjectId(body.book_id), book_title: body.book_title },
          { $set: { review: body.text , title:body.title , rating: body.rating } }
        )
  
        return updateResponse;
      }
  
    return  {};
  };