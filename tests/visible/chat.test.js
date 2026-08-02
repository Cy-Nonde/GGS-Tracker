// tests/chat.test.js
const request = require("supertest");
const express = require("express");
const chatRoutes = require("../server/routes/chatRoutes");

const app = express();
app.use(express.json());
app.use("/api", chatRoutes);

describe("Chatbot API", () => {
  it("should return a reply from AI", async () => {
    const res = await request(app)
      .post("/api/chat")
      .send({ message: "Hello AI" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.reply).toBeDefined();
  });
});