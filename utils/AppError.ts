class AppError extends Error {
  constructor(message: string, public statusCode: string) {
    super(message);
  }
}

export default AppError;
