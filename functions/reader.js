exports = async function(payload, response) {

    const collection = context.services.get("mongodb-atlas").db("booklib").collection("readers");
    const readers = await collection.distinct("name");
    
    return readers;
  };