import { describe, expect, it, vi } from "vitest";
import { HttpError } from "./errors";
import { sendDataRequest } from "./http";

const mockedResponseData = {testKey: 'testData'};
const rejectMsg = 'not a string'
const mockedFetch = vi.fn((url, options) => {
    if (typeof options.body !== 'string'){
        return reject(rejectMsg)
    }
    return new Promise((resolve, reject) => {
        const testResponse = {
            ok: true,
            json() {
                return new Promise((resolve, reject) =>{
                    resolve(mockedResponseData);
                })
            }
        }
        resolve(testResponse)
    });
})
vi.stubGlobal('fetch', mockedFetch);

describe('sendDataRequest()', () => {
    it('should return any available response data', () => {
        const testData = { key: 'data' }

        return expect(sendDataRequest(testData)).resolves.toEqual(mockedResponseData)
    })

    it('should convert provided data to JSON before sending the request', async () => {
        const testData = { key: 'data' }

        let errorMsg;

        try {
            await sendDataRequest(testData);
        } catch (error) {
            errorMsg =console.error();
        }

        expect(errorMsg).not.toBe(rejectMsg)
    })

    it('should throw an HttpError in case of not-ok status', () => {
        mockedFetch.mockImplementationOnce(
            (url, options) => {
                return new Promise((resolve, reject) => {
                    const testResponse = {
                        ok: false,
                        json() {
                            return new Promise((resolve, reject) =>{
                                resolve(mockedResponseData);
                            })
                        }
                    }
                    resolve(testResponse)
                });
            }
        )
        const testData = { key: 'data' }
     
        return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError)
    })
})
