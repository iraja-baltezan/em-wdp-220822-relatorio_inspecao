import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react';
import appDb, { IDocDbRow } from '../../state/AppDb';

function DocReadPage() {
    const docs = useLiveQuery(
        () => appDb.doc.toArray()
    );

    const handleOnClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget.dataset.id)
    }

    const handleOnClickDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.dataset.id;
        if (!id) {
            alert('ID inválida.');
            return;
        }
        const doc = await appDb.doc.get(parseInt(id));
        if (!doc) {
            alert('Documento não encontrado.');
            return;
        }
        if (doc.toDelete){
            await appDb.doc.delete(parseInt(id));
        }
        else {
            const result = await appDb.doc.update(parseInt(id), { ...doc, toDelete: true })
            if (!result) {
                alert(`Não foi possível excluir o documento ${id}.`);
            }
        }
    }

    const handleOnClickRestore = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.dataset.id;
        if (!id) {
            alert('ID inválida.');
            return;
        }
        const doc = await appDb.doc.get(parseInt(id));
        if (!doc) {
            alert('Documento não encontrado.');
            return;
        }
        const result = await appDb.doc.update(parseInt(id), { ...doc, toDelete: false })
        if (!result) {
            alert(`Não foi possível recuperar o documento ${id}.`);
        }
    }

    return (
        <section>
            Doc read page
            <ul>
                {docs
                    ?.filter(doc => !doc.toDelete)
                    .map((doc, index) => (
                        <li key={index}>
                            <div>ID: {doc.id}</div>
                            <div>Data de inspeção: {doc.date}</div>
                            <div>Atualização: {doc.updatedAt}</div>
                            <div>Criação: {doc.createdAt}</div>
                            <div>Empresa: {doc.companyId}</div>
                            <button data-id={doc.id} onClick={handleOnClickEdit}>Editar</button>
                            <button data-id={doc.id} onClick={handleOnClickDelete}>Deletar</button>
                        </li>
                    ))
                }
            </ul>
            <h3>Lixeira</h3>
            <ul>
                {docs
                    ?.filter(doc => doc.toDelete)
                    .map((doc, index) => (
                        <li key={index}>
                            <div>ID: {doc.id}</div>
                            <div>Data de inspeção: {doc.date}</div>
                            <div>Atualização: {doc.updatedAt}</div>
                            <div>Criação: {doc.createdAt}</div>
                            <div>Empresa: {doc.companyId}</div>
                            <button data-id={doc.id} onClick={handleOnClickEdit}>Editar</button>
                            <button data-id={doc.id} onClick={handleOnClickRestore}>Restaurar</button>
                            <button data-id={doc.id} onClick={handleOnClickDelete}>Destruir</button>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}

export default DocReadPage;