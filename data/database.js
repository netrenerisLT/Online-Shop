const mongdodb = require("mongodb");

const mongoClient = mongdodb.MongoClient;

let database;

async function connectDatabase() {
  const client = await mongoClient.connect("mongodb://localhost:27017");
  database = client.db("online-shop");
}

function getDb() {
  if (!database) {
    throw new Error("You must connect to DB first.");
  }
  return database;
}

module.exports = {
  connectDatabase: connectDatabase,
  getDb: getDb,
};
