import { IZhonyaContext } from "../client";
import { ZhonyaError } from "../errors/ZhonyaError";
import { PuuidService } from "../internal/Puuid/puuid.service";
import { SummonerService } from "../resources/summoner/summoner.service";
import { SummonerDTO } from "../resources/summoner/types";

/**
 * Class for accessing summoner-related functionalities
 */
export class SummonerAPI {
  private puuidService: PuuidService;
  private summonerService: SummonerService;
  private context: IZhonyaContext;

  constructor(context: IZhonyaContext) {
    this.context = context;
    this.puuidService = new PuuidService(context.config);
    this.summonerService = new SummonerService(context.config);
  }

  /**
   * Find a summoner by name
   * @param summonerName - Summoner name
   * @returns Summoner data
   * @throws {ZhonyaError} - If the client is not initialized or if the API key is missing
   * @remarks **This method requires a valid API key to work**
   */
  async getByName(summonerName: string): Promise<SummonerDTO> {
    this.context.checkInitialized();
    this.context.checkApiKey();

    try {
      const puuid = await this.puuidService.getByName(summonerName);
      return await this.summonerService.getByPuuid(puuid);
    } catch (error) {
      throw new ZhonyaError(`Error while fetching summoner by name`);
    }
  }
}
