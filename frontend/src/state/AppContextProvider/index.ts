import AppContextProvider, { AppContext } from './AppContextProvider';
import { getDateNow } from './utils'
import {
    ICompany,
    ICustomer,
    IIRForm,
    IAppContext,
    IDocContext,
    TContract,
    TInspection,
    TInspectionType,
    TTrustee,
} from './types';

export {
    AppContext,
    getDateNow,
    type ICompany,
    type ICustomer,
    type IIRForm,
    type IAppContext,
    type IDocContext,
    type TContract,
    type TInspection,
    type TInspectionType,
    type TTrustee,
};
export default AppContextProvider;
