import React, { createContext, FC, PropsWithChildren, useCallback, useState } from 'react';
import appDb, { IDocDbRow } from '../AppDb';
import { getDateNow } from '../utils';

export type TActionStatusType = 'IDLE' | 'PENDING' | 'SUCCESS' | 'FAIL'

export type TActionStatus = {
    type: TActionStatusType;
    message: string;
}

const defaultActionStatus: TActionStatus = {
    type: 'IDLE',
    message: '',
}

export interface IDocContext {
    doc: IDocDbRow;
    setDoc: (newDoc: IDocDbRow) => void;

    actionStatus: TActionStatus;
    setActionStatus: (newStatus: TActionStatus) => void;

    /** Saved to IndexedDb */
    cached: boolean;
    setCached: (newState: boolean) => void;

    /** Saved to external file or db service */
    saved: boolean;
    setSaved: (newState: boolean) => void;

    reset: () => void;
    createCache: (newDoc?: IDocDbRow | undefined) => void;
    readCache: (id: number | undefined) => void;
    updateCache: (doc?: IDocDbRow) => void;
    deleteCache: (id: number | undefined) => void;
}

export const defaultDocContext: IDocContext = {
    doc: {
        id: -1,
        date: getDateNow(),
        company: {
            name: '',
            address: '',
            contact: '',
            logo: '',
        },
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
        if (newDoc) setDoc({ ...newDoc });
        setActionStatus({
            type: 'PENDING',
            message: 'Criando documento no cache do navegador...'
        });
        setCached(false);
        setSaved(false);
        setDoc({
            ...doc,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })
        appDb.doc.add({ ...doc })
            .then(result => {
                const docId: number = result as number;
                setDoc({ ...doc, id: !!docId ? docId : 0 });
                setCached(true);
                setSaved(false);
                setActionStatus({
                    type: 'SUCCESS',
                    message: `Documento criado no cache do navegador (ID: ${doc.id})`
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
    }, [doc]);

    const readCache = useCallback((id: number = doc.id) => {
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
                        type: 'SUCCESS',
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
                        type: 'SUCCESS',
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
                    type: 'SUCCESS',
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