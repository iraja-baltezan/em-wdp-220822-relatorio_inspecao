import Dexie, { Table } from 'dexie';

export interface IConfigDbRow {
    name: string;
    type: 'STRING' | 'NUMBER';
    value: string | number;
}

export interface IDocDbRow {
    id?: number;
    date?: string;
    companyId?: string;
    toDelete?: boolean;
    createdAt?: number;
    updatedAt?: number;
}

export interface IDocCompanyDbRow {
    name: string;
    address?: string;
    contact?: string;
    logo?: string;
    toDelete?: boolean;
    createdAt?: number;
    updatedAt?: number;
}

export class AppDb extends Dexie {
    config!: Table<IConfigDbRow>;
    doc!: Table<IDocDbRow>;
    docCompany!: Table<IDocCompanyDbRow>;

    constructor() {
        super('AppDb');
        this.version(1).stores({
            config: 'name, type, value',
            doc: '++id, date, companyId',
            docCompany: '[createdAt+name]',
        });
    }
}

export const appDb = new AppDb();
