import axios, { AxiosInstance } from "axios";
import { ZhonyaParams } from "../../config";
import { RiotApiError } from "../../errors/RiotApiError";
import { ZhonyaError } from "../../errors/ZhonyaError";
import { getLastVersion } from "../../utils";

import { GetSummonerResponse, SummonerDTO } from "./types";

export class SummonerService {
  private readonly httpClient: AxiosInstance;
  private readonly config: ZhonyaParams;

  constructor(config: ZhonyaParams) {
    this.config = config;

    const client = axios.create({
      baseURL: `https://${config.platformRouting}.api.riotgames.com`,
      headers: {
        "X-Riot-Token": config.riotApiKey,
      },
    });

    this.httpClient = client;
  }

  async getSummonerProfileIconUrl(iconId: number): Promise<string> {
    const lastVersion = await getLastVersion();

    const requestUrl = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/img/profileicon/${iconId}.png`;

    return requestUrl;
  }

  async getByPuuid(puuid: string): Promise<SummonerDTO> {
    try {
      const response = await this.httpClient.get(
        `/lol/summoner/v4/summoners/by-puuid/${puuid}`
      );

      const responseData = response.data as GetSummonerResponse;

      const profileIconUrl = await this.getSummonerProfileIconUrl(
        responseData.profileIconId
      );

      const summonerData: SummonerDTO = {
        id: responseData.id,
        accountId: responseData.accountId,
        puuid: responseData.puuid,
        profileIconId: responseData.profileIconId,
        revisionDate: new Date(responseData.revisionDate),
        summonerLevel: responseData.summonerLevel,
        profileIconUrl: profileIconUrl,
      };

      return summonerData;
    } catch (error) {
      const riotError = error as RiotApiError;

      throw new ZhonyaError("Erro ao buscar invocador", riotError);
    }
  }
}
