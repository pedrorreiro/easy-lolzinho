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
import { FreeWeekService } from "./resources/freeWeek/freeweek.service";
import { FreeWeekDto } from "./resources/freeWeek/types";
import { SummonerService } from "./resources/summoner/summoner.service";
import { SummonerDTO } from "./resources/summoner/types";
dotenv.config();

/**
 * Cliente principal da API do Lolzinho
 */
export class LolzinhoClientClass {
  private riotApiKey: string;
  private regionalRouting: string;
  private platformRouting: string;
  private puuidService: PuuidService;
  private summonerService: SummonerService;
  private freeWeekService: FreeWeekService;

  /**
   * Inicializa o client da API do Lolzinho
   *
   * @param riotApiKey - Chave da API da Riot Games
   * @param regionalRouting - Roteamento regional (default: americas)
   * @param platformRouting - Roteamento da plataforma (default: br1)
   * @throws {LolzinhoError} - Se a chave da API não for fornecida ou se o client já estiver inicializado
   
  
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
   * Busca um invocador pelo nome
   * @param summonerName - Nome do invocador
   * @returns Dados do invocador
   * @throws {LolzinhoError} - Se o cliente não estiver inicializado
   */
  @RequireInit()
  async getSummonerByName(summonerName: string): Promise<SummonerDTO> {
    const puuid = await this.puuidService.getByName(summonerName);
    return await this.summonerService.getByPuuid(puuid);
  }

  /**
   * Busca a rotina de campeões grátis da semana
   * @returns Dados dos campeões grátis da semana
   * @throws {LolzinhoError} - Se o cliente não estiver inicializado
   */
  @RequireInit()
  async getFreeWeek(): Promise<FreeWeekDto> {
    return await this.freeWeekService.getFreeWeekChampions();
  }
}

export const LolzinhoClient = new LolzinhoClientClass();
