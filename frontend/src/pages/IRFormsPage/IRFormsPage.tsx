import React, { useContext, useEffect } from 'react';
import { IIRFormsContext, IRFormsContext } from '../../state/IRFormsContext';
import IRForms from '../../components/IRForms';
import IRFormsLoader from '../../components/IRFormsLoader';

function IRFormsPage(props: React.PropsWithChildren) {
    const { id } = useContext(IRFormsContext) as IIRFormsContext;

    if (id && id > 0)
        return (<IRForms />)
    else
        return (<IRFormsLoader />)
}

export default IRFormsPage;