import { LolzinhoClient, LolzinhoClientClass } from "../";
import * as config from "../config";

describe("Config", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("setConfig", () => {
    it("should apply default routing values when missing", () => {
      config.setConfig({ riotApiKey: "abc123" });

      expect(config.lolzinhoConfig).toEqual({
        riotApiKey: "abc123",
        regionalRouting: "americas",
        platformRouting: "br1",
      });
    });

    it("should override default routing when values are passed", () => {
      config.setConfig({
        riotApiKey: "abc123",
        regionalRouting: "europe",
        platformRouting: "euw1",
      });

      expect(config.lolzinhoConfig).toEqual({
        riotApiKey: "abc123",
        regionalRouting: "europe",
        platformRouting: "euw1",
      });
    });
  });

  it("getConfig should return current config", () => {
    config.setConfig({ riotApiKey: "abc123" });

    const currentConfig = config.getConfig();

    expect(currentConfig).toEqual({
      riotApiKey: "abc123",
      regionalRouting: "americas",
      platformRouting: "br1",
    });
  });

  it("checkConfig should return true if LolzinhoClient is set and not empty", () => {
    jest.mock("../", () => ({
      LolzinhoClient: new LolzinhoClientClass(),
    }));

    LolzinhoClient.init({
      riotApiKey: "123456",
    });

    const isValid = config.checkConfig();
    expect(isValid).toBe(true);
  });

  it("checkConfig should return true if LolzinhoClient is set and not empty", async () => {
    jest.mock("../", () => ({
      LolzinhoClient: new LolzinhoClientClass(),
    }));

    const config = await import("../config");

    const result = config.checkConfig();
    expect(result).toBe(true);
  });
});
