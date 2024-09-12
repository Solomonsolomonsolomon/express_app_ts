import dotenv from "dotenv";
const environment = process.env.NODE_ENV || "development";
const getMongoUri = () => process.env[`${environment.toUpperCase()}_MONGO_URI`];

dotenv.config();
export const config = {
  port: process.env.PORT || 3000,
  NODE_ENV: environment,
  JWT: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET ?? "",
      exp: process.env.ACCESS_TOKEN_EXP ?? "30m",
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET ?? "",
      exp: process.env.REFRESH_TOKEN_EXP ?? "1w",
    },
  },
  db: {
    mongo_uri: getMongoUri() || "mongodb://localhost:27017/testdb",
  },
};

//template by solomonsolomonsolomon

export default config;
