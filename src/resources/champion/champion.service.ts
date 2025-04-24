import axios, { AxiosInstance } from "axios";
import { ZhonyaParams } from "../../config";
import { RiotApiError } from "../../errors/RiotApiError";
import { ZhonyaError } from "../../errors/ZhonyaError";
import { getLastVersion } from "../../utils";
import { ChampionsDto } from "./types";

export class ChampionService {
  private readonly httpClient: AxiosInstance;
  private readonly config: ZhonyaParams;

  constructor(config: ZhonyaParams) {
    this.config = config;

    const client = axios.create({
      baseURL: `https://ddragon.leagueoflegends.com/cdn/`,
    });

    this.httpClient = client;
  }

  async getAllChampions(params?: { language?: string }): Promise<ChampionsDto> {
    const language = params?.language || this.config.language;

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

      throw new ZhonyaError("Error fetching champions data", riotError);
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
