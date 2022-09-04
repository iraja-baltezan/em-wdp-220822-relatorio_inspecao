import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import appDb from '../../state/AppDb';

function DocSelectPage() {
    const docs = useLiveQuery(
        () => appDb.doc.toArray()
    );
    const routeNavigate = useNavigate();


    const handleOnClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id: string | undefined = event.currentTarget.dataset.id;
        // console.log(id)
        if (!id) return;
        routeNavigate(`/docs/${id}`)
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

        // const confirmDelete = window.confirm('Deletar documento?');
        // if (!confirmDelete) return;

        if (doc.toDelete) {
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

    const liStyle: React.CSSProperties = {
        display: 'flex',
        gap: '0.5em',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ccc',
        padding: '0.5rem'
    }

    return (
        <section>
            <h2>Documentos recentes</h2>
            <ul>
                {docs
                    ?.filter(doc => !doc.toDelete)
                    .map((doc, index) => (
                        <li key={index} style={liStyle}>
                            <div>
                                <div>
                                    <span>ID: {doc.id}</span>
                                    <span>Data de inspeção: {doc.date}</span>
                                    <span>Atualização: {doc.updatedAt}</span>
                                    <span>Criação: {doc.createdAt}</span>
                                </div>
                                <div>
                                    <span>Empresa: {doc.company?.name}</span>
                                </div>
                            </div>
                            <div>
                                <button data-id={doc.id} onClick={handleOnClickEdit}>Editar</button>
                                <button data-id={doc.id} onClick={handleOnClickDelete}>Deletar</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <h3>Lixeira</h3>
            <ul>
                {docs
                    ?.filter(doc => doc.toDelete)
                    .map((doc, index) => (
                        <li key={index} style={liStyle}>
                            <div>
                                <div>
                                    <span>ID: {doc.id}</span>
                                    <span>Data de inspeção: {doc.date}</span>
                                    <span>Atualização: {doc.updatedAt}</span>
                                    <span>Criação: {doc.createdAt}</span>
                                </div>
                                <div>
                                    <span>Empresa: {doc.company?.name}</span>
                                </div>
                            </div>
                            <div>
                                <button data-id={doc.id} onClick={handleOnClickEdit}>Editar</button>
                                <button data-id={doc.id} onClick={handleOnClickRestore}>Restaurar</button>
                                <button data-id={doc.id} onClick={handleOnClickDelete}>Destruir</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}

export default DocSelectPage;