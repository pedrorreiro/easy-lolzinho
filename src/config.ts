import { LolzinhoClient } from ".";

export type LolzinhoApiParams = {
  riotApiKey: string;
  regionalRouting?: string;
  platformRouting?: string;
  language?: string;
};

export let lolzinhoConfig: LolzinhoApiParams | null;

export const DEFAULT_REGIONAL_ROUTING = "americas";
export const DEFAULT_PLATFORM_ROUTING = "br1";
export const DEFAULT_LANGUAGE = "en_US";

export function setConfig(config: LolzinhoApiParams): void {
  lolzinhoConfig = {
    regionalRouting: DEFAULT_REGIONAL_ROUTING,
    platformRouting: DEFAULT_PLATFORM_ROUTING,
    language: DEFAULT_LANGUAGE,
    ...config,
  };
}

/**
 * Returns the current configuration
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
