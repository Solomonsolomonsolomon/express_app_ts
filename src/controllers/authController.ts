import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import config from "../../config/config";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { ApplicationError } from "../utils/errorHandler";
const { JWT } = config;
//const authService = AuthService.getInstance();

export class AuthController {
  authService;
  constructor() {
    this.authService = AuthService.getInstance();
  }

  register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password)
      throw new ApplicationError(
        "username and password required",
        HttpStatusCodes.BAD_REQUEST
      );

    const user = await this.authService.registerUser(username, password);
    res
      .status(HttpStatusCodes.CREATED)
      .json({ status: HttpStatusCodes.CREATED, message: "User created", user });
  };

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password)
      throw new ApplicationError(
        "enter username and password",
        HttpStatusCodes.BAD_REQUEST
      );
    const { accessToken, refreshToken, user } =
      await this.authService.loginUser(username, password);
    const tokens = {
      accessToken: {
        token: accessToken,
        expiry: JWT.accessToken.exp,
      },

      refreshToken: {
        token: refreshToken,
        expiry: JWT.refreshToken.exp,
      },
    };

    req.user = user;

    res.status(HttpStatusCodes.OK).json({
      status: HttpStatusCodes.OK,
      message: "Login successful",
      tokens,
      user,
    });
  };

  logout = async (req: Request, res: Response) => {
    const { userId, token, refreshToken } = req.body;

    await this.authService.logoutUser(userId, token, refreshToken);
    res
      .status(HttpStatusCodes.OK)
      .json({ status: HttpStatusCodes.OK, message: "Logged out successfully" });
  };

  async refresh(req: Request, res: Response) {
    let { refresh } = req.headers;
    if (typeof refresh !== "string")
      throw new ApplicationError(
        "refresh token must be a string",
        HttpStatusCodes.BAD_REQUEST
      );

    this.authService.refreshAccessToken(refresh);
  }
}
