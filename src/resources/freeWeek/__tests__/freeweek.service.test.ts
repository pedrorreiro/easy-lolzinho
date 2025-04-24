import axios from "axios";
import { ZhonyaParams } from "../../../config";
import { RiotApiError } from "../../../errors/RiotApiError";
import { ZhonyaError } from "../../../errors/ZhonyaError";
import { FreeWeekService } from "../freeweek.service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("FreeWeekService", () => {
  const mockConfig: ZhonyaParams = {
    riotApiKey: "test-api-key",
    platformRouting: "br1",
    regionalRouting: "americas",
    language: "pt_BR",
  };

  let service: FreeWeekService;
  let mockAxiosInstance: any;

  beforeEach(() => {
    mockAxiosInstance = {
      get: jest.fn(),
    };

    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    service = new FreeWeekService(mockConfig);

    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create an axios instance correctly", () => {
      service = new FreeWeekService(mockConfig);

      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: `https://${mockConfig.platformRouting}.api.riotgames.com`,
        headers: {
          "X-Riot-Token": mockConfig.riotApiKey,
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

    it("should throw an ZhonyaError when request fails", async () => {
      const riotError = new RiotApiError(403, "Forbidden");
      mockAxiosInstance.get.mockRejectedValue(riotError);

      await expect(service.getFreeWeekChampions()).rejects.toThrow(ZhonyaError);

      // Teste a mensagem de erro separadamente
      try {
        await service.getFreeWeekChampions();
      } catch (error) {
        expect(error.message).toContain(
          "Error while fetching Free Week champions"
        );
      }
    });
  });
});
