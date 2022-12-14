import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { DocContext } from '../../state/DocContextProvider';
import { getImgDimensions, getImgFileSize, TImgDimensions, urlDataCompress, urlDataDecompress } from '../../state/utils';
import ImageFileInput from '../ImageFileInput';
import { TImageFileInputOnChangeEvent, TImageFileInputOnChangeHandler } from '../ImageFileInput/ImageFileInput';

function CompanyEditor(
) {
    const {
        doc, setDoc,
        setCached,
        setSaved,
    } = useContext(DocContext);
    const [logoDimensions, setLogoDimensions] = useState<TImgDimensions | undefined>();
    const [logoFileSize, setLogoFileSize] = useState<number | undefined>();

    useEffect(() => {
        // if (!doc.company.logo) return;
        const fileDataUrl = urlDataDecompress(doc.company.logo);
        getImgDimensions(fileDataUrl).then(result => {
            setLogoDimensions(result)
        });
        setLogoFileSize(getImgFileSize(fileDataUrl));
    }, [doc.company.logo])

    function handleOnChangeName(event: ChangeEvent<HTMLInputElement>) {
        setCached(false);
        setSaved(false);
        setDoc({
            ...doc,
            company: {
                ...doc.company,
                name: event.currentTarget.value
            }
        });
    }

    function handleOnChangeAddress(event: ChangeEvent<HTMLInputElement>) {
        setCached(false);
        setSaved(false);
        setDoc({
            ...doc,
            company: {
                ...doc.company,
                address: event.currentTarget.value
            }
        });
    }

    function handleOnChangeContact(event: ChangeEvent<HTMLInputElement>) {
        setCached(false);
        setSaved(false);
        setDoc({
            ...doc,
            company: {
                ...doc.company,
                contact: event.currentTarget.value
            }
        });
    }

    const handleOnChangeLogo: TImageFileInputOnChangeHandler = (event: TImageFileInputOnChangeEvent) => {
        const { fileDataUrl } = event;
        setCached(false);
        setSaved(false);
        // getImgDimensions(fileDataUrl).then(result => {
        //     setLogoDimensions(result)
        // });
        // setLogoFileSize(getImgFileSize(fileDataUrl));
        setDoc({
            ...doc,
            company: {
                ...doc.company,
                logo: urlDataCompress(fileDataUrl),
            }
        });
    }

    return (
        <fieldset>
            <legend>Empresa</legend>
            <label>
                <div>Nome</div>
                <input type="text" value={doc.company.name} onChange={handleOnChangeName} />
            </label>
            <label>
                <div>Endere??o</div>
                <input type="text" value={doc.company.address} onChange={handleOnChangeAddress} />
            </label>
            <label>
                <div>Contatos</div>
                <input type="text" value={doc.company.contact} onChange={handleOnChangeContact} />
            </label>
            <label>
                <div>Imagem/Logo/Marca</div>
                <ImageFileInput
                    onChange={handleOnChangeLogo}
                />
                <div>
                    {logoDimensions && (
                        <div>
                            Dimens??es: {logoDimensions.width} x {logoDimensions.height} px
                        </div>
                    )}
                    {!!logoFileSize && (
                        <div>
                            Tamanho de arquivo: {logoFileSize} Bytes
                        </div>
                    )}
                    {!!doc.company.logo && typeof doc.company.logo === 'string' && (
                        <div>
                            <img
                                src={urlDataDecompress(doc.company.logo)}
                                alt="Logo preview."
                                style={{
                                    maxWidth: '100%'
                                }}
                            />
                        </div>
                    )}

                </div>
            </label>
        </fieldset>
    );
}

export default CompanyEditor;