export interface IConfigDbRow {
    name: string;
    type: 'STRING' | 'NUMBER';
    value: string | number;
}

export interface IDocDbRow {
    id?: number;
    date: string;
    toDelete: boolean;
    createdAt: number;
    updatedAt: number;
    company: IDocCompanyDbRow;
    customers: IDocCustomerDbRow[];
}
export interface IDocCompanyDbRow {
    name: string;
    address: string;
    contact: string;
    logo: string;
}

export type IDocTrusteeDbRow = {
    role: string;
    info: string
}

export type TDocContract = 'SIMPLES' | 'GLOBAL'

export interface IDocCustomerDbRow {
    createdAt: number,
    name: string;
    address: string;
    contract: TDocContract;
    trustees: IDocTrusteeDbRow[];
    inspections: IDocInspectionDbRow[];
}

export type TDocInspectionType = 'EQUIPAMENTO' | 'NOTA'

export interface IDocInspectionDbRow {
    type: TDocInspectionType,
    info: string,
}
