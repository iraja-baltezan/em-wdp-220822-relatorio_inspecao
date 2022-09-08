import { IDocDbRow, IDocInspectionDbRow } from '../AppDb';

export interface IIndexedInspection {
    id: number,
    value: IDocInspectionDbRow,
}

export type TActionStatusType = 'IDLE' | 'PENDING' | 'OK' | 'OK_CREATED' | 'FAIL'

export type TActionStatus = {
    type: TActionStatusType;
    message?: string;
    data?: number | string | undefined;
}

export interface IDocContext {
    doc: IDocDbRow;
    setDoc: (newDoc: IDocDbRow) => void;

    actionStatus: TActionStatus;
    setActionStatus: (newStatus: TActionStatus) => void;

    /** Saved to IndexedDb */
    cached: boolean;
    setCached: (newState: boolean) => void;

    /** Saved to external file or db service */
    saved: boolean;
    setSaved: (newState: boolean) => void;

    reset: () => void;
    createCache: (newDoc?: IDocDbRow | undefined) => void;
    readCache: (id: number | undefined) => void;
    updateCache: (doc?: IDocDbRow) => void;
    deleteCache: (id: number | undefined) => void;
}
