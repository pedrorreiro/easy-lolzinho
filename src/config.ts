import { ZhonyaClient } from ".";

export type ZhonyaParams = {
  riotApiKey: string;
  regionalRouting?: string;
  platformRouting?: string;
  language?: string;
};

export let zhonyaConfig: ZhonyaParams | null;

export const DEFAULT_REGIONAL_ROUTING = "americas";
export const DEFAULT_PLATFORM_ROUTING = "br1";
export const DEFAULT_LANGUAGE = "en_US";

export function setConfig(config: ZhonyaParams): void {
  zhonyaConfig = {
    regionalRouting: DEFAULT_REGIONAL_ROUTING,
    platformRouting: DEFAULT_PLATFORM_ROUTING,
    language: DEFAULT_LANGUAGE,
    ...config,
  };
}

/**
 * Returns the current configuration
 */
export function getConfig(): ZhonyaParams {
  return { ...zhonyaConfig };
}

export function checkConfig(): boolean {
  const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  const isConfigValid = ZhonyaClient && !isObjectEmpty(ZhonyaClient);

  return isConfigValid;
}
