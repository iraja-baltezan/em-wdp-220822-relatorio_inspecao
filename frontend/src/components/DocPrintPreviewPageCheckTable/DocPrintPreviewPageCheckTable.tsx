import React from 'react';
import { IDocCustomerDbRow, IDocInspectionDbRow } from '../../state/AppDb';
import { useStyles } from './style';

type TDocPrintPreviewPageCheckTableProps = {
    customer: IDocCustomerDbRow,
}
function DocPrintPreviewPageCheckTable({ customer }: TDocPrintPreviewPageCheckTableProps) {
    const { classes } = useStyles();

    return (
        <div className={classes.checkTable}>
            <div className="th -rs-2">Equipamento</div><div className="th -cs-3">Situação</div>
            <div className="th">Bombas</div><div className="th">Comando</div><div className="th">Tubulação</div>

            {customer.inspections &&
                (customer.inspections.length > 0) &&
                customer.inspections.map(
                    (inspection: IDocInspectionDbRow, index) => {
                        if (inspection.type === 'EQUIPAMENTO')
                            return (
                                <React.Fragment key={index}>
                                    <div className="td">{inspection.info}</div>
                                    <div className="td"></div>
                                    <div className="td"></div>
                                    <div className="td"></div>
                                </React.Fragment>
                            )
                        else
                            return (
                                <React.Fragment key={index}>
                                    <div className="td -cs-4">{inspection.info}</div>
                                </React.Fragment>
                            )
                    }
                )
            }
        </div>
    );
}

export default DocPrintPreviewPageCheckTable;