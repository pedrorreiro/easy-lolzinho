import * as dotenv from "dotenv";
import {
  checkConfig,
  DEFAULT_PLATFORM_ROUTING,
  DEFAULT_REGIONAL_ROUTING,
  getConfig,
  LolzinhoApiParams,
  setConfig,
} from "./config";
import { RequireInit } from "./decorators/RequireInit";
import { LolzinhoError } from "./errors/LolzinhoError";
import { PuuidService } from "./internal/Puuid/puuid.service";
import { ChampionService } from "./resources/champion/champion.service";
import { ChampionsDto } from "./resources/champion/types";
import { FreeWeekService } from "./resources/freeWeek/freeweek.service";
import { FreeWeekDto } from "./resources/freeWeek/types";
import { SummonerService } from "./resources/summoner/summoner.service";
import { SummonerDTO } from "./resources/summoner/types";
dotenv.config();

/**
 * Main client for the Lolzinho API
 */
export class LolzinhoClientClass {
  private riotApiKey: string;
  private regionalRouting: string;
  private platformRouting: string;
  private puuidService: PuuidService;
  private summonerService: SummonerService;
  private freeWeekService: FreeWeekService;
  private championService: ChampionService;

  /**
   * Initializes the Lolzinho API client
   *
   * @param riotApiKey - Riot Games API key
   * @param regionalRouting - Regional routing (default: americas)
   * @param platformRouting - Platform routing (default: br1)
   * @throws {LolzinhoError} - If the API key is not provided or if the client is already initialized
   
  
    * @example
    * ```typescript
    * import { LolzinhoClient } from "lolzinho-api";
    *
    * LolzinhoClient.init({
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
  }: LolzinhoApiParams): void {
    if (!riotApiKey) {
      throw new LolzinhoError("Riot API key is required");
    }

    const alreadyInitialized = checkConfig();

    if (alreadyInitialized) {
      throw new LolzinhoError("Lolzinho API is already initialized");
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
  }

  /**
   * Finds a summoner by name
   * @param summonerName - Summoner name
   * @returns Summoner data
   * @throws {LolzinhoError} - If the client is not initialized
   */
  @RequireInit()
  async getSummonerByName(summonerName: string): Promise<SummonerDTO> {
    const puuid = await this.puuidService.getByName(summonerName);
    return await this.summonerService.getByPuuid(puuid);
  }

  /**
   * Fetches the free champion rotation of the week
   * @returns Free champion rotation data
   * @throws {LolzinhoError} - If the client is not initialized
   */
  @RequireInit()
  async getFreeWeek(): Promise<FreeWeekDto> {
    return await this.freeWeekService.getFreeWeekChampions();
  }

  /**
   * Fetches all champions
   * @returns Data for all champions
   * @throws {LolzinhoError} - If the client is not initialized
   */
  @RequireInit()
  async getAllChampions(): Promise<ChampionsDto> {
    return await this.championService.getAllChampions();
  }
}

export const LolzinhoClient = new LolzinhoClientClass();
