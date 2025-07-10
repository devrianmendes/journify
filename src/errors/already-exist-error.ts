export class AlreadyExist extends Error {
  public success: boolean;

  constructor(message = "Data conflict") {
    super(message);
    this.name = "ConflictError";
    this.success = false;
  }
}
