import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DocEditor from '../../components/DocEditor';

function DocEditPage() {
    const routeParams = useParams();
    const [docId, setDocId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (routeParams.id && !!parseInt(routeParams.id)) {
            setDocId(parseInt(routeParams.id));
        }
        else {
            setDocId(undefined)
        }
    }, [routeParams.id])

    return (
        <main>
            <h1>
                {routeParams.id ? 'Editar' : 'Criar'} documento
            </h1>
            <DocEditor currentDocId={docId} />
        </main>
    )
}

export default DocEditPage;