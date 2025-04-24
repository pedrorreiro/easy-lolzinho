import { ZhonyaClient } from "../../client";
import { ZhonyaError } from "../../errors/ZhonyaError";
import { ChampionsAPI } from "../champions";

// Mock the client and its services
jest.mock("../../client");
jest.mock("../../resources/champion/champion.service");

describe("ChampionsAPI", () => {
  let mockClient: jest.Mocked<ZhonyaClient>;
  let championsAPI: ChampionsAPI;

  const mockChampionsData = {
    type: "champion",
    format: "standAloneComplex",
    version: "13.1.1",
    data: {
      Aatrox: {
        id: "Aatrox",
        key: "266",
        name: "Aatrox",
        title: "the Darkin Blade",
      },
      Ahri: {
        id: "Ahri",
        key: "103",
        name: "Ahri",
        title: "the Nine-Tailed Fox",
      },
    },
  };

  beforeEach(() => {
    // Setup mock client
    mockClient = {
      championService: {
        getAllChampions: jest.fn().mockResolvedValue(mockChampionsData),
      },
    } as unknown as jest.Mocked<ZhonyaClient>;

    championsAPI = new ChampionsAPI(mockClient);
  });

  describe("getAll", () => {
    it("should return all champions data when successful", async () => {
      const result = await championsAPI.getAll();

      expect(mockClient.championService.getAllChampions).toHaveBeenCalled();
      expect(result).toEqual(mockChampionsData);
    });

    it("should throw ZhonyaError when request fails", async () => {
      mockClient.championService.getAllChampions = jest
        .fn()
        .mockRejectedValue(new Error("API error"));

      await expect(championsAPI.getAll()).rejects.toThrow(ZhonyaError);
      await expect(championsAPI.getAll()).rejects.toThrow(
        "Error while fetching all champions"
      );
    });
  });
});
