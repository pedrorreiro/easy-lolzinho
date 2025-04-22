import axios, { AxiosInstance } from "axios";
import { LolzinhoError } from "../../errors/LolzinhoError";
import { RiotApiError } from "../../errors/RiotApiError";
import { FreeWeekDto, GetFreeWeekResponse } from "./types";

export class FreeWeekService {
  private readonly httpClient: AxiosInstance;

  constructor(riotApiKey: string, platformRouting: string) {
    const client = axios.create({
      baseURL: `https://${platformRouting}.api.riotgames.com`,
      headers: {
        "X-Riot-Token": riotApiKey,
      },
    });

    this.httpClient = client;
  }

  async getFreeWeekChampions(): Promise<FreeWeekDto> {
    try {
      const response = await this.httpClient.get(
        `/lol/platform/v3/champion-rotations`
      );

      const responseData = response.data as GetFreeWeekResponse;

      return responseData;
    } catch (error) {
      const riotError = error as RiotApiError;

      throw new LolzinhoError(
        "Error while fetching Free Week champions",
        riotError
      );
    }
  }
}
