import React, { MouseEvent, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DocContext } from '../../state/DocContextProvider';
import DocPrintPreview from '../../components/DocPrintPreview';
import { createStyles } from '@mantine/core';
import { useNavigate } from 'react-router-dom';


const useStyles = createStyles((theme, _params, getRef) => ({
    printPreview: {
        backgroundColor: theme.colors['gray'][3],//'hsl(220deg 5% 88%)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    }
}))

function DocPrintPage() {
    const { id } = useParams();
    const {
        doc,
        readCache,
    } = useContext(DocContext);
    const { classes } = useStyles();
    const routeNavigate = useNavigate();

    useEffect(() => {
        if (!(id && parseInt(id) > 0 && !doc.id)) return;
        readCache(parseInt(id))
    }, [doc.id, id, readCache]);

    const handleOnClickEdit = (event: MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        if (!id) return;
        routeNavigate(`/docs/${id}`)
    }
    return (
        <section className={classes.printPreview}>
            <header className={`${classes.header} -do-not-print`}>
                Preview da impressão {id}
                <button onClick={handleOnClickEdit}>Editar</button>
                <button onClick={() => window.print()}>Imprimir</button>
            </header>
            <DocPrintPreview />
        </section>
    );
}

export default DocPrintPage;