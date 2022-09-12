import React from 'react';
import { IDocCustomerDbRow } from '../../state/AppDb';
import { useStyles } from './style';

type TDocPrintPreviewPageCustomerProps = {
    customer: IDocCustomerDbRow
}

function DocPrintPreviewPageCustomer({ customer }: TDocPrintPreviewPageCustomerProps) {
    const { classes, cx } = useStyles();

    return (
        <section className={classes.contractInfo}>
            <div className={classes.reportCol}>
                <div className={classes.cell}>
                    <div className={classes.cellTitle}>
                        Cliente
                    </div>
                    <div className={classes.cellData}>
                        {customer.name}
                    </div>
                </div>
                <div className={classes.cell}>
                    <div className={classes.cellTitle}>
                        Endereço
                    </div>
                    <div className={classes.cellData}>
                        {customer.address}
                    </div>
                </div>
            </div>
            <div className={classes.reportCol}>
                {customer.trustees[0] && (
                    <div className={classes.cell}>
                        <div className={classes.cellTitle}>
                            {customer.trustees[0].role}
                        </div>
                        <div className={classes.cellData}>
                            {customer.trustees[0].info}
                        </div>
                    </div>
                )}
                {customer.trustees[1] && (
                    <div className={classes.cell}>
                        <div className={classes.cellTitle}>
                            {customer.trustees[1].role}
                        </div>
                        <div className={classes.cellData}>
                            {customer.trustees[1].info}
                        </div>
                    </div>
                )}
            </div>
            <div className={classes.reportCol}>
                <div className={classes.cell}>
                    <div className={classes.cellTitle}>
                        Contrato<br />Tipo
                    </div>
                    <div className={cx(classes.cellData, classes.ContractTypeData)}>
                        {customer.contract}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DocPrintPreviewPageCustomer;