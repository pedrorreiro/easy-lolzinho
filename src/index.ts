import * as dotenv from "dotenv";
import {
  checkConfig,
  DEFAULT_PLATFORM_ROUTING,
  DEFAULT_REGIONAL_ROUTING,
  getConfig,
  setConfig,
  ZhonyaParams,
} from "./config";
import { RequireInit } from "./decorators/RequireInit";
import { ZhonyaError } from "./errors/ZhonyaError";
import { PuuidService } from "./internal/Puuid/puuid.service";
import { ChampionService } from "./resources/champion/champion.service";
import { ChampionsDto } from "./resources/champion/types";
import { FreeWeekService } from "./resources/freeWeek/freeweek.service";
import { FreeWeekDto } from "./resources/freeWeek/types";
import { SummonerService } from "./resources/summoner/summoner.service";
import { SummonerDTO } from "./resources/summoner/types";
import { GetAllChampionsParams } from "./types";
dotenv.config();

/**
 * Main client for the Zhonya
 */
export class ZhonyaClientClass {
  private riotApiKey: string;
  private regionalRouting: string;
  private platformRouting: string;
  private puuidService: PuuidService;
  private summonerService: SummonerService;
  private freeWeekService: FreeWeekService;
  private championService: ChampionService;

  /**
   * Initializes the Zhonya client
   *
   * @param riotApiKey - Riot Games API key
   * @param regionalRouting - Regional routing (default: americas)
   * @param platformRouting - Platform routing (default: br1)
   * @throws {ZhonyaError} - If the API key is not provided or if the client is already initialized
   
  
    * @example
    * ```typescript
    * import { ZhonyaClient } from "zhonya";
    *
    * ZhonyaClient.init({
    *   riotApiKey: process.env.RIOT_API_KEY,
    *   regionalRouting: "americas",
    *   platformRouting: "br1",
    * });
    * ```
   *

  */
  init({
    riotApiKey,
    regionalRouting = DEFAULT_REGIONAL_ROUTING,
    platformRouting = DEFAULT_PLATFORM_ROUTING,
  }: ZhonyaParams): void {
    if (!riotApiKey) {
      throw new ZhonyaError("Riot API key is required");
    }

    const alreadyInitialized = checkConfig();

    if (alreadyInitialized) {
      throw new ZhonyaError("Zhonya client is already initialized");
    }

    setConfig({
      riotApiKey,
      regionalRouting,
      platformRouting,
    });

    const config = getConfig();

    this.riotApiKey = config.riotApiKey;
    this.regionalRouting = config.regionalRouting;
    this.platformRouting = config.platformRouting;

    this.puuidService = new PuuidService(this.riotApiKey, this.regionalRouting);
    this.summonerService = new SummonerService(
      this.riotApiKey,
      this.platformRouting
    );
    this.freeWeekService = new FreeWeekService(
      this.riotApiKey,
      this.platformRouting
    );

    this.championService = new ChampionService(this.riotApiKey);
  }

  /**
   * Finds a summoner by name
   * @param summonerName - Summoner name
   * @returns Summoner data
   * @throws {ZhonyaError} - If the client is not initialized
   */
  @RequireInit()
  async getSummonerByName(summonerName: string): Promise<SummonerDTO> {
    const puuid = await this.puuidService.getByName(summonerName);
    return await this.summonerService.getByPuuid(puuid);
  }

  /**
   * Fetches the free champion rotation of the week
   * @returns Free champion rotation data
   * @throws {ZhonyaError} - If the client is not initialized
   */
  @RequireInit()
  async getFreeWeek(): Promise<FreeWeekDto> {
    return await this.freeWeekService.getFreeWeekChampions();
  }

  /**
   * Fetches all champions
   * @returns Data for all champions
   * @param params - Optional parameters
   * @param params.language - Language code (e.g., "en_US")
   * @throws {ZhonyaError} - If the client is not initialized
   */
  @RequireInit()
  async getAllChampions(params?: GetAllChampionsParams): Promise<ChampionsDto> {
    return await this.championService.getAllChampions({
      language: params?.language,
    });
  }
}

export const ZhonyaClient = new ZhonyaClientClass();
