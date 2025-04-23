import { ZhonyaClient, ZhonyaClientClass } from "../";
import * as config from "../config";

describe("Config", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("setConfig", () => {
    it("should apply default routing values when missing", () => {
      config.setConfig({ riotApiKey: "abc123" });

      expect(config.zhonyaConfig).toEqual({
        riotApiKey: "abc123",
        regionalRouting: "americas",
        platformRouting: "br1",
        language: "en_US",
      });
    });

    it("should override default routing when values are passed", () => {
      config.setConfig({
        riotApiKey: "abc123",
        regionalRouting: "europe",
        platformRouting: "euw1",
      });

      expect(config.zhonyaConfig).toEqual({
        riotApiKey: "abc123",
        regionalRouting: "europe",
        platformRouting: "euw1",
        language: "en_US",
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
      language: "en_US",
    });
  });

  it("checkConfig should return true if ZhonyaClient is set and not empty", () => {
    jest.mock("../", () => ({
      ZhonyaClient: new ZhonyaClientClass(),
    }));

    ZhonyaClient.init({
      riotApiKey: "123456",
    });

    const isValid = config.checkConfig();
    expect(isValid).toBe(true);
  });

  it("checkConfig should return true if ZhonyaClient is set and not empty", async () => {
    jest.mock("../", () => ({
      ZhonyaClient: new ZhonyaClientClass(),
    }));

    const config = await import("../config");

    const result = config.checkConfig();
    expect(result).toBe(true);
  });
});
