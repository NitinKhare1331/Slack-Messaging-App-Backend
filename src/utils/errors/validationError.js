import { StatusCodes } from 'http-status-codes';

class ValidationError extends Error {
  constructor(errorDetails, message) {
    super(message);
    this.name = 'ValidationError';
    let explanation = [];
    Object.keys(errorDetails.error).forEach((key) => {
      explanation.push(errorDetails.error[key]);
    });
    this.explanation = explanation;
    this.message = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default ValidationError;



// This JavaScript code defines a custom error class named ValidationError that extends the built-in Error class. It's used to handle validation errors and provide more structured error details, specifically for cases where HTTP status codes are used in applications (like with REST APIs).
