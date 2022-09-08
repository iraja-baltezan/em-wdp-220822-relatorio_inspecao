import React, { ChangeEvent, MouseEvent, useContext } from 'react';
import { IDocCustomerDbRow, IDocInspectionDbRow, TDocContract, IDocTrusteeDbRow } from '../../state/AppDb';
import { DocContext } from '../../state/DocContextProvider';
import InspectionsEditor from '../InspectionsEditor';

type TCustomerEditorProps = {
    customer: IDocCustomerDbRow,
}

function CustomerEditor({ customer }: TCustomerEditorProps) {
    const { doc, setDoc } = useContext(DocContext);


    const handleOnClickDelCustomer = (event: MouseEvent<HTMLButtonElement>) => {
        if (!window.confirm('Excluir cliente?')) return;
        setDoc({
            ...doc,
            customers: doc.customers.filter(
                (currentCustomer) => (
                    currentCustomer.createdAt !== customer.createdAt
                )
            )
        })
    }

    const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const newCustomers = doc.customers.map(prevCustomer => {
            if (prevCustomer.createdAt === customer.createdAt)
                return {
                    ...customer,
                    name: event.currentTarget.value,
                }
            else
                return prevCustomer;
        });
        setDoc({
            ...doc,
            customers: newCustomers,
        });
    }

    const handleOnChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        const newCustomers = doc.customers.map(prevCustomer => {
            if (prevCustomer.createdAt === customer.createdAt)
                return {
                    ...customer,
                    address: event.currentTarget.value,
                }
            else
                return prevCustomer;
        });
        setDoc({
            ...doc,
            customers: newCustomers,
        });
    }

    const handleOnChangeContract = (event: ChangeEvent<HTMLSelectElement>) => {
        const newCustomers = doc.customers.map(prevCustomer => {
            if (prevCustomer.createdAt === customer.createdAt)
                return {
                    ...customer,
                    contract: event.currentTarget.value as TDocContract,
                }
            else
                return prevCustomer;
        });
        setDoc({
            ...doc,
            customers: newCustomers,
        });
    }

    const handleOnChangeTrustee = (event: ChangeEvent<HTMLInputElement>) => {
        const id = event.currentTarget.dataset.id;
        const value = event.currentTarget.value;
        const oldTrustees = customer.trustees;
        const newTrustees: IDocTrusteeDbRow[] =
            [
                {
                    role: id === 'role0' ? value : oldTrustees ? oldTrustees?.[0] ? oldTrustees[0]?.role ? oldTrustees[0].role : '' : '' : '',
                    info: id === 'info0' ? value : oldTrustees ? oldTrustees?.[0] ? oldTrustees[0]?.info ? oldTrustees[0].info : '' : '' : '',
                },
                {
                    role: id === 'role1' ? value : oldTrustees ? oldTrustees?.[1] ? oldTrustees[1]?.role ? oldTrustees[1].role : '' : '' : '',
                    info: id === 'info1' ? value : oldTrustees ? oldTrustees?.[1] ? oldTrustees[1]?.info ? oldTrustees[1].info : '' : '' : '',
                },
            ]
        const newCustomers = doc.customers.map(prevCustomer => {
            if (prevCustomer.createdAt === customer.createdAt)
                return {
                    ...customer,
                    trustees: newTrustees,
                }
            else
                return prevCustomer;
        });
        setDoc({
            ...doc,
            customers: newCustomers,
        });
    }

    const handleOnChangeInspections = (value: IDocInspectionDbRow[]) => {
        const newCustomers = doc.customers.map(prevCustomer => {
            if (prevCustomer.createdAt === customer.createdAt)
                return {
                    ...customer,
                    inspections: value,
                }
            else
                return prevCustomer;
        });
        setDoc({
            ...doc,
            customers: newCustomers,
        });
    }

    return (
        <fieldset>
            <div>
                <button onClick={handleOnClickDelCustomer}>Excluir cliente</button>
            </div>

            <label>
                <div>Nome</div>
                <input type="text" value={customer.name} onChange={handleOnChangeName} />
            </label>
            <label>
                <div>Endereço</div>
                <input type="text" value={customer.address} onChange={handleOnChangeAddress} />
            </label>
            <label>
                <div>Contrato</div>
                <select value={customer.contract} onChange={handleOnChangeContract}>
                    {['GLOBAL', 'SIMPLES'].map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </label>
            <fieldset>
                <legend>Responsável 1</legend>
                <label>
                    <div>Título</div>
                    <input type="text" value={customer?.trustees?.[0]?.role ? customer.trustees[0].role : ''} data-id='role0' onChange={handleOnChangeTrustee} />
                </label>
                <label>
                    <div>Nome</div>
                    <input type="text" value={customer?.trustees?.[0]?.info ? customer.trustees[0].info : ''} data-id='info0' onChange={handleOnChangeTrustee} />
                </label>
            </fieldset>
            <fieldset>
                <legend>Responsável 2</legend>
                <label>
                    <div>Título</div>
                    <input type="text" value={customer?.trustees?.[1]?.role ? customer.trustees[1].role : ''} data-id='role1' onChange={handleOnChangeTrustee} />
                </label>
                <label>
                    <div>Nome</div>
                    <input type="text" value={customer?.trustees?.[1]?.info ? customer.trustees[1].info : ''} data-id='info1' onChange={handleOnChangeTrustee} />
                </label>
            </fieldset>
            <InspectionsEditor value={customer.inspections} onChange={handleOnChangeInspections} />
        </fieldset>
    );
}

export default CustomerEditor;