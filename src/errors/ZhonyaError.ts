import { RiotApiError } from "./RiotApiError";

export class ZhonyaError extends Error {
  public message: string;
  public riotError?: RiotApiError;

  constructor(message: string, riotError?: RiotApiError) {
    if (riotError) {
      message = `${message} - ${riotError.message}`;
    }

    super(message);
    this.message = message;
    this.riotError = riotError;
  }
}
