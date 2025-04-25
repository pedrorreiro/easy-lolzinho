import axios from "axios";
import { ZhonyaError } from "./errors/ZhonyaError";

export async function getLastVersion(): Promise<string> {
  try {
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/api/versions.json`
    );
    const versions = response.data;
    return versions[0];
  } catch (error) {
    throw new ZhonyaError("Error while fetching the latest version", error);
  }
}
