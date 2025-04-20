import { LolzinhoError } from "../../errors/LolzinhoError";
import { PuuidService } from "./puuid.service";

describe("PuuidService", () => {
  it("should return puuid for a given summoner name and tag line", async () => {
    const puuidService = new PuuidService("test-key", "americas");

    const mockResponse = "123";

    const axiosGetMock = jest.spyOn(puuidService["httpClient"], "get");

    axiosGetMock.mockResolvedValueOnce({
      data: {
        puuid: mockResponse,
      },
    });

    const puuid = await puuidService.getByName("summonerName", "tagLine");

    expect(puuid).toBe(mockResponse);

    expect(axiosGetMock).toHaveBeenCalledWith(
      `account/v1/accounts/by-riot-id/summonerName/tagLine`
    );

    expect(axiosGetMock).toHaveBeenCalledTimes(1);

    axiosGetMock.mockRestore();
  });

  it("should throw an error if the request fails", async () => {
    const puuidService = new PuuidService("test-key", "americas");

    const axiosGetMock = jest.spyOn(puuidService["httpClient"], "get");

    axiosGetMock.mockRejectedValueOnce({
      response: expect.any(Object),
    });

    await expect(
      puuidService.getByName("summonerName", "tagLine")
    ).rejects.toThrow(LolzinhoError);
  });
});
