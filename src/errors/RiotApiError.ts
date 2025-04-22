export class RiotApiError extends Error {
  public statusCode: number;
  public message: string;
  public error?: Error;

  constructor(statusCode: number, message: string, error?: Error) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
