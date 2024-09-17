import jwt,{JwtPayload} from "jsonwebtoken";
import { ApplicationError } from "./errorHandler";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import config from "../../config/config";

const accessTokenSecret = config.JWT.accessToken.secret;
const refreshTokenSecret = config.JWT.accessToken.secret; // Add a refresh token secret

export class Helper {
  private static instance: Helper;

  private constructor() {}

  static getInstance(): Helper {
    if (!Helper.instance) {
      Helper.instance = new Helper();
    }
    return Helper.instance;
  }

  public generateAccessToken(userId: string) {
    return jwt.sign({ userId }, accessTokenSecret, { expiresIn: config.JWT.accessToken.exp });
  }

  public generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: config.JWT.refreshToken.exp }); 
  }

  public verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, accessTokenSecret);
    } catch (error) {
      throw new ApplicationError("Invalid Token", HttpStatusCodes.UNAUTHORIZED);
    }
  }

  public verifyRefreshToken(token: string) {
   try {
    const decoded = jwt.verify(token, refreshTokenSecret) as JwtPayload;

    if (!decoded.userId) {
      throw new ApplicationError('Invalid Token', HttpStatusCodes.UNAUTHORIZED);
    }

    return decoded.userId;
  } catch (error) {
    throw new ApplicationError('Invalid Token', HttpStatusCodes.UNAUTHORIZED);
  }
}
}