import { ChampionsAPI, FreeWeekAPI, SummonerAPI } from "./api";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_PLATFORM_ROUTING,
  DEFAULT_REGIONAL_ROUTING,
  ZhonyaParams,
} from "./config";
import { ZhonyaError } from "./errors/ZhonyaError";
import { PuuidService } from "./internal/Puuid/puuid.service";
import { ChampionService } from "./resources/champion/champion.service";
import { FreeWeekService } from "./resources/freeWeek/freeweek.service";
import { SummonerService } from "./resources/summoner/summoner.service";

/**
 * Main client for the Zhonya
 */
export class ZhonyaClient {
  /**
   * API for accessing summoner-related functionalities
   */
  public summoner: SummonerAPI;

  /**
   * API for accessing champion-related functionalities
   */
  public champions: ChampionsAPI;

  /**
   * API for accessing free rotation functionalities
   */
  public freeWeek: FreeWeekAPI;

  /**
   * Internal service for fetching PUUIDs
   * @internal
   */
  public puuidService: PuuidService;

  /**
   * Internal service for fetching summoner data
   * @internal
   */
  public summonerService: SummonerService;

  /**
   * Internal service for fetching free week rotation data
   * @internal
   */
  public freeWeekService: FreeWeekService;

  /**
   * Internal service for fetching champion data
   * @internal
   */
  public championService: ChampionService;

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
   * @param riotApiKey - Riot Games API key (optional for some methods)
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
   * const champions = await clientWithoutKey.champions.getAll();
   * // This will throw an error
   * const summoner = await clientWithoutKey.summoner.getByName("playerName");
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

    // Initialize APIs
    this.summoner = new SummonerAPI(this);
    this.champions = new ChampionsAPI(this);
    this.freeWeek = new FreeWeekAPI(this);
  }

  /**
   * Checks if the client is initialized
   * @throws {ZhonyaError} - If the client is not initialized
   */
  public checkInitialized(): void {
    if (!this.initialized) {
      throw new ZhonyaError(
        "Zhonya client must be initialized before use. Use Zhonya.init() to create a client."
      );
    }
  }

  /**
   * Checks if the API key was provided, required for some methods
   * @throws {ZhonyaError} - If the API key is missing
   */
  public checkApiKey(): void {
    if (!this.config.riotApiKey) {
      throw new ZhonyaError(
        "Riot API key is required for this method. Initialize the client with a valid API key."
      );
    }
  }
}
