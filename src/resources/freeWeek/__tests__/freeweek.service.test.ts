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
    // Mock para o cliente HTTP retornado pelo axios.create
    mockAxiosInstance = {
      get: jest.fn(),
    };

    // Configuração do mock para axios.create
    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    // Criar instância do serviço
    service = new FreeWeekService(riotApiKey, platformRouting);

    // Limpar todos os mocks após cada teste
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

      await expect(service.getFreeWeekChampions()).rejects.toThrow(
        "Erro ao buscar os campeões da Free Week - (403) Forbidden"
      );
    });
  });
});
