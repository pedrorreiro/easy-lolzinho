import axios, { AxiosInstance } from "axios";
import { getConfig } from "../../config";
import { LolzinhoError } from "../../errors/LolzinhoError";
import { RiotApiError } from "../../errors/RiotApiError";
import { getLastVersion } from "../../utils";
import { ChampionsDto } from "./types";

export class ChampionService {
  private readonly httpClient: AxiosInstance;

  constructor(riotApiKey: string) {
    const client = axios.create({
      baseURL: `https://ddragon.leagueoflegends.com/cdn/`,
      headers: {
        "X-Riot-Token": riotApiKey,
      },
    });

    this.httpClient = client;
  }

  async getAllChampions(params?: { language?: string }): Promise<ChampionsDto> {
    const config = getConfig();
    const language = params?.language || config.language;

    try {
      const lastVersion = await getLastVersion();

      const response = await this.httpClient.get(
        `${lastVersion}/data/${language}/champion.json`
      );

      const championData = response.data;
      const championMap = new Map();

      Object.keys(championData.data).forEach((key) => {
        championMap.set(key, championData.data[key]);
      });

      championData.data = championMap;

      return championData;
    } catch (error) {
      const riotError = error as RiotApiError;

      throw new LolzinhoError("Error fetching champions data", riotError);
    }
  }

  // async getChampionById(championId: number): Promise<any> {
  //   try {
  //     const response = await this.httpClient.get(
  //       `/lol/champion/v4/champions/${championId}`
  //     );

  //     return response.data;
  //   } catch (error) {
  //     throw new Error("Error fetching champion data");
  //   }
  // }
}
