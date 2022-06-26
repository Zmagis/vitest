import fs from 'fs';
import path from 'path';

import { beforeEach, describe, expect, it, vi } from "vitest";
import { Window } from 'happy-dom'
import { showError } from "./dom";

const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
vi.stubGlobal('document', document);

beforeEach(() => {
    document.body.innerHTML = '';
    document.write(htmlDocumentContent);
});

describe('showError()', () => {
    it('should add an error paragraph with id="errors"', () => {
        showError('test message');

        const errEl = document.getElementById('errors');
        const errParagraph = errEl.firstElementChild;

        expect(errParagraph).not.toBeNull()
    })

    it('should not contain error paragraph with id="errors" initially', () => {
        const errEl = document.getElementById('errors');
        const errParagraph = errEl.firstElementChild;

        expect(errParagraph).toBeNull()
    })

    it('should add output provided error message', () => {
        const errorMsg = 'test message';
        showError(errorMsg);

        const errEl = document.getElementById('errors');
        const errParagraph = errEl.firstElementChild;

        expect(errParagraph.textContent).toBe(errorMsg);
    })
})