import React from 'react';
import { IDocCustomerDbRow } from '../../state/AppDb';
import { useStyles } from './style';
import DocPrintPreviewPageCheckTable from '../DocPrintPreviewPageCheckTable';
import DocPrintPreviewPageReference from '../DocPrintPreviewPageReference';
type TDocPrintPreviewPageInspectionProps = {
    customer: IDocCustomerDbRow,
}
function DocPrintPreviewPageInspection({ customer }: TDocPrintPreviewPageInspectionProps) {
    const { classes } = useStyles();
    return (
        <section className={classes.inspectionInfo}>
            <DocPrintPreviewPageCheckTable customer={customer} />
            <DocPrintPreviewPageReference />
        </section>
    );
}

export default DocPrintPreviewPageInspection;