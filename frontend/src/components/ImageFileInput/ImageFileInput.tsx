import React, { ChangeEvent, useEffect, useState } from 'react';

const imageMimeType = /image\/(png|jpg|jpeg|webp|gif)/i;

function ImageFileInput() {
    const [file, setFile] = useState<File | null>(null);
    const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer | null | undefined>(null);

    useEffect(() => {
        let fileReader: FileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (event:ProgressEvent<FileReader>) => {
                const result: string | ArrayBuffer | null | undefined = event.target?.result;
                if (result && !isCancel) {
                    setFileDataURL(result)
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

    useEffect(()=>{
        console.log(typeof fileDataURL);
        if (typeof fileDataURL !== 'string') return;
        console.log(fileDataURL.length);
    },[fileDataURL])

    function handleOnChangeFile(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (!files || files.length < 1)
            return;

        if (files[0].size > (1024 * 1024)) {
            const msg = 'Arquivo maior que 1MB! Selecione um arquivo menor que 1MB.';
            alert(msg);
            console.log(msg);
            return;
        }

        if (!files[0].type.match(imageMimeType)) {
            const msg = 'As imagens devem ser do tipo GIF, JPG, JPEG, PNG ou WEBP.';
            alert(msg);
            console.log(msg);
            return;
        }
        setFile(files[0]);
    }

    return (
        <div>
            <input
                type='file'
                accept='image/*'
                onChange={handleOnChangeFile}
            />
            {fileDataURL && (
                <img src={fileDataURL as string} alt="Preview da imagem no arquivo" />
            )}

        </div>
    );
}

export default ImageFileInput;