import * as dotenv from "dotenv";
import { ZhonyaClient } from "./client";

export { ZhonyaClient };

dotenv.config();

const client = ZhonyaClient.init();

(async () => {
  try {
    const champions = await client.champions.getAll();
    console.log(champions);
  } catch (error) {
    console.error(error);
  }
})();
