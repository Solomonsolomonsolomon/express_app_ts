import bcrypt from "bcrypt";
import { Helper } from "../utils/JWTHelper";
import { UserRepository } from "../repositories/UserRepository";
import mongoose from "mongoose";

export class AuthService {
  private static instance: AuthService;
  private userRepository: UserRepository;
  private jwtHelper: Helper;

  private constructor() {
    this.userRepository = UserRepository.getInstance();
    this.jwtHelper = Helper.getInstance();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async registerUser(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createUser({
      username,
      password: hashedPassword,
    });
    return newUser;
  }

  async loginUser(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const accessToken = this.jwtHelper.generateAccessToken(user._id.toString());
    const refreshToken = this.jwtHelper.generateRefreshToken(
      user._id.toString()
    );

    await this.userRepository.addRefreshToken(user._id as any, refreshToken);

    return { accessToken, refreshToken,user };
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = this.jwtHelper.verifyRefreshToken(refreshToken);

    const user = await this.userRepository.findById(decoded.userId);
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      throw new Error("Invalid Refresh Token");
    }

    const newAccessToken = this.jwtHelper.generateAccessToken(
      user._id.toString()
    );

    const newRefreshToken = this.jwtHelper.generateRefreshToken(
      user._id.toString()
    );
    await this.userRepository.replaceRefreshToken(
      user._id as any,
      refreshToken,
      newRefreshToken
    );

    return { newAccessToken, newRefreshToken };
  }

  async logoutUser(userId: string, token: string, refreshToken: string) {
    await this.userRepository.removeToken(userId, token);
    await this.userRepository.removeRefreshToken(userId, refreshToken);
  }
}
