import { RiotApiError } from "../RiotApiError";

describe("RiotApiError", () => {
  it("deve criar um erro com o statusCode e a mensagem fornecidos", () => {
    const statusCode = 403;
    const message = "Forbidden";
    const error = new RiotApiError(statusCode, message);

    expect(error.statusCode).toBe(statusCode);
    expect(error.message).toBe(message);
  });
});
