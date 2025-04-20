import axios, { AxiosInstance } from "axios";
import { LolzinhoError } from "../../errors/LolzinhoError";
import { RiotApiError } from "../../errors/RiotApiError";

import { GetSummonerResponse, SummonerDTO } from "./types";

export class SummonerService {
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

  async getLastVersion(): Promise<string> {
    try {
      const response = await this.httpClient.get(
        `https://ddragon.leagueoflegends.com/api/versions.json`
      );
      const versions = response.data;
      return versions[0];
    } catch (error) {
      const riotError = error as RiotApiError;

      throw new LolzinhoError(
        "Erro ao buscar a versão mais recente",
        riotError
      );
    }
  }

  async getSummonerProfileIconUrl(iconId: number): Promise<string> {
    const lastVersion = await this.getLastVersion();

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

      throw new LolzinhoError("Erro ao buscar invocador", riotError);
    }
  }
}
