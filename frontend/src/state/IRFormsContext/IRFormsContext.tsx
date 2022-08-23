import React, { createContext, useCallback, useState } from 'react';
import { IIRFormsContext, ICompany } from '.';

export const IRFormsContext = createContext<IIRFormsContext | null>(null);

const IRFormsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [id, setId] = useState<number | undefined>(undefined);
    const [date, setDate] = useState<string | undefined>(undefined);
    const [company, setCompany] = useState<ICompany | undefined>(undefined);

    const getNewDateNow = () => (new Date()).toLocaleDateString();

    const createForms = useCallback(
        () => {
            setId(id ? id + 1 : 1);
            setDate(getNewDateNow());
        }, [id,setId, setDate]
    );


    const updateFormsDate = useCallback(

        (newDate?: string) => {
            setDate(newDate ? newDate : getNewDateNow())
        }, [setDate]
    );

    return (
        <IRFormsContext.Provider value={{
            id,
            date,
            company,
            create: createForms,
            updateDate: updateFormsDate,
        }}
        >
            {children}
        </IRFormsContext.Provider>
    )
}

export default IRFormsContextProvider;