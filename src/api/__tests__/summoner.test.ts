import { ZhonyaClient } from "../../client";
import { ZhonyaError } from "../../errors/ZhonyaError";
import { SummonerAPI } from "../summoner";

// Mock the client and its services
jest.mock("../../client");
jest.mock("../../internal/Puuid/puuid.service");
jest.mock("../../resources/summoner/summoner.service");

describe("SummonerAPI", () => {
  let mockClient: jest.Mocked<ZhonyaClient>;
  let summonerAPI: SummonerAPI;

  beforeEach(() => {
    // Setup mock client
    mockClient = {
      checkInitialized: jest.fn(),
      checkApiKey: jest.fn(),
      puuidService: {
        getByName: jest.fn().mockResolvedValue("test-puuid"),
      },
      summonerService: {
        getByPuuid: jest.fn().mockResolvedValue({
          id: "test-id",
          accountId: "test-account-id",
          puuid: "test-puuid",
          name: "Test Summoner",
          profileIconId: 1,
          revisionDate: new Date(),
          summonerLevel: 100,
          profileIconUrl: "http://example.com/icon.png",
        }),
      },
    } as unknown as jest.Mocked<ZhonyaClient>;

    summonerAPI = new SummonerAPI(mockClient);
  });

  describe("getByName", () => {
    it("should check if client is initialized and has API key", async () => {
      await summonerAPI.getByName("test-summoner");

      expect(mockClient.checkInitialized).toHaveBeenCalled();
      expect(mockClient.checkApiKey).toHaveBeenCalled();
    });

    it("should return summoner data when successful", async () => {
      const result = await summonerAPI.getByName("test-summoner");

      expect(mockClient.puuidService.getByName).toHaveBeenCalledWith(
        "test-summoner"
      );
      expect(mockClient.summonerService.getByPuuid).toHaveBeenCalledWith(
        "test-puuid"
      );
      expect(result).toEqual(
        expect.objectContaining({
          id: "test-id",
          puuid: "test-puuid",
        })
      );
    });

    it("should throw ZhonyaError when request fails", async () => {
      mockClient.puuidService.getByName = jest
        .fn()
        .mockRejectedValue(new Error("API error"));

      await expect(summonerAPI.getByName("test-summoner")).rejects.toThrow(
        ZhonyaError
      );
      await expect(summonerAPI.getByName("test-summoner")).rejects.toThrow(
        "Error while fetching summoner by name"
      );
    });
  });
});
