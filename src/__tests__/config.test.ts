import { ZhonyaClient } from "../client";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_PLATFORM_ROUTING,
  DEFAULT_REGIONAL_ROUTING,
} from "../config";

describe("Zhonya Configuration", () => {
  describe("init", () => {
    it("should apply default routing values when no parameters are provided", () => {
      const client = ZhonyaClient.init();

      expect(client.config).toEqual({
        riotApiKey: undefined,
        regionalRouting: DEFAULT_REGIONAL_ROUTING,
        platformRouting: DEFAULT_PLATFORM_ROUTING,
        language: DEFAULT_LANGUAGE,
      });
    });

    it("should apply default routing values when only API key is provided", () => {
      const client = ZhonyaClient.init({ riotApiKey: "abc123" });

      expect(client.config).toEqual({
        riotApiKey: "abc123",
        regionalRouting: DEFAULT_REGIONAL_ROUTING,
        platformRouting: DEFAULT_PLATFORM_ROUTING,
        language: DEFAULT_LANGUAGE,
      });
    });

    it("should override default routing when values are passed", () => {
      const client = ZhonyaClient.init({
        riotApiKey: "abc123",
        regionalRouting: "europe",
        platformRouting: "euw1",
        language: "pt_BR",
      });

      expect(client.config).toEqual({
        riotApiKey: "abc123",
        regionalRouting: "europe",
        platformRouting: "euw1",
        language: "pt_BR",
      });
    });
  });

  it("should create multiple client instances with different configurations", () => {
    const client1 = ZhonyaClient.init({
      riotApiKey: "key1",
      regionalRouting: "europe",
    });

    const client2 = ZhonyaClient.init({
      riotApiKey: "key2",
      platformRouting: "euw1",
    });

    expect(client1.config).toEqual({
      riotApiKey: "key1",
      regionalRouting: "europe",
      platformRouting: DEFAULT_PLATFORM_ROUTING,
      language: DEFAULT_LANGUAGE,
    });

    expect(client2.config).toEqual({
      riotApiKey: "key2",
      regionalRouting: DEFAULT_REGIONAL_ROUTING,
      platformRouting: "euw1",
      language: DEFAULT_LANGUAGE,
    });

    // Ensure clients have different config objects (not shared reference)
    expect(client1.config).not.toBe(client2.config);
  });
});
