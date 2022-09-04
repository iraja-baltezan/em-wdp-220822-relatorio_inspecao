import Dexie, { Table } from 'dexie';

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
}

export interface IDocCompanyDbRow {
    name: string;
    address: string;
    contact: string;
    logo: string;
}

export class AppDb extends Dexie {
    config!: Table<IConfigDbRow>;
    doc!: Table<IDocDbRow>;

    constructor() {
        super('AppDb');
        this.version(1).stores({
            config: 'name, type, value',
            doc: '++id, date, createdAt, updatedAt',
        });
    }
}

export const appDb = new AppDb();
