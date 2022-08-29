import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, getDateNow, IAppContext } from '../../state/AppContextProvider';


function DocEditor({ currentDocId = undefined }: { currentDocId?: number | undefined }) {
    const { currentDoc } = useContext<IAppContext>(AppContext);
    const routeNavigate = useNavigate();

    const [id, setId] = useState<number | string | undefined>(
        currentDoc.doc.id
    );

    const [date, setDate] = useState<string>(
        currentDoc?.doc?.date ? currentDoc.doc.date : getDateNow()
        // (new Date()).toLocaleDateString('en-CA')
    );

    const [companyId, setCompanyId] = useState<string | undefined>(
        currentDoc?.doc?.companyId ? currentDoc.doc.companyId : undefined
    );

    useEffect(() => {
        if (!currentDocId) {
            currentDoc.reset();
            setId(currentDoc.doc.id);
            setDate(currentDoc.doc.date ? currentDoc.doc.date : getDateNow());
            setCompanyId(currentDoc.doc.companyId);
            return;
        }
        currentDoc.processing = true;
        currentDoc.readCache(currentDocId)
            .then(readCacheResult => {
                setId(currentDoc.doc.id);
                setDate(currentDoc.doc.date ? currentDoc.doc.date : getDateNow());
                setCompanyId(currentDoc.doc.companyId);
            })
            .catch(error => {
                console.log('Erro ao carregar documento do cache.', error)
            })
            .finally(() => {
                currentDoc.processing = false;
            })
    }, [currentDocId, currentDoc])

    const handleOnChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
        const dateInput: string = event.target.value;
        // console.log('date input', dateInput)
        currentDoc.cached = false;
        currentDoc.saved = false;
        currentDoc.doc = {
            ...currentDoc.doc,
            date: dateInput,
        }
        setDate(dateInput);
    }

    const handleOnChangeCompany = (event: ChangeEvent<HTMLSelectElement>) => {
        const companyIdInput = event.target.value;
        if ((companyIdInput === '0') || (companyIdInput === '1')) return;
        currentDoc.cached = false;
        currentDoc.saved = false;
        currentDoc.doc = {
            ...currentDoc.doc,
            companyId: companyIdInput,
        }
        setCompanyId(companyIdInput);
    }

    const handleOnClickCancel = (event: MouseEvent<HTMLElement>) => {
        currentDoc.reset();
        routeNavigate('/docs');
    }

    const handleOnClickCreateDoc = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const result = await currentDoc.createCache();
        // console.log('create result', result);
        if (!result) {
            alert('Não foi possível criar documento no cache.')
            return;
        }
        setId(result);
        alert('Documento criado com sucesso no cache.');
        routeNavigate(`/doc/${result}`);
    }

    const handleOnClickUpdateDoc = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const result = await currentDoc.updateCache();
        // console.log('result update', result);
        if (!result) {
            alert('Não foi possível atualizar documento no cache.')
            return;
        }
        alert('Documento atualizado com sucesso no cache.')
    }

    return (
        <div>
            DocEditor

            <form>
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
                            value={(id && (id > 0)) ? id : 'NOVO ID'}
                        />
                    </label>
                    <label>
                        <div>
                            Data
                        </div>
                        <input
                            type="date"
                            value={date}
                            onChange={handleOnChangeDate}
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>
                        Empresa
                    </legend>
                    <label>
                        <div>
                            Selecionar empresa
                        </div>
                        <select
                            value={companyId ? companyId : 0}
                            onChange={handleOnChangeCompany}
                        >
                            <option value="0" disabled>SELECIONAR EMPRESA</option>
                            <option value="1">REGISTRAR NOVA EMPRESA</option>
                            {[
                                '2022-08-26T16:19:23.713Z|Empresa A',
                                '2022-08-26T16:19:24.713Z|Empresa B',
                                '2022-08-26T16:19:25.713Z|Empresa C',
                            ].map((option, index) => (
                                <option key={index} value={option}>
                                    {option.split('|')[1]}
                                </option>
                            ))}
                        </select>
                    </label>
                    {companyId && (
                        <div>
                            <span>Identificador:</span>
                            <span>{companyId}</span>
                            <span>{currentDoc.doc.companyId}</span>
                        </div>
                    )}
                </fieldset>
                <footer style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1rem'
                }}>
                    <button onClick={handleOnClickCancel}>Cancelar</button>
                    {currentDoc.doc.id ? (
                        <button onClick={handleOnClickUpdateDoc}>Atualizar documento</button>
                    ) : (
                        <button onClick={handleOnClickCreateDoc}>Criar documento</button>
                    )}
                </footer>
            </form>

        </div>
    );
}

export default DocEditor;