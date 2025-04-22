import axios, { AxiosInstance } from "axios";
import { getLastVersion } from "../../utils";
import { ChampionsDto } from "./types";

export class ChampionService {
  private readonly httpClient: AxiosInstance;
  private readonly language: string = "pt_BR";

  constructor(riotApiKey: string, language: string) {
    this.language = language;

    const client = axios.create({
      baseURL: `https://ddragon.leagueoflegends.com/cdn/`,
      headers: {
        "X-Riot-Token": riotApiKey,
      },
    });

    this.httpClient = client;
  }

  async getAllChampions(): Promise<ChampionsDto> {
    try {
      const lastVersion = await getLastVersion();

      const response = await this.httpClient.get(
        `${lastVersion}/data/${this.language}/champion.json`
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
