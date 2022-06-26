import { describe, it, expect } from "vitest";
import { extractPostData } from "./posts";

describe('extractPostData()', () => {
    it('should extract title and content from form data', () => {
        const title = 'test title';
        const content = 'test content';
        const formData = {
            title, content,
            get(indentifier){
                return this[indentifier]
            }
        }

        const data = extractPostData(formData);
        expect(data.title).toBe(title);
        expect(data.content).toBe(content);
    })
})