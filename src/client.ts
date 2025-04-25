import { ChampionAPI, FreeWeekAPI, SummonerAPI } from "./api";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_PLATFORM_ROUTING,
  DEFAULT_REGIONAL_ROUTING,
  ZhonyaParams,
} from "./config";
import { ZhonyaError } from "./errors/ZhonyaError";

/**
 * Contexto interno compartilhado entre o cliente e as APIs
 * @internal
 */
export interface IZhonyaContext {
  config: ZhonyaParams;
  checkInitialized(): void;
  checkApiKey(): void;
}

/**
 * Implementação do contexto interno
 * @private
 */
class ZhonyaContext implements IZhonyaContext {
  private _config: ZhonyaParams;
  private _initialized: boolean = false;

  constructor(config: ZhonyaParams) {
    this._config = { ...config };
  }

  get config(): ZhonyaParams {
    return this._config;
  }

  set initialized(value: boolean) {
    this._initialized = value;
  }

  checkInitialized(): void {
    if (!this._initialized) {
      throw new ZhonyaError(
        "Zhonya client must be initialized before use. Use Zhonya.init() to create a client."
      );
    }
  }

  checkApiKey(): void {
    if (!this._config.riotApiKey) {
      throw new ZhonyaError(
        "Riot API key is required for this method. Initialize the client with a valid API key."
      );
    }
  }
}

/**
 * Main client for the Zhonya
 */
export class ZhonyaClient {
  /**
   * API for accessing champion-related functionalities
   */
  public champion: ChampionAPI;

  /**
   * API for accessing summoner-related functionalities
   */
  public summoner: SummonerAPI;

  /**
   * API for accessing free rotation functionalities
   */
  public freeWeek: FreeWeekAPI;

  /**
   * Contexto interno compartilhado
   * @private
   */
  private context: ZhonyaContext;

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
   * const champions = await clientWithoutKey.champion.getAll();
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
    (client.context as ZhonyaContext).initialized = true;

    return client;
  }

  /**
   * Private constructor to prevent direct instantiation
   * Use Zhonya.init() instead
   */
  private constructor(config: ZhonyaParams) {
    this.context = new ZhonyaContext(config);

    // Initialize APIs passando o contexto compartilhado
    this.champion = new ChampionAPI(this.context);
    this.summoner = new SummonerAPI(this.context);
    this.freeWeek = new FreeWeekAPI(this.context);
  }
}
