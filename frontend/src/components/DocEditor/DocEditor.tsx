import React, { ChangeEvent, MouseEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { IDocCompanyDbRow } from '../../state/AppDb';
import { DocContext } from '../../state/DocContextProvider';
import CompanyEditor from '../CompanyEditor';

function DocEditor({ currentDocId = undefined }: { currentDocId?: number | undefined }) {
    const {
        doc, setDoc,
        actionStatus, setActionStatus,
        setCached,
        setSaved,
        reset,
        createCache,
        readCache,
        updateCache,
    } = useContext(DocContext);

    const routeNavigate = useNavigate();

    useEffect(() => {
        if (currentDocId)
            readCache(currentDocId);
        else
            reset();
    }, [currentDocId, readCache, reset])

    useEffect(() => {
        if (actionStatus.type === 'OK_CREATED' && typeof actionStatus.data === 'number') {
            setActionStatus({type: 'IDLE'})
            routeNavigate(`/docs/${actionStatus.data}`);
        }
    }, [actionStatus.data, actionStatus.type, routeNavigate, setActionStatus])

    function handleOnChangeDate(event: ChangeEvent<HTMLInputElement>) {
        const dateInput: string = event.target.value;
        setCached(false);
        setSaved(false);
        setDoc({ ...doc, date: dateInput });
    }

    function handleOnClickCancel(event: MouseEvent<HTMLElement>) {
        event.preventDefault();
        reset();
        routeNavigate('/docs');
    }

    function handleOnClickCreateDoc(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        createCache();
    }

    async function handleOnClickUpdateDoc(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (!doc.createdAt)
            setDoc({ ...doc, createdAt: Date.now() });

        updateCache();
    }

    return (
        <div>
            <h3>Editor</h3>
            {actionStatus.message}
            <fieldset>
                <legend>
                    Conjunto de Formulários
                </legend>
                <label>
                    <div>
                        Identificador
                    </div>
                    <input
                        type="text"
                        readOnly
                        value={(doc.id && (doc.id > 0)) ? doc.id : 'NOVO ID'}
                    />
                </label>
                <label>
                    <div>
                        Data
                    </div>
                    <input
                        type="date"
                        value={doc.date}
                        onChange={handleOnChangeDate}
                    />
                </label>
            </fieldset>
            <CompanyEditor />
            <footer style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '1rem'
            }}>
                <button onClick={handleOnClickCancel}>Cancelar</button>
                {doc.id && doc.id > 0 ? (
                    <button onClick={handleOnClickUpdateDoc}>Atualizar documento</button>
                ) : (
                    <button onClick={handleOnClickCreateDoc}>Criar documento</button>
                )}
            </footer>
        </div>
    );
}

export default DocEditor;