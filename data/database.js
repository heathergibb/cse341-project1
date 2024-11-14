const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

dotenv.config();
let db;

const initDb = (callback) => {
  if (db) {
    console.log('DB is already initialized.');
    return callback(null, db);
  }
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      db = client;
      callback(null, db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!db) {
    throw Error('Database not initialized');
  }
  return db;
};

module.exports = {
  initDb,
  getDb
};
