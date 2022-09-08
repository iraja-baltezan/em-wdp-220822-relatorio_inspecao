import Dexie, { Table } from 'dexie';
import { IConfigDbRow, IDocDbRow } from './types';

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
