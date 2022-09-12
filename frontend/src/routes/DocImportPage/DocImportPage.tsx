import React, { ChangeEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDocDbRow } from '../../state/AppDb';
import { DocContext } from '../../state/DocContextProvider';

function DocImportPage() {
    const {
        createCache,
        actionStatus, setActionStatus,
    } = useContext(DocContext);

    const routeNavigate = useNavigate();

    // useEffect(() => {
    //     console.log(doc.id);
    //     console.log(doc);
    // }, [doc]);

    useEffect(() => {
        if (actionStatus.type === 'OK_CREATED' && typeof actionStatus.data === 'number') {
            setActionStatus({ type: 'IDLE' })
            routeNavigate(`/docs/${actionStatus.data}`);
        }
    }, [actionStatus.data, actionStatus.type, routeNavigate, setActionStatus])

    const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        const files = event.currentTarget.files;
        if (!files || files.length < 1) {
            console.log('Nenhum arquivo foi selecionado!');
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = evnt => {
            // console.log('loaded', evnt.target?.result)
            if (typeof evnt.target?.result !== 'string') {
                console.log('O conteúdo do arquivo não é um texto.');
                return;
            }
            const jsonDoc: IDocDbRow = JSON.parse(evnt.target.result);
            if (!jsonDoc.date || !jsonDoc.company || !jsonDoc.company.name){
                alert('Documento inválido.');
                return;
            }
            delete jsonDoc.id;

            // console.log(jsonDoc)
            createCache(jsonDoc);
            // setContentFromFile(evnt.target.result)

        }
        fileReader.readAsText(files[0], 'UTF-8');
    }

    return (
        <div>
            <p>
                Para importar um documento de Relatórios de Inspeção, selecione somente arquivos com a extensão <code><strong>json</strong></code>.
            </p>
            <p>
                Por exemplo: <code>RELATORIOS_DE_IMPRESSAO-2022-09-01.json</code>
            </p>

<p></p>
            <input type="file" onChange={handleChangeFile} accept=".fri" />

        </div>
    );
}

export default DocImportPage;