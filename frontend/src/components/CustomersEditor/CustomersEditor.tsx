import React, { MouseEvent, useContext } from 'react';
import { DocContext } from '../../state/DocContextProvider';
import { IDocCustomerDbRow } from '../../state/AppDb';
import CustomerEditor from '../CustomerEditor';

function CustomersEditor() {
    const {
        doc, setDoc,
    } = useContext(DocContext);

    const handleOnClickAddCustomer = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setDoc({
            ...doc,
            customers: [
                ...doc.customers,
                {
                    createdAt: Date.now(),
                    name: `Nome ${Math.random()}`,
                    address: 'endereço teste',
                    contract: 'SIMPLES',
                    trustees: [
                        {
                            role: 'ZELADOR',
                            info: 'Zé Lador',
                        },
                        {
                            role: 'SÍNDICA',
                            info: 'Sindy K.'
                        }
                    ],
                    inspections: []
                }
            ]
        })
    }

    return (
        <fieldset>
            <legend>Clientes</legend>
            <div>
                {doc.customers && doc.customers.map(
                    (customer: IDocCustomerDbRow, index) => (
                        <CustomerEditor key={index} customer={customer} />
                    )
                )}
            </div>
            <footer>
                <button onClick={handleOnClickAddCustomer}>Incluir cliente</button>
            </footer>
        </fieldset>
    );
}

export default CustomersEditor;