import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

const imageMimeType = /image\/(png|jpg|jpeg|webp|gif)/i;

type TImageFileInputOnChangeEvent = (fileDataUrlOutput: string | ArrayBuffer | null | undefined) => void;

type TImgDimensions = { height: number, width: number };

function ImageFileInput(
    {
        fileDataURLInput,
        onChange
    }: {
        fileDataURLInput?: string | undefined,
        onChange?: TImageFileInputOnChangeEvent
    }
) {
    const [file, setFile] = useState<File | null>(null);
    const [inputKey, setInputKey] = useState<number>(1)
    const [fileDataURLOutput, setFileDataURLOutput] = useState<string | ArrayBuffer | null | undefined>(null);
    const [message, setMessage] = useState<string | undefined>();
    const [dimensions, setDimensions] = useState<TImgDimensions>({ height: 0, width: 0 });


    useEffect(() => {
        let fileReader: FileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (event: ProgressEvent<FileReader>) => {
                const result: string | ArrayBuffer | null | undefined = event.target?.result;
                if (result && !isCancel) {
                    setFileDataURLOutput(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }
    }, [file]);

    useEffect(() => {
        if (!onChange) return;
        onChange(fileDataURLOutput);
    }, [fileDataURLOutput, onChange]);

    useEffect(() => {
        if (!fileDataURLOutput || typeof fileDataURLOutput !== 'string') {
            setDimensions({ height: 0, width: 0 });
            return;
        }

        const img: HTMLImageElement = document.createElement('img');
        img.onload = function (event) {
            setDimensions({
                height: img.height,
                width: img.width
            });
            img.remove();
        }
        img.src = fileDataURLOutput as string;
    }, [fileDataURLOutput])

    function handleOnChangeFile(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        setMessage('');

        if (!files || files.length < 1)
            return;

        if (files[0].size > (1024 * 1024)) {
            setMessage('Arquivo maior que 1MB! Selecione um arquivo menor que 1MB.');
            return;
        }

        if (!files[0].type.match(imageMimeType)) {
            setMessage('As imagens devem ser do tipo GIF, JPG, JPEG, PNG ou WEBP.');
            return;
        }

        setMessage(`Tamanho: ${files[0].size} Bytes`);
        setFile(files[0]);
    }

    function handleOnClickReset(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setMessage('');
        setFile(null);
        setFileDataURLOutput(undefined);
        setInputKey(inputKey * -1);
    }

    return (
        <div>
            <input
                type='file'
                accept='image/*'
                key={inputKey}
                onChange={handleOnChangeFile}
            />
            <button onClick={handleOnClickReset}>Reset</button>
            <div>
                {dimensions.height > 0 && dimensions.width > 0 && (
                    <div>
                        Dimensões: {dimensions.width} x {dimensions.height} px
                    </div>
                )}
                {message}
            </div>
        </div>
    );
}

export default ImageFileInput;