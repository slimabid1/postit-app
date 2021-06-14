import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import PostitsDAO from "./dao/postitsDAO.js";

dotenv.config(); //process.env

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.POSTITS_DB_URI, {
  poolSize: 50,
  wtimeout: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    PostitsDAO.injectDB(client); // to verify no problem with connectivity.
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
