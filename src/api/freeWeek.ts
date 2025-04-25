import { IZhonyaContext } from "../client";
import { ZhonyaError } from "../errors/ZhonyaError";
import { FreeWeekService } from "../resources/freeWeek/freeweek.service";
import { FreeWeekDto } from "../resources/freeWeek/types";

/**
 * Class for accessing free champion rotation functionalities
 */
export class FreeWeekAPI {
  private freeWeekService: FreeWeekService;
  private context: IZhonyaContext;

  constructor(context: IZhonyaContext) {
    this.context = context;
    this.freeWeekService = new FreeWeekService(context.config);
  }

  /**
   * Get the free champion rotation for the week
   * @returns Free champion rotation data
   * @throws {ZhonyaError} - If there's an error with the client or API request
   * @remarks **This method requires a valid API key to work**
   */
  async get(): Promise<FreeWeekDto> {
    this.context.checkInitialized();
    this.context.checkApiKey();
    try {
      return await this.freeWeekService.getFreeWeekChampions();
    } catch (error) {
      const zhonyaError = error as ZhonyaError;

      throw new ZhonyaError(
        "Error while fetching freeweek",
        zhonyaError.riotError
      );
    }
  }
}
