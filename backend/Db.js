const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

    // Print a message indicating that we're connected
    console.log('Connected to MongoDB');

    // Access the database
    const db = mongoose.connection;

    // Wait for the connection to be established before querying the database
    
      const collection = db.collection('food-items');
      //const count = await collection.countDocuments();
      //console.log(`The collection contains ${count} documents.`);
      const docs = await collection.find({}).toArray();
      const category= db.collection('foodCollection');
      const data = await category.find({}).toArray();
     // console.log('Found the following records:');
      //console.log(docs);
    global.foodItem=docs;
    global.foodCategory=data;
    

  } catch(err) {
    console.log(err);
  }
}

module.exports = connectToMongoDB;