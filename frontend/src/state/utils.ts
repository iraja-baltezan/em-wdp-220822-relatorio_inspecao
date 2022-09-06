import LZString from "lz-string";
import { TFileDataURL } from "../components/ImageFileInput";
export const getDateNow = (): string => (new Date()).toISOString().replace(/T.+/, '');

export const urlDataCompress = (data?: TFileDataURL): string => {
    if (!data || typeof data !== 'string') return '';
    return LZString.compressToUTF16(data);
}

export const urlDataDecompress = (data?: string | undefined): string => {
    if (!data || typeof data !== 'string') return '';
    const result = LZString.decompressFromUTF16(data);
    if (!result) return '';
    return result;
}

export type TImgDimensions = { height: number, width: number };

export const getImgDimensions = (src: TFileDataURL) =>
    new Promise<TImgDimensions | undefined>(
        (resolve, reject) => {
            if (!src || typeof src !== 'string')
                resolve(undefined);

            const img: HTMLImageElement = document.createElement('img');
            img.onload = function (event) {
                try {
                    resolve({
                        height: img.height,
                        width: img.width,
                    });
                }
                catch (error) {
                    console.log('Erro ao carregar imagem para cálculo das dimensões:', error);
                    reject(error);
                }
            };
            img.remove();
            img.src = src as string;
        }
    )
