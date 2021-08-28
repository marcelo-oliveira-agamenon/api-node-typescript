class AppError {
  public readonly status: number;
  public readonly error: string;

  constructor(error: string, status = 400) {
    this.status = status;
    this.error = error;
  }
}

export default AppError;
