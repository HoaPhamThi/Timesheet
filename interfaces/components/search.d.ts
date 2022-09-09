import { RefObject } from 'react';

interface IWorksheetSearchComponentProps extends IBaseCompProps {
    handleGetValue?: (value: string) => void;
    sort?: string;
    handleSearch?: () => void;
    typeSearch?: any;
    handleGetTypeSearch?: (value: string[]) => void;
    queryStart?: any;
    queryEnd?: any;
    handleStartDate?: (value: any) => void;
    handleEndDate?: (value: any) => void;
    resetValue?: () => void;
    validateStart?: RefObject;
    validateEnd?: RefObject;
    list_month?: string;
    handleSelectListMont?: (value: string) => void;
}

interface IWorksheetSearchComponent<P = {}> extends IBaseComp<P> {}
