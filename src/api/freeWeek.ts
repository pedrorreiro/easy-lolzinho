import { ZhonyaClient } from "../client";
import { ZhonyaError } from "../errors/ZhonyaError";
import { FreeWeekDto } from "../resources/freeWeek/types";

/**
 * Class for accessing free champion rotation functionalities
 */
export class FreeWeekAPI {
  private client: ZhonyaClient;

  constructor(client: ZhonyaClient) {
    this.client = client;
  }

  /**
   * Get the free champion rotation for the week
   * @returns Free champion rotation data
   * @throws {ZhonyaError} - If the client is not initialized or if the API key is missing
   * @remarks **This method requires a valid API key to work**
   */
  async get(): Promise<FreeWeekDto> {
    try {
      return await this.client.freeWeekService.getFreeWeekChampions();
    } catch (error) {
      throw new ZhonyaError("Error while fetching free week champions");
    }
  }
}
