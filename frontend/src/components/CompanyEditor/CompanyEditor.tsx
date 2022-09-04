import React, { ChangeEvent, useContext } from 'react';
import { DocContext } from '../../state/DocContextProvider';
import ImageFileInput from '../ImageFileInput';

function CompanyEditor(
) {
    const {
        doc, setDoc,
        setCached,
        setSaved,
    } = useContext(DocContext);

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

    function handleOnChangeLogo(event: ChangeEvent<HTMLInputElement>) {
        setCached(false);
        setSaved(false);
        setDoc({
            ...doc,
            company: {
                ...doc.company,
                logo: event.currentTarget.value
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
                <div>Endereço</div>
                <input type="text" value={doc.company.address} onChange={handleOnChangeAddress} />
            </label>
            <label>
                <div>Contatos</div>
                <input type="text" value={doc.company.contact} onChange={handleOnChangeContact} />
            </label>
            <label>
                <div>Imagem/Logo/Marca</div>
                <input type="text" value={doc.company.logo} onChange={handleOnChangeLogo} />
            </label>
            <ImageFileInput/>
        </fieldset>
    );
}

export default CompanyEditor;