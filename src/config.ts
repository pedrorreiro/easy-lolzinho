import { LolzinhoClient } from ".";

export type LolzinhoApiParams = {
  riotApiKey: string;
  regionalRouting?: string;
  platformRouting?: string;
};

export let lolzinhoConfig: LolzinhoApiParams | null;

export function setConfig(config: LolzinhoApiParams): void {
  lolzinhoConfig = {
    regionalRouting: "americas",
    platformRouting: "br1",
    ...config,
  };
}

/**
 * Retorna a configuração atual
 */
export function getConfig(): LolzinhoApiParams {
  return { ...lolzinhoConfig };
}

export function checkConfig(): boolean {
  const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  const isConfigValid = LolzinhoClient && !isObjectEmpty(LolzinhoClient);

  return isConfigValid;
}
