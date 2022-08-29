import React, { useContext, useEffect, useState } from 'react';
import { IAppContext, AppContext } from '../../state/AppContext';
import iRFormsDb, { IIRFormsDbTable } from '../../state/IRFormsDb';


function IRFormsLoader() {
    const { id, date, create } = useContext(AppContext) as IAppContext;
    const [formSetCount, setFormSetCount] = useState<number>(0);
    const [formSets, setFormSets] = useState<IIRFormsDbTable[]>([]);

    const handleCreateForms = () => {
        create();
    }

    useEffect(() => {
        iRFormsDb.formSet.count()
            .then(count => {
                setFormSetCount(count);
            })
            .catch(reason => console.log(reason))
    }, [])
    useEffect(() => {
        iRFormsDb.formSet.toArray()
        .then(formSetArray => {
            setFormSets(formSetArray)
        })
    }, [])

    return (
        <div>
            <h1>
                Criar ou Abrir Formulários
            </h1>

            <button onClick={handleCreateForms}>Criar novo conjunto</button>

            <button disabled>Carregar de um arquivo</button>

            <h2>Recentes</h2>
            {!formSetCount && (
                <p>Nenhum conjunto de formulários foi encontrado.</p>
            )}
            {(formSetCount > 0) && (
                <ul>
                    {formSets.map(formSet => (
                    <li key={formSet.id}>
                        <div>{formSet.id}</div>
                        <div>{formSet.date}</div>
                    </li>

                    ) )}
                </ul>
            )}
        </div>
    );
}

export default IRFormsLoader;
