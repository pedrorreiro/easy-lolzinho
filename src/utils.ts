import axios from "axios";
import { RiotApiError } from "./errors/RiotApiError";
import { ZhonyaError } from "./errors/ZhonyaError";

export async function getLastVersion(): Promise<string> {
  try {
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/api/versions.json`
    );
    const versions = response.data;
    return versions[0];
  } catch (error) {
    const riotError = error as RiotApiError;

    throw new ZhonyaError("Error while fetching the latest version", riotError);
  }
}
