import { expect, it } from "vitest";

import { validateNotEmpty } from "./validation";

it('should throw an error if an empty string provided', () => {
    const value = '';
    const errorMsg = 'Empty string';

    const testValidation = () => validateNotEmpty(value, errorMsg)
    

    expect(testValidation).toThrowError(errorMsg)
})

it('should throw an error if string after trim is empty string', () => {
    const value = '    ';
    const errorMsg = 'Empty string';

    const testValidation = () => validateNotEmpty(value, errorMsg)
    

    expect(testValidation).toThrowError(errorMsg)
})