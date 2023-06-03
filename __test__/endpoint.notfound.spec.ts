import request from "supertest";
import { app } from "..";

describe("Testing for Invalid endpoint", () => {
  test("/invalidendpoint", async () => {
    const response = await request(app.express).get("/icikiwirasdasdasd");

    expect(response.statusCode).toEqual(404);
    expect(response.body).toMatchObject({
      status: "failed",
      statusCode: "404",
      message: expect.any(String),
    });
  });
});
