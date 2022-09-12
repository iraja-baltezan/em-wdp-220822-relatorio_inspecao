import React from 'react';
import { IDocCustomerDbRow } from '../../state/AppDb';
import { TDocHeader } from '../../state/DocContextProvider';
import DocPrintPreviewPageHeader from '../DocPrintPreviewPageHeader';
import DocPrintPreviewPageCustomer from '../DocPrintPreviewPageCustomer';
import DocPrintPreviewPageInspection from '../DocPrintPreviewPageInspection';
import DocPrintPreviewPageFooter from '../DocPrintPreviewPageFooter';
import { useStyles } from './style';

type TDocPrintPreviewPageProps = {
    pageNumber: number,
    docHeader: TDocHeader,
    customer: IDocCustomerDbRow
}

function DocPrintPreviewPage({ pageNumber, docHeader, customer }: TDocPrintPreviewPageProps) {
    const { classes } = useStyles();

    // console.log(docHeader)

    return (
        <article className={classes.printPage} >
            <DocPrintPreviewPageHeader pageNumber={pageNumber} docHeader={docHeader}/>
            <DocPrintPreviewPageCustomer customer={customer} />
            <DocPrintPreviewPageInspection customer={customer}/>
            <DocPrintPreviewPageFooter />
        </article >
    );
}

export default DocPrintPreviewPage;