import { LolzinhoError } from "../LolzinhoError";
import { RiotApiError } from "../RiotApiError";

describe("LolzinhoError", () => {
  it("deve criar um erro com a mensagem fornecida", () => {
    const message = "Teste de erro";
    const error = new LolzinhoError(message);

    expect(error.message).toBe(message);
    expect(error.riotError).toBeUndefined();
  });

  it("deve incluir informações do RiotApiError na mensagem quando fornecido", () => {
    const message = "Erro ao buscar dados";
    const riotError = new RiotApiError(404, "Not Found");
    const error = new LolzinhoError(message, riotError);

    expect(error.message).toBe(`${message} - (404) Not Found`);
    expect(error).toHaveProperty("riotError", riotError);
  });
});
