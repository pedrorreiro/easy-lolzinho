import {
  DEFAULT_LANGUAGE,
  DEFAULT_PLATFORM_ROUTING,
  DEFAULT_REGIONAL_ROUTING,
  ZhonyaParams,
} from "./config";
import { ZhonyaError } from "./errors/ZhonyaError";
import { PuuidService } from "./internal/Puuid/puuid.service";
import { ChampionService } from "./resources/champion/champion.service";
import { ChampionsDto } from "./resources/champion/types";
import { FreeWeekService } from "./resources/freeWeek/freeweek.service";
import { FreeWeekDto } from "./resources/freeWeek/types";
import { SummonerService } from "./resources/summoner/summoner.service";
import { SummonerDTO } from "./resources/summoner/types";

/**
 * Main client for the Zhonya
 */
export class ZhonyaClient {
  private puuidService: PuuidService;
  private summonerService: SummonerService;
  private freeWeekService: FreeWeekService;
  private championService: ChampionService;

  /**
   * Configuration for the Zhonya client
   */
  public config: ZhonyaParams;

  /**
   * Flag to indicate if the client is properly initialized
   * @private
   */
  private initialized: boolean = false;

  /**
   * Initializes the Zhonya client and returns it ready to use
   *
   * @param riotApiKey - Riot Games API key (optional for some methods like getAllChampions, **required** for methods like getSummonerByName and getFreeWeek)
   * @param regionalRouting - Regional routing (default: americas)
   * @param platformRouting - Platform routing (default: br1)
   * @param language - Language for data returned (default: en_US)
   * @returns Zhonya client instance ready to use
   *
   * @example
   * ```typescript
   * import { ZhonyaClient } from "zhonya";
   *
   * // Client with API key (full access to all methods)
   * const clientWithKey = ZhonyaClient.init({
   *   riotApiKey: process.env.RIOT_API_KEY,
   *   regionalRouting: "americas",
   *   platformRouting: "br1",
   * });
   *
   * // Client without API key (limited access)
   * const clientWithoutKey = ZhonyaClient.init();
   * // This will work
   * const champions = await clientWithoutKey.getAllChampions();
   * // This will throw an error
   * const summoner = await clientWithoutKey.getSummonerByName("playerName");
   * ```
   *
   */
  static init({
    riotApiKey,
    regionalRouting = DEFAULT_REGIONAL_ROUTING,
    platformRouting = DEFAULT_PLATFORM_ROUTING,
    language = DEFAULT_LANGUAGE,
  }: ZhonyaParams = {}): ZhonyaClient {
    const config: ZhonyaParams = {
      riotApiKey,
      regionalRouting,
      platformRouting,
      language,
    };

    const client = new ZhonyaClient(config);

    client.initialized = true;

    return client;
  }

  /**
   * Private constructor to prevent direct instantiation
   * Use Zhonya.init() instead
   */
  private constructor(config: ZhonyaParams) {
    this.config = { ...config };

    this.puuidService = new PuuidService(this.config);
    this.summonerService = new SummonerService(this.config);
    this.freeWeekService = new FreeWeekService(this.config);
    this.championService = new ChampionService(this.config);
  }

  /**
   * Checks if the client is initialized
   * @private
   * @throws {ZhonyaError} - If the client is not initialized
   */
  private checkInitialized(): void {
    if (!this.initialized) {
      throw new ZhonyaError(
        "Zhonya client must be initialized before use. Use Zhonya.init() to create a client."
      );
    }
  }

  /**
   * Checks if the API key was provided, required for some methods
   * @private
   * @throws {ZhonyaError} - If the API key is missing
   */
  private checkApiKey(): void {
    if (!this.config.riotApiKey) {
      throw new ZhonyaError(
        "Riot API key is required for this method. Initialize the client with a valid API key."
      );
    }
  }

  /**
   * Finds a summoner by name
   * @param summonerName - Summoner name
   * @returns Summoner data
   * @throws {ZhonyaError} - If the client is not initialized or API key is missing
   * @remarks **This method requires a valid API key to work**
   */
  async getSummonerByName(summonerName: string): Promise<SummonerDTO> {
    this.checkInitialized();
    this.checkApiKey();

    try {
      const puuid = await this.puuidService.getByName(summonerName);
      return await this.summonerService.getByPuuid(puuid);
    } catch (error) {
      throw new ZhonyaError(`Error while fetching summoner by name`);
    }
  }

  /**
   * Fetches the free champion rotation of the week
   * @returns Free champion rotation data
   * @throws {ZhonyaError} - If the client is not initialized or API key is missing
   * @remarks **This method requires a valid API key to work**
   */
  async getFreeWeek(): Promise<FreeWeekDto> {
    this.checkInitialized();
    this.checkApiKey();
    try {
      return await this.freeWeekService.getFreeWeekChampions();
    } catch (error) {
      throw new ZhonyaError("Error while fetching Free Week champions");
    }
  }

  /**
   * Fetches all champions
   * @returns Data for all champions
   * @throws {ZhonyaError} - If the client is not initialized
   * @remarks **This method does not require an API key to work**
   */
  async getAllChampions(): Promise<ChampionsDto> {
    this.checkInitialized();

    try {
      return await this.championService.getAllChampions({
        language: this.config.language,
      });
    } catch (error) {
      throw new ZhonyaError(`Error while fetching all champions`);
    }
  }
}
