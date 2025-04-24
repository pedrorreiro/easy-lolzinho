import { ZhonyaClient } from "../../client";
import { ZhonyaError } from "../../errors/ZhonyaError";
import { FreeWeekAPI } from "../freeWeek";

// Mock the client and its services
jest.mock("../../client");
jest.mock("../../resources/freeWeek/freeweek.service");

describe("FreeWeekAPI", () => {
  let mockClient: jest.Mocked<ZhonyaClient>;
  let freeWeekAPI: FreeWeekAPI;

  const mockFreeWeekData = {
    freeChampionsIds: [1, 2, 3, 4, 5],
    freeChampionsIdsForNewPlayers: [10, 11, 12],
    maxNewPlayerLevel: 10,
  };

  beforeEach(() => {
    // Setup mock client
    mockClient = {
      freeWeekService: {
        getFreeWeekChampions: jest.fn().mockResolvedValue(mockFreeWeekData),
      },
    } as unknown as jest.Mocked<ZhonyaClient>;

    freeWeekAPI = new FreeWeekAPI(mockClient);
  });

  describe("get", () => {
    it("should return free week data when successful", async () => {
      const result = await freeWeekAPI.get();

      expect(
        mockClient.freeWeekService.getFreeWeekChampions
      ).toHaveBeenCalled();
      expect(result).toEqual(mockFreeWeekData);
    });

    it("should throw ZhonyaError when request fails", async () => {
      mockClient.freeWeekService.getFreeWeekChampions = jest
        .fn()
        .mockRejectedValue(new Error("API error"));

      await expect(freeWeekAPI.get()).rejects.toThrow(ZhonyaError);
      await expect(freeWeekAPI.get()).rejects.toThrow(
        "Error while fetching free week champions"
      );
    });
  });
});
