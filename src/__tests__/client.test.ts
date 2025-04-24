import { ZhonyaClient } from "../client";

jest.mock("../internal/Puuid/puuid.service");
jest.mock("../resources/summoner/summoner.service");
jest.mock("../resources/freeWeek/freeweek.service");
jest.mock("../resources/champion/champion.service");

describe("ZhonyaClient", () => {
  describe("init", () => {
    it("should initialize client without an API key", () => {
      expect(() => {
        ZhonyaClient.init();
      }).not.toThrow();
    });

    it("should return a configured client", () => {
      const client = ZhonyaClient.init({
        riotApiKey: "test-key",
        regionalRouting: "europe",
        platformRouting: "euw1",
        language: "pt_BR",
      });

      expect(client).toBeInstanceOf(ZhonyaClient);
      expect(client.config).toEqual({
        riotApiKey: "test-key",
        regionalRouting: "europe",
        platformRouting: "euw1",
        language: "pt_BR",
      });
    });
  });

  describe("method calls without initialization", () => {
    let uninitializedClient: ZhonyaClient;

    beforeAll(() => {
      // Hack to create an uninitialized client
      // @ts-ignore - Accessing private constructor
      uninitializedClient = new ZhonyaClient({
        riotApiKey: "test-key",
      });
    });

    it("getSummonerByName should throw if client is not initialized", async () => {
      await expect(
        uninitializedClient.getSummonerByName("testname")
      ).rejects.toThrow("Zhonya client must be initialized before use");
    });

    it("getFreeWeek should throw if client is not initialized", async () => {
      await expect(uninitializedClient.getFreeWeek()).rejects.toThrow(
        "Zhonya client must be initialized before use"
      );
    });

    it("getAllChampions should throw if client is not initialized", async () => {
      await expect(uninitializedClient.getAllChampions()).rejects.toThrow(
        "Zhonya client must be initialized before use"
      );
    });
  });

  describe("method calls without API key", () => {
    let clientWithoutApiKey: ZhonyaClient;

    beforeAll(() => {
      clientWithoutApiKey = ZhonyaClient.init();
    });

    it("getSummonerByName should throw if API key is not provided", async () => {
      await expect(
        clientWithoutApiKey.getSummonerByName("testname")
      ).rejects.toThrow(
        "Riot API key is required for this method. Initialize the client with a valid API key."
      );
    });

    it("getFreeWeek should throw if API key is not provided", async () => {
      await expect(clientWithoutApiKey.getFreeWeek()).rejects.toThrow(
        "Riot API key is required for this method. Initialize the client with a valid API key."
      );
    });

    it("getAllChampions should work without API key", async () => {
      const mockGetAllChampions = jest.fn().mockResolvedValue({});
      clientWithoutApiKey["championService"].getAllChampions =
        mockGetAllChampions;

      await expect(
        clientWithoutApiKey.getAllChampions()
      ).resolves.not.toThrow();
      expect(mockGetAllChampions).toHaveBeenCalledTimes(1);
    });
  });
});
