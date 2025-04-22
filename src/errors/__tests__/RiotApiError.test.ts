import { RiotApiError } from "../RiotApiError";

describe("RiotApiError", () => {
  it("should create an error with the provided statusCode and message", () => {
    const statusCode = 403;
    const message = "Forbidden";
    const error = new RiotApiError(statusCode, message);

    expect(error.statusCode).toBe(statusCode);
    expect(error.message).toBe(message);
  });
});
