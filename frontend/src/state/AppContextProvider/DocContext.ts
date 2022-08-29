import { IDocContext } from './types';
import { getDateNow } from './utils';
import appDb, { IDocDbRow } from '../AppDb';

export const defaultDoc: IDocDbRow = {
    id: undefined,
    date: getDateNow(),
    companyId: undefined,
    toDelete: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
}


export class DocContext implements IDocContext {
    private _doc: IDocDbRow;
    private _processing: boolean | undefined;
    private _cached: boolean | undefined;
    private _saved: boolean | undefined;
    private _toDelete: boolean | undefined;

    get doc() { return this._doc; }
    get processing() { return this._processing; }
    get cached() { return this._cached; }
    get saved() { return this._saved; }
    get toDelete() { return this._toDelete; }

    set doc(value: IDocDbRow) { this._doc = { ...value }; }
    set processing(value: boolean | undefined) { this._processing = value; }
    set cached(value: boolean | undefined) { this._cached = value; }
    set saved(value: boolean | undefined) { this._saved = value; }
    set toDelete(value: boolean | undefined) { this._toDelete = value; }

    constructor(
        doc: IDocDbRow = { ...defaultDoc },
        processing: boolean | undefined = false,
        cached: boolean | undefined = false,
        saved: boolean | undefined = false,
    ) {
        this._doc = { ...doc }
        this._processing = processing;
        this._cached = cached;
        this._saved = saved;
    }

    reset(){
        this._doc = { ...defaultDoc };
        this._processing = false;
        this._cached = false;
        this._saved = false;
        this._toDelete = false;
    }

    /**
     * Saves the instance properties to db cache.
     * Returns 0 on fail or document ID on success.
     */
    async createCache(doc?: IDocDbRow) {
        let resultCode: number = 0;
        if (doc) this.doc = doc;
        this.processing = true;
        this._cached = false;
        this._saved = false;
        this.doc.createdAt = Date.now();
        this.doc.updatedAt = Date.now();
        try {
            const docId: number = await appDb.doc.add(this._doc) as number;
            this.doc.id = !!docId ? docId : undefined;
            this.cached = true;
            this.saved = false;
            console.log('Documento criado na base de dados deste navegador.\nID:', this.doc.id);
            resultCode = !!docId ? docId : 0;
        }
        catch (error) {
            console.log('Erro ao criar o documento na base de dados deste navegador.', error);
        }
        finally {
            this.processing = false;
        }
        return resultCode;
    };

    async readCache(id: number | undefined = this.doc.id) {
        let resultCode = 0;
        if (!id) {
            console.log('ID do documento é inválido.');
            return resultCode;
        }
        this.processing = true;
        try {
            let doc: IDocDbRow | undefined = await appDb.doc.get(id);
            this.doc = !!doc ? { ...doc } : { ...defaultDoc };
            resultCode = !!doc ? 1 : 0;
        }
        catch (error) {
            console.log('Erro ao ler documento do cache.', error);
        }
        finally {
            this.processing = false;
        }
        return resultCode;
    };

    async updateCache(doc: IDocDbRow = this.doc) {
        let resultCode = 0;

        if (!doc.id) {
            console.log('ID do documento é inválido.');
            return resultCode;
        }

        this.processing = true;
        try {
            doc = {
                ...doc,
                updatedAt: Date.now(),
            }
            resultCode = doc.id ? await appDb.doc.update(doc.id, doc) : 0;
            if (resultCode) {
                this.doc = { ...doc }
                this.cached = true;
                this.saved = false;
            }
        }
        catch (error) {
            console.log('Erro atualizar o documento no cache.', error);
        }
        finally {
            this.processing = false;
        }
        return resultCode;
    }

    async deleteCache(id: number | undefined = this.doc.id) {
        let resultCode = 0;

        if (!id) {
            console.log('ID do documento é inválido.');
            return resultCode;
        }
        this.processing = true;
        try {
            await appDb.doc.delete(id);
            this.doc = { ...defaultDoc }
            this.cached = false;
            this.saved = false;
            resultCode = 1;
        }
        catch (error) {
            console.log('Erro atualizar o documento no cache.', error);
        }
        finally {
            this.processing = false;
        }
        return resultCode;
    }
}

const docContext = new DocContext();

export default docContext;