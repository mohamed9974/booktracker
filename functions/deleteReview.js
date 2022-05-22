exports = async function(payload, response) {
  
    const reviews = context.services.get("mongodb-atlas").db("booklib").collection("reviews");
    const deleteResponse = await reviews.deleteOne({
      _id: BSON.ObjectId(payload.query.id)
    })
  
    return deleteResponse

  };