import * as dotenv from "dotenv";
import { checkConfig, getConfig, LolzinhoApiParams, setConfig } from "./config";
import { LolzinhoError } from "./errors/LolzinhoError";
import { PuuidService } from "./internal/Puuid/PuuidService";
import { SummonerService } from "./resources/summoner/service";
import { SummonerDTO } from "./resources/summoner/types";
dotenv.config();

const DEFAULT_REGIONAL_ROUTING = "americas";
const DEFAULT_PLATFORM_ROUTING = "br1";

/**
 * Cliente principal da API do Lolzinho
 */
class LolzinhoClientClass {
  private riotApiKey: string;
  private regionalRouting: string;
  private platformRouting: string;
  private puuidService: PuuidService;
  private summonerService: SummonerService;

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
  }

  /**
   * Verifica se o cliente foi inicializado
   */
  private requireInit(): void {
    if (!checkConfig()) {
      throw new LolzinhoError("Lolzinho client must be initialized before use");
    }
  }

  /**
   * Busca um invocador pelo nome
   * @param summonerName - Nome do invocador
   * @returns Dados do invocador
   */
  async getSummonerByName(summonerName: string): Promise<SummonerDTO> {
    this.requireInit();
    const puuid = await this.puuidService.getByName(summonerName);
    return await this.summonerService.getByPuuid(puuid);
  }
}

export const LolzinhoClient = new LolzinhoClientClass();
