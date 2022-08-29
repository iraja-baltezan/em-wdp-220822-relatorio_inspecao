/**
 * Inspection Report Forms = IRForms
 */

import { IDocDbRow } from "../AppDb"


export interface ICompany {
    logo?: string;
    name: string;
    address: string;
    contact: string;
}

export type TTrustee = {
    role: string;
    info: string
}

export type TContract = 'SIMPLES' | 'GLOBAL'

export type TInspectionType = 'EQUIPMENT' | 'NOTE'

export type TInspection = {
    id: number;
    type: TInspectionType;
    info: string
}

export interface ICustomer {
    id: number;
    name: string;
    address: string;
    trustee: TTrustee[];
    contract: TContract;
}

export interface IIRForm {
    id: number;
    customer: ICustomer;
    inspections: TInspection[]
}

export interface IDocContext {
    doc: IDocDbRow;

    /** is caching, saving, printing, etc. */
    processing?: boolean;

    /** Saved to IndexedDb */
    cached?: boolean;

    /** Saved to external file or db service */
    saved?: boolean;

    reset: () => void;
    createCache: (doc?: IDocDbRow) => Promise<number>;
    readCache: (id: number | undefined) =>  Promise<number>;
    updateCache: (doc?: IDocDbRow) =>  Promise<number>;
    deleteCache: (id: number | undefined) =>  Promise<number>;
}

export interface IAppContext {
    currentDoc: IDocContext;
};
