import axios, { AxiosInstance } from "axios";
import { getConfig } from "../../config";
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

  async getAllChampions({
    language,
  }: {
    language?: string;
  }): Promise<ChampionsDto> {
    if (!language) {
      const config = getConfig();
      language = config.language;
    }

    try {
      const lastVersion = await getLastVersion();

      const response = await this.httpClient.get(
        `${lastVersion}/data/${language}/champion.json`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error fetching champions data");
    }
  }

  async getChampionById(championId: number): Promise<any> {
    try {
      const response = await this.httpClient.get(
        `/lol/champion/v4/champions/${championId}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error fetching champion data");
    }
  }
}
