import axios from "axios";
import { LolzinhoError } from "../../../errors/LolzinhoError";
import { RiotApiError } from "../../../errors/RiotApiError";
import { FreeWeekService } from "../freeweek.service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("FreeWeekService", () => {
  const riotApiKey = "test-api-key";
  const platformRouting = "br1";
  let service: FreeWeekService;
  let mockAxiosInstance: any;

  beforeEach(() => {
    mockAxiosInstance = {
      get: jest.fn(),
    };

    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    service = new FreeWeekService(riotApiKey, platformRouting);

    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create an axios instance correctly", () => {
      service = new FreeWeekService(riotApiKey, platformRouting);

      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: `https://${platformRouting}.api.riotgames.com`,
        headers: {
          "X-Riot-Token": riotApiKey,
        },
      });
    });
  });

  describe("getFreeWeekChampions", () => {
    it("should return free week champions data when request it's been succeeded", async () => {
      const mockData = {
        freeChampionsIds: [1, 2, 3],
        freeChampionsIdsForNewPlayers: [4, 5, 6],
        maxNewPlayerLevel: 10,
      };

      const mockResponse = {
        data: mockData,
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await service.getFreeWeekChampions();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        "/lol/platform/v3/champion-rotations"
      );
      expect(result).toEqual(mockData);
    });

    it("should throw an LolzinhoError when request fails", async () => {
      const riotError = new RiotApiError(403, "Forbidden");

      mockAxiosInstance.get.mockRejectedValue(riotError);

      await expect(service.getFreeWeekChampions()).rejects.toThrow(
        LolzinhoError
      );

      await expect(service.getFreeWeekChampions()).rejects.toHaveProperty(
        "message",
        "Error while fetching Free Week champions - (403) Forbidden"
      );
    });
  });
});
