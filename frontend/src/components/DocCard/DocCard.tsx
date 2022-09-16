import React from 'react';
import { Card, Image, Button, ActionIcon } from '@mantine/core';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { IDocDbRow } from '../../state/AppDb';
import { urlDataDecompress } from '../../state/utils';
import { useStyles } from './style';

type TDocCardProps = {
    doc: IDocDbRow,
    onClickEdit: (id: number | undefined) => void,
    onClickDelete: (id: number | undefined) => void,
    onClickRestore: (id: number | undefined) => void,
}

function DocCard({ doc, onClickEdit, onClickDelete, onClickRestore }: TDocCardProps) {
    const { classes } = useStyles();

    const handleOnClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClickEdit(doc.id);
    }

    const handleOnClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClickDelete(doc.id);
    }

    const handleOnClickRestore = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClickRestore(doc.id);
    }

    return (
        <Card
            radius='md'
            withBorder
            className={classes.Card}
        >
            <Card.Section p={doc.company.logo ? 8 : 0} className={classes.SectionImg}>
                <Image
                    src={urlDataDecompress(doc.company.logo)}
                    height={doc.company.logo ? 80 : 96}
                    fit='contain'
                    alt={`Logo ${doc.company.name}`}
                    withPlaceholder
                />
            </Card.Section>

            <div className={classes.SectionInfo}>
                <div className='info-row'>
                    <b className='type'>Empresa</b>
                    <span className='value'>{doc.company?.name}</span>
                </div>
                <div className='info-row'>
                    <b className='type'>Data</b>
                    <span className='value'>{(new Date(doc.date)).toLocaleDateString()}</span>
                </div>
                <div className='info-row -compact'>
                    <b className='type'>Criação</b>
                    <span className='value'>{(new Date(doc.createdAt)).toLocaleString()}</span>
                </div>
                <div className='info-row -compact'>
                    <b className='type'>Atualização</b>
                    <span className='value'>{(new Date(doc.updatedAt)).toLocaleString()}</span>
                </div>
            </div>

            <div className={classes.SectionActions}>
                <ActionIcon
                    data-id={doc.id}
                    onClick={handleOnClickDelete}
                    title={doc.toDelete ? 'Deletar' : 'Remover'}
                    variant='outline'
                    color={'red'}
                    size={'lg'}
                >
                    <BsTrash size={20} />
                </ActionIcon>

                {doc.toDelete && (
                    <>
                        <ActionIcon
                            data-id={doc.id}
                            onClick={handleOnClickEdit}
                            title='Editar'
                            variant='filled'
                            color={'primary'}
                            size={'lg'}
                        >
                            <BsPencil size={20} />
                        </ActionIcon>
                        <Button data-id={doc.id} onClick={handleOnClickRestore}>Restaurar</Button>
                    </>
                )}

                {!doc.toDelete && (
                    <Button data-id={doc.id} onClick={handleOnClickEdit}>Editar</Button>
                )}
            </div>

        </Card>
    );
}

export default DocCard;