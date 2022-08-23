import React, { useContext } from 'react';
import { IIRFormsContext, IRFormsContext } from '../../state/IRFormsContext';

function IRFormsLoader() {
    const {id, date, create} = useContext(IRFormsContext) as IIRFormsContext;

    const handleCreateForms = () => {
        create();
    }

    return (
        <div>
            <h1>
                Criar ou Abrir Formulários
            </h1>

            <button onClick={handleCreateForms}>Criar novo grupo</button>
            <button disabled>Carregar de um arquivo</button>
        </div>
    );
}

export default IRFormsLoader;
