import LZString from "lz-string";
export const getDateNow = (): string => (new Date()).toISOString().replace(/T.+/, '');

export const urlDataCompress = (data?: string | undefined): string => {
    if (!data) return '';
    return LZString.compress(data);
}

export const urlDataDecompress = (data?: string | undefined): string => {
    if (!data) return '';
    const result = LZString.decompress(data);
    if (!result) return '';
    return result;
}