import {sanitizeImageUrl} from "./utils";

describe('sanitizeImageUrl', () => {
    it('should return the original URL if it does not contain a Google Drive link', () => {
        const url = 'https://example.com/image.jpg';
        expect(sanitizeImageUrl(url)).toEqual(url);
    });

    it('should sanitize a Google Drive URL with /view?usp=sharing', () => {
        const url = 'https://drive.google.com/file/d/123abc/view?usp=sharing';
        const expected = 'https://drive.google.com/uc?export=view&id=123abc';
        expect(sanitizeImageUrl(url)).toEqual(expected);
    });

    it('should sanitize a Google Drive URL with /view?usp=drive_link', () => {
        const url = 'https://drive.google.com/file/d/456def/view?usp=drive_link';
        const expected = 'https://drive.google.com/uc?export=view&id=456def';
        expect(sanitizeImageUrl(url)).toEqual(expected);
    });

    it('should return /no-image.png if the URL is falsy', () => {
        expect(sanitizeImageUrl(null as any)).toEqual('/no-image.png');
        expect(sanitizeImageUrl(undefined as any)).toEqual('/no-image.png');
        expect(sanitizeImageUrl('')).toEqual('/no-image.png');
    });
});