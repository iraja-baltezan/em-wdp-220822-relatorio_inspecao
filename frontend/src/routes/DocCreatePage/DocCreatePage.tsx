import React, { useContext, useEffect, useState } from 'react';
import { IAppContext, AppContext } from '../../state/AppContextProvider';
import DocEditor from '../../components/DocEditor';

function DocCreatePage() {
    // const { id } = useContext(AppContext) as IAppContext;
    return (
        <main>
        Criar documento

        <DocEditor />
        </main>
    )
}

export default DocCreatePage;