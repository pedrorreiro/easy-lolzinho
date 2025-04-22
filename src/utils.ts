import { LolzinhoError } from "./errors/LolzinhoError";
import { RiotApiError } from "./errors/RiotApiError";

export async function getLastVersion(): Promise<string> {
  try {
    const response = await this.httpClient.get(
      `https://ddragon.leagueoflegends.com/api/versions.json`
    );
    const versions = response.data;
    return versions[0];
  } catch (error) {
    const riotError = error as RiotApiError;

    throw new LolzinhoError(
      "Error while fetching the latest version",
      riotError
    );
  }
}
