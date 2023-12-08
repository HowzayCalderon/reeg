export class validationError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);
        this.name = "ValidationError"
        this.stack = new Error().stack
        this.statusCode = statusCode
    }
}
