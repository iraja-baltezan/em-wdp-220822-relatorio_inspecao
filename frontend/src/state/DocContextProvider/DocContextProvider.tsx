import React, { createContext, FC, PropsWithChildren, useCallback, useState } from 'react';
import appDb, { IDocDbRow } from '../AppDb';
import { getDateNow } from '../utils';
import { TActionStatus, IDocContext } from './types';

const defaultActionStatus: TActionStatus = {
    type: 'IDLE',
}

export const defaultDocContext: IDocContext = {
    doc: {
        id: undefined,
        date: getDateNow(),
        company: {
            name: '',
            address: '',
            contact: '',
            logo: '',
        },
        customers: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        toDelete: false
    },
    setDoc: (newDoc: IDocDbRow) => { },
    cached: false,
    setCached: (newState: boolean) => { },
    saved: false,
    setSaved: (newState: boolean) => { },

    actionStatus: { ...defaultActionStatus },
    setActionStatus: (newStatus: TActionStatus) => { },

    reset: () => { },
    createCache: (newDoc?: IDocDbRow | undefined) => { },
    readCache: (id: number | undefined) => { },
    updateCache: (doc?: IDocDbRow) => { },
    deleteCache: (id: number | undefined) => { },
}


export const DocContext = createContext<IDocContext>(defaultDocContext)


const DocContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [doc, setDoc] = useState<IDocDbRow>({ ...defaultDocContext.doc });
    const [cached, setCached] = useState<boolean>(defaultDocContext.cached);
    const [actionStatus, setActionStatus] = useState<TActionStatus>({ ...defaultDocContext.actionStatus });
    const [saved, setSaved] = useState<boolean>(defaultDocContext.saved);

    const reset = useCallback(() => {
        setDoc({ ...defaultDocContext.doc });
        setCached(defaultDocContext.cached);
        setActionStatus({ ...defaultDocContext.actionStatus });
        setSaved(defaultDocContext.saved);
    }, []);

    const createCache = useCallback((newDoc?: IDocDbRow | undefined) => {
        setActionStatus({
            type: 'PENDING',
            message: 'Criando documento no cache do navegador...'
        });
        let cacheDoc = newDoc ? {...newDoc} : {...doc};
        setCached(false);
        setSaved(false);
        cacheDoc = {
            ...cacheDoc,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        delete cacheDoc.id;
        appDb.doc.add({ ...cacheDoc })
            .then(result => {
                // console.log('appDb.doc.add result', result)
                const docId: number = result as number;
                setCached(true);
                setSaved(false);
                setActionStatus({
                    type: 'OK_CREATED',
                    message: `Documento criado no cache do navegador (ID: ${docId})`,
                    data: docId,
                });
            })
            .catch(error => {
                setActionStatus({
                    type: 'FAIL',
                    message: 'Erro ao criar o documento no cache do navegador. Veja o console para mais informações.',
                })
                console.log(
                    'Erro ao criar o documento no cache do navegador.',
                    error
                );
            })
            .finally(()=>{
                setDoc({ ...cacheDoc});
            })
    }, [doc]);

    const readCache = useCallback((id: number | undefined = doc.id) => {
        setActionStatus({
            type: 'PENDING',
            message: 'Lendo o documento do cache do navegador...'
        });
        if (!id) {
            setActionStatus({
                type: 'FAIL',
                message: 'ID do documento é inválido.'
            })
            return;
        }
        appDb.doc.get(id)
            .then((docFromCache: IDocDbRow | undefined) => {
                setDoc(
                    docFromCache ?
                        { ...defaultDocContext.doc, ...docFromCache } :
                        { ...defaultDocContext.doc }
                );
                setActionStatus(docFromCache ?
                    {
                        type: 'OK',
                        message: 'Documento carregado com sucesso.',
                    } :
                    {
                        type: 'FAIL',
                        message: 'Falha ao carregar documento do cache do navegador.'
                    }
                )
            })
            .catch((error: any) => {
                setActionStatus({
                    type: 'FAIL',
                    message: 'Falha ao carregar documento do cache do navegador. Mais detalhes no console do navegador.',
                })
                console.log('Erro ao ler documento do cache.', error);
            });
    }, [doc.id]);

    const updateCache = useCallback((docToCache: IDocDbRow = { ...doc }) => {
        setActionStatus({
            type: 'PENDING',
            message: 'Atualizando o documento no cache do navegador...'
        });
        if (!docToCache.id) {
            setActionStatus({
                type: 'FAIL',
                message: 'ID do documento é inválido.'
            })
            return;
        }
        setCached(false);
        setSaved(false);

        docToCache.updatedAt = Date.now();
        appDb.doc.update(docToCache.id, docToCache)
            .then(result => {
                if (result) {
                    setDoc({ ...docToCache });
                    setCached(true);
                    setActionStatus({
                        type: 'OK',
                        message: 'Documento atualizado com sucesso.',
                    });
                }
                else {
                    setActionStatus({
                        type: 'FAIL',
                        message: 'Falha ao atualizar documento no cache do navegador.'
                    });
                }
            })
            .catch(error => {
                setActionStatus({
                    type: 'FAIL',
                    message: 'Falha ao atualizar documento no cache do navegador. Mais informações no console.'
                });
                console.log('Erro atualizar o documento no cache.', error);
            })
    }, [doc]);

    const deleteCache = useCallback((id: number | undefined = doc.id) => {
        setActionStatus({
            type: 'PENDING',
            message: 'Excluindo o documento do cache do navegador...'
        });
        if (!id) {
            setActionStatus({
                type: 'FAIL',
                message: 'ID do documento é inválido.'
            })
            return;
        }

        appDb.doc.delete(id)
            .then(result => {
                reset();
                setActionStatus({
                    type: 'OK',
                    message: 'Documento excluído do cache com sucesso.',
                });
            })
            .catch(error => {
                setActionStatus({
                    type: 'FAIL',
                    message: 'Falha ao excluir o documento do cache do navegador. Mais informações no console.'
                });
                console.log('Erro atualizar o documento no cache.', error);
            })
    }, [doc.id, reset]);

    return (
        <DocContext.Provider
            value={{
                doc, setDoc,
                actionStatus, setActionStatus,
                cached, setCached,
                saved, setSaved,
                reset,
                createCache,
                readCache,
                updateCache,
                deleteCache,
            }}
        >
            {children}
        </DocContext.Provider>
    );
}

export default DocContextProvider;