import request from "supertest";
import app from "../app";
import User from "../models/User.model";
import { mongodb } from "../../config/MongoConnection";
describe("POST api/v1/register", () => {
  it("should return with a 201 status", async () => {
    await request(app)
      .post("/api/v1/register")
      .send({
        username: "solomon",
        password: "password",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
  });
});

describe("POST api/v1/register", () => {
  it("should fail as user already registered", async () => {
    await request(app)
      .post("/api/v1/register")
      .send({
        username: "solomon",
        password: "password",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
