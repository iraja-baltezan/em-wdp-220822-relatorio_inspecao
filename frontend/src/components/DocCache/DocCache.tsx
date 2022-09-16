import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import appDb, { IDocDbRow } from '../../state/AppDb';
import { Badge, Tabs, Title } from '@mantine/core';
import { BsRecycle, BsFiles } from 'react-icons/bs';
import { useStyles } from './style';
import DocCard from '../DocCard';

function DocCache() {
    const [recentDocs, setRecentDocs] = useState<IDocDbRow[]>([]);
    const [trashDocs, setTrashDocs] = useState<IDocDbRow[]>([]);

    const { classes } = useStyles();

    const docs = useLiveQuery(() => appDb.doc.toArray());

    const routeNavigate = useNavigate();

    useEffect(() => {
        if (!docs) return;
        setRecentDocs(docs.filter(doc => !doc.toDelete));
        setTrashDocs(docs.filter(doc => doc.toDelete));
    }, [docs])

    const handleOnClickEdit = (id: number | undefined) => {
        if (!id) return;
        routeNavigate(`/docs/${id}`)
    }

    const handleOnClickDelete = async (id: number | undefined) => {
        if (!id) {
            alert('ID inválida.');
            return;
        }
        const doc = await appDb.doc.get(id);
        if (!doc) {
            alert('Documento não encontrado.');
            return;
        }

        if (doc.toDelete && !(window.confirm('Deletar documento?'))) return;

        if (doc.toDelete) {
            await appDb.doc.delete(id);
        }
        else {
            const result = await appDb.doc.update(id, { ...doc, toDelete: true })
            if (!result) {
                alert(`Não foi possível excluir o documento ${id}.`);
            }
        }
    }

    const handleOnClickRestore = async (id: number | undefined) => {
        if (!id) {
            alert('ID inválida.');
            return;
        }
        const doc = await appDb.doc.get(id);
        if (!doc) {
            alert('Documento não encontrado.');
            return;
        }
        const result = await appDb.doc.update(id, { ...doc, toDelete: false })
        if (!result) {
            alert(`Não foi possível recuperar o documento ${id}.`);
        }
    }

    return (
        <section>
            <Title>
                Documentos
            </Title>
            <p>
                Documentos no cache deste navegador. <br/>
                Faça a exportação para não perder documentos, caso o cache do navegador seja limpo ou excluído.
            </p>
            <Tabs defaultValue='recent' classNames={{panel:classes.TabPanel}}>
                <Tabs.List>
                    <Tabs.Tab
                        value='recent'
                        icon={<BsFiles size={20} />}
                        rightSection={
                            <Badge
                                size='lg'
                                variant='outline'
                                className={classes.TabTabBadge}
                            >
                                {recentDocs.length}
                            </Badge>
                        }
                    >
                        Recentes
                    </Tabs.Tab>
                    <Tabs.Tab
                        value='trash'
                        icon={<BsRecycle size={20} />}
                        rightSection={
                            <Badge
                                size='lg'
                                variant='outline'
                                className={classes.TabTabBadge}
                            >
                                {trashDocs.length}
                            </Badge>
                        }
                    >
                        Lixeira
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='recent' pt='xs'>
                    <div className={classes.Grid}>
                        {recentDocs
                            .map((doc, index) => (
                                <DocCard
                                    key={index}
                                    doc={doc}
                                    onClickDelete={handleOnClickDelete}
                                    onClickEdit={handleOnClickEdit}
                                    onClickRestore={handleOnClickRestore}
                                />
                            ))
                        }
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value='trash' pt='xs'>
                    <div className={classes.Grid}>
                        {trashDocs
                            .map((doc, index) => (
                                <DocCard
                                    key={index}
                                    doc={doc}
                                    onClickDelete={handleOnClickDelete}
                                    onClickEdit={handleOnClickEdit}
                                    onClickRestore={handleOnClickRestore}
                                />
                            ))
                        }
                    </div>
                </Tabs.Panel>
            </Tabs>

        </section>
    );
}

export default DocCache;