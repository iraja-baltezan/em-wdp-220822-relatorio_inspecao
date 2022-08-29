import React from 'react';
import { useParams } from 'react-router-dom';

function DocUpdatePage() {
    const routeParams = useParams();

    console.log(typeof routeParams.id)
    return (
        <main>
            Doc Update page {routeParams.id}
        </main>
    );
}

export default DocUpdatePage;