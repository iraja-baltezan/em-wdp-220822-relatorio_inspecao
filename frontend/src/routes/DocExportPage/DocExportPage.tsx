import React, { MouseEvent, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DocContext } from '../../state/DocContextProvider';

function DocExportPage() {
    const { id } = useParams();

    const {
        doc,
        readCache,
    } = useContext(DocContext);

    useEffect(() => {
        if (!(id && parseInt(id) > 0 && !doc.id)) return;
        readCache(parseInt(id))
    }, [doc.id, id, readCache]);

    useEffect(() => {
        console.log(doc);
    }, [doc])

    const handleOnClickExport = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const jsonString = JSON.stringify(doc, undefined, 2);
        // console.log(jsonString);
        const link = document.createElement('a');
        link.download = 'RELATORIOS_DE_IMPRESSAO-' + doc.date + '.fri';
        const blob = new Blob([jsonString], { type: 'text/plain' });
        link.href = window.URL.createObjectURL(blob);
        link.click();
        link.remove();
    }

    return (
        <div>
            doc export page {id}
            <br />
            {doc.id ? (
                <>
                    O documento esta pronto para ser baixado!
                    <br />
                    <button onClick={handleOnClickExport}>Baixar documento</button>
                </>
            ) : (
                <>
                    Preparando documento para exportação.
                </>
            )}
        </div>
    );
}

export default DocExportPage;