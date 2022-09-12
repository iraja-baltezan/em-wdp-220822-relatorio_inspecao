import React, { useContext, useEffect, useState } from 'react';
import { DocContext, TDocHeader } from '../../state/DocContextProvider';
import { createStyles } from '@mantine/core';
import DocPrintPreviewPage from '../../components/DocPrintPreviewPage';

const useStyles = createStyles((theme, _params, getRef) => ({
    printPages: {
        display: 'block',
        margin: '0 auto',
        padding: '1rem 0',
        '@media print': {
            '&': {
                border: 'none',
                margin: 0,
                padding: 0,
            }
        }
    },
}))

function DocPrintPreview() {
    const { doc } = useContext(DocContext);
    const { classes } = useStyles();
    const [docHeader, setDocHeader] = useState<TDocHeader>({
        id: doc.id,
        company: doc.company,
        createdAt: doc.createdAt,
        date: doc.date,
        updatedAt: doc.updatedAt,
    });

    useEffect(() => {
        if (!doc || !doc.id) return;
        if (doc.id && (doc.id === docHeader.id)) return;
        setDocHeader({
            id: doc.id,
            company: doc.company,
            createdAt: doc.createdAt,
            date: (new Date(doc.date + 'T00:00:00.000-03:00')).toLocaleDateString(),
            updatedAt: doc.updatedAt,
        });
    }, [doc, docHeader.id])


    return (
        <section className={classes.printPages}>
            {doc.id && doc.customers.map((customer, index) => (
                <DocPrintPreviewPage key={index} pageNumber={index + 1} docHeader={docHeader} customer={customer} />
            ))}
        </section>

    );
}

export default DocPrintPreview;