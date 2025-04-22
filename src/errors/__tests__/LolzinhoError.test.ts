import { LolzinhoError } from "../LolzinhoError";
import { RiotApiError } from "../RiotApiError";

describe("LolzinhoError", () => {
  it("should create an error with the provided message", () => {
    const message = "Error test";
    const error = new LolzinhoError(message);

    expect(error.message).toBe(message);
    expect(error.riotError).toBeUndefined();
  });

  it("should include RiotApiError information in the message when provided", () => {
    const message = "Error fetching data";
    const riotError = new RiotApiError(404, "Not Found");
    const error = new LolzinhoError(message, riotError);

    expect(error.message).toBe(`${message} - (404) Not Found`);
    expect(error).toHaveProperty("riotError", riotError);
  });
});
