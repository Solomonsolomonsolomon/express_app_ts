import app from "./app";
import config from "../config/config";
const { port } = config;
import { mongodb } from "../config/MongoConnection";
(async () => {
  await mongodb.connect();

  app.listen(port, () => {
    console.log(`${config.NODE_ENV} Server is running on port ${port}`);
  });
})();
