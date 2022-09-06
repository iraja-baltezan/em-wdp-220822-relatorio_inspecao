import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';

const imageMimeType = /image\/(png|jpg|jpeg|webp|gif)/i;

export type TFileDataURL = string | ArrayBuffer | null | undefined;

export type TImageFileInputOnChangeEvent = {
    fileDataUrl: string | ArrayBuffer | null | undefined,
}

export type TImageFileInputOnChangeHandler = (event: TImageFileInputOnChangeEvent) => void;

interface IImageFileInputProps {
    onChange: TImageFileInputOnChangeHandler,
}

export default function ImageFileInput({ onChange }: IImageFileInputProps) {
    const [file, setFile] = useState<File | null>(null);
    const [inputKey, setInputKey] = useState<number>(1)
    const [fileDataURLOutput, setFileDataURLOutput] = useState<TFileDataURL>(null);
    const [message, setMessage] = useState<string | undefined>();
    const [changed, setChanged] = useState<boolean>(false);

    const change = useCallback(() => {
        onChange(
            fileDataURLOutput ?
                {
                    fileDataUrl: fileDataURLOutput,
                } :
                {
                    fileDataUrl: null,
                }
        )
    }, [fileDataURLOutput, onChange]);

    useEffect(() => {
        if (!changed) return;
        change();
        setChanged(false);
    }, [change, changed])

    useEffect(() => {
        let fileReader: FileReader;
        let isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (event: ProgressEvent<FileReader>) => {
                const result: TFileDataURL = event.target?.result;
                if (result && !isCancel) {
                    setFileDataURLOutput(result)
                    setChanged(true);
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

        setFile(files[0]);
    }

    function handleOnClickReset(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setMessage('');
        setFile(null);
        setFileDataURLOutput(undefined);
        setInputKey(inputKey * -1);
        setChanged(true);
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
                {message}
            </div>
        </div>
    );
}
