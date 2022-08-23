/**
 * Inspection Report Forms = IRForms
 */

import { IRFormsContext } from "./IRFormsContext"

export interface ICompany {
    logo?: string,
    name: string,
    address: string,
    contact: string
}

export type TTrustee = {
    role: string,
    info: string
}

export type TContract = 'SIMPLES' | 'GLOBAL'

export type TInspectionType = 'EQUIPMENT'|'NOTE'

export type TInspection = {
    id: number,
    type: TInspectionType,
    info: string
}

export interface ICustomer {
    id: number,
    name: string,
    address: string,
    trustee: TTrustee[],
    contract: TContract,
}

export interface IIRForm {
    id: number,
    customer: ICustomer,
    inspections: TInspection[]
}

export interface IIRFormsContext {
    id?: number;
    date?: string,
    company?: ICompany,
    // forms: IIRForm[],
    create: () => void;
    updateDate: (date: string) => void;

    // createForm: (form: IIRForm) => void;
    // updateForm: (formId: number) => void;
};

console.log(IRFormsContext)