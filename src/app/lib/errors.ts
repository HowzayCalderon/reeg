export class validationError extends Error {
    constructor(message: string){
        super(message);
        this.name = "ValidationError"
        this.stack = new Error().stack
    }
}
