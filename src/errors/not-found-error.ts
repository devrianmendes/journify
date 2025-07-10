export class NotFoundError extends Error {
  public success: boolean;

  constructor(message = "Not Found") {
    super(message);
    this.name = "NotFoundError";
    this.success = false;
  }
}
