import { IZhonyaContext } from "../client";
import { ZhonyaError } from "../errors/ZhonyaError";
import { ChampionService } from "../resources/champion/champion.service";
import { ChampionsDto } from "../resources/champion/types";

/**
 * Class for accessing champion-related functionalities
 */
export class ChampionAPI {
  private championService: ChampionService;
  private context: IZhonyaContext;

  constructor(context: IZhonyaContext) {
    this.context = context;
    this.championService = new ChampionService(context.config);
  }

  /**
   * Get all champions
   * @returns Data for all champions
   * @throws {ZhonyaError} - If the client is not initialized
   * @remarks **This method does not require an API key to work**
   */
  async getAll(): Promise<ChampionsDto> {
    this.context.checkInitialized();

    try {
      return await this.championService.getAllChampions({
        language: this.context.config.language || "",
      });
    } catch (error) {
      throw new ZhonyaError(`Error while fetching all champions`);
    }
  }
}
