export class ZhonyaError extends Error {
  public riotError?: Error;

  constructor(message: string, riotError?: Error) {
    super(message);

    const error = riotError as any;

    if (error && error.response && error.response.data) {
      this.riotError = error.response.data.status;
    } else {
      this.riotError = error;
    }

    this.name = "ZhonyaError";
  }
}
