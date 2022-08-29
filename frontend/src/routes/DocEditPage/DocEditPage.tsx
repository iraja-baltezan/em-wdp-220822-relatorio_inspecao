import React from 'react';
import { useParams } from 'react-router-dom';
import DocEditor from '../../components/DocEditor';

function DocEditPage() {
    const routeParams = useParams();
    const currentDocId: number | undefined =
        routeParams.id && !!parseInt(routeParams.id) ?
            parseInt(routeParams.id) : undefined;

    return (
        <main>
            Criar documento

            <DocEditor currentDocId={currentDocId} />
        </main>
    )
}

export default DocEditPage;