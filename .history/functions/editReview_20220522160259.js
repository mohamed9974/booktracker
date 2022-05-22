exports = async function(payload, response) {

    if (payload.body) {
        const body =  EJSON.parse(payload.body.text());
        const reviews = context.services.get("mongodb-atlas").db("booklib").collection("reviews");
    
        const updateResponse = await reviews.updateOne(
          { reviewer: body.reviewer, _id: BSON.ObjectId(body.review_id)},
          { $set: { text: body.text } },
        )
  
        return updateResponse;
      }
  
    return  {};
  };