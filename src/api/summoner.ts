import { ZhonyaClient } from "../client";
import { ZhonyaError } from "../errors/ZhonyaError";
import { SummonerDTO } from "../resources/summoner/types";

/**
 * Class for accessing summoner-related functionalities
 */
export class SummonerAPI {
  private client: ZhonyaClient;

  constructor(client: ZhonyaClient) {
    this.client = client;
  }

  /**
   * Find a summoner by name
   * @param summonerName - Summoner name
   * @returns Summoner data
   * @throws {ZhonyaError} - If the client is not initialized or if the API key is missing
   * @remarks **This method requires a valid API key to work**
   */
  async getByName(summonerName: string): Promise<SummonerDTO> {
    this.client.checkInitialized();
    this.client.checkApiKey();

    try {
      const puuid = await this.client.puuidService.getByName(summonerName);
      return await this.client.summonerService.getByPuuid(puuid);
    } catch (error) {
      throw new ZhonyaError(`Error while fetching summoner by name`);
    }
  }
}
