import { RiotApiError } from "../RiotApiError";
import { ZhonyaError } from "../ZhonyaError";

describe("ZhonyaError", () => {
  it("should create an error with the provided message", () => {
    const message = "Error test";
    const error = new ZhonyaError(message);

    expect(error.message).toBe(message);
    expect(error.riotError).toBeUndefined();
  });

  it("should include RiotApiError information in the message when provided", () => {
    const message = "Error fetching data";

    const riotErrorMessage = "Not Found";

    const riotError = new RiotApiError(404, riotErrorMessage);
    const error = new ZhonyaError(message, riotError);

    expect(error.message).toBe(`${message} - ${riotErrorMessage}`);
    expect(error).toHaveProperty("riotError", riotError);
  });
});
