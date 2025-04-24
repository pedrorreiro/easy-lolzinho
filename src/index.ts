import * as dotenv from "dotenv";
import { ZhonyaClient } from "./client";

export { ZhonyaClient };

dotenv.config();

const client = ZhonyaClient.init();

(async () => {
  try {
    const champions = await client.getAllChampions();
    console.log(champions);
  } catch (error) {
    console.error(error);
  }
})();
