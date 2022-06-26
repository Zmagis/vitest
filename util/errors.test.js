import { describe, expect, it } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe('class HttpError', () => {
        it('should contain the provided status code, message and data', () => {
            const  statusCode = 400;
            const message = 'test';
            const data = {data: 'test'};

            const testError = new HttpError(statusCode,message,data)

            expect(testError.statusCode).toBe(statusCode)
            expect(testError.message).toBe(message)
            expect(testError.data).toBe(data)
        })

        it('should return data indefined if no data is passed', () => {
            const  statusCode = 400;
            const message = 'test';

            const testError = new HttpError(statusCode, message)

            expect(testError.statusCode).toBe(statusCode)
            expect(testError.message).toBe(message)
            expect(testError.data).toBeUndefined()
        })
    } 
)


describe('class ValidationError', () => {
        it('should contain the provided message', () =>{
            const testMessage = 'test';

            const testValidationError = new ValidationError(testMessage);

            expect(testValidationError.message).toBe(testMessage)
        })
    } 
)
