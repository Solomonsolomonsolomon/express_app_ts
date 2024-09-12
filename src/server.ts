import app from "./app";
import config from "../config/config";
import { mongodb } from "../config/MongoConnection";
(async () => {
  await mongodb.connect();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`${config.NODE_ENV} Server is running on port ${PORT}`);
  });
})();
  