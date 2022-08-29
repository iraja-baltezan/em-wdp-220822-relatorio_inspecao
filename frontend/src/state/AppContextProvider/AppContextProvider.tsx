import { createContext, FC, PropsWithChildren, useState } from 'react';
import { IAppContext, IDocContext } from '.';
import docContext from './DocContext';


const DEFAULT_APP_CONTEXT: IAppContext = {
    currentDoc: docContext
}

export const AppContext = createContext<IAppContext>(DEFAULT_APP_CONTEXT);

const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
    /** Current document */
    const [currentDoc] = useState<IDocContext>(docContext);

    return (
        <AppContext.Provider value={{
            currentDoc
        }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;