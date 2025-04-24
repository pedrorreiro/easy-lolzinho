import axios, { AxiosInstance } from "axios";
import { ZhonyaParams } from "../../config";
import { RiotApiError } from "../../errors/RiotApiError";
import { ZhonyaError } from "../../errors/ZhonyaError";

export class PuuidService {
  private readonly httpClient: AxiosInstance;
  private readonly config: ZhonyaParams;

  constructor(config: ZhonyaParams) {
    this.config = config;

    const client = axios.create({
      baseURL: `https://${config.regionalRouting}.api.riotgames.com/riot`,
      headers: {
        "X-Riot-Token": config.riotApiKey,
      },
    });

    this.httpClient = client;
  }

  async getByName(
    summonerName: string,
    tagLine: string = "BR1"
  ): Promise<string> {
    try {
      const encodedSummonerName = encodeURIComponent(summonerName);
      const encodedTagLine = encodeURIComponent(tagLine);

      const response = await this.httpClient.get(
        `account/v1/accounts/by-riot-id/${encodedSummonerName}/${encodedTagLine}`
      );
      return response.data.puuid;
    } catch (error: any) {
      const riotError = error as RiotApiError;

      throw new ZhonyaError("Error while fetching PUUID", riotError);
    }
  }
}
