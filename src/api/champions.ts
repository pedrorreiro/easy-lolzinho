import { ZhonyaClient } from "../client";
import { ZhonyaError } from "../errors/ZhonyaError";
import { ChampionsDto } from "../resources/champion/types";

/**
 * Class for accessing champion-related functionalities
 */
export class ChampionsAPI {
  private client: ZhonyaClient;

  constructor(client: ZhonyaClient) {
    this.client = client;
  }

  /**
   * Get all champions
   * @returns Data for all champions
   * @throws {ZhonyaError} - If the client is not initialized
   * @remarks **This method does not require an API key to work**
   */
  async getAll(): Promise<ChampionsDto> {
    try {
      return await this.client.championService.getAllChampions();
    } catch (error) {
      throw new ZhonyaError(`Error while fetching all champions`);
    }
  }
}
