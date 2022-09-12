import React from 'react';
import { createStyles } from '@mantine/core';
import { cssVars, usePrintStyles } from '../../state/ThemeProvider/ThemeConf';
import { TDocHeader } from '../../state/DocContextProvider';
import { urlDataDecompress } from '../../state/utils';

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    companyLogoImg: {
        maxWidth: '5cm',
    },
    // ---------------------------------
    companyInfo: {
        padding: '0 2mm 2mm',
        display: 'flex',
        flexDirection: 'column',
        gap: '1mm',
        flexGrow: 1
    },
    companyInfoName: {
        fontWeight: 'bold'
    },
    companyInfoAddress: {
        fontSize: '0.85em'
    },
    companyInfoContact: {
        fontFamily: theme.fontFamilyMonospace,// 'var(--font-mono)'
    },
    // ---------------------------------
    reportId: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gridTemplateRows: 'auto 14mm auto',
        border: cssVars.print.border.default,
        borderRadius: '2mm'
    },
    reportIdCell: {
        display: 'flex',
        gap: '2mm',
        justifyContent: 'space-between',
        borderTop: cssVars.print.border.default,
        padding: '1mm'
    },
    reportIdCellData: {
        padding: '1mm'
    },
    reportIdTitle: {
        fontWeight: 'bold',
        fontSize: '1.25em',
        gridColumn: '1/3',
        gridRow: '1/2',
        padding: '1mm 2mm'
    },
    reportIdNumber: {
        gridColumn: '1/3',
        borderBottom: 'none'
    },
    reportIdNumberData: {
        fontSize: '2.5rem',
        display: 'flex',
        alignItems: 'center'
    },
    reportIdDateData: {
        fontSize: '1.25rem',
        padding: '1mm 1mm 0',
    },
    reportIdSheetData: {
        fontSize: '1.25rem'
    },
    reportIdDate: {
        borderRight: cssVars.print.border.default,
        padding: '1mm'
    },
}))

type TDocPrintPreviewPageHeaderProps = {
    pageNumber: number,
    docHeader: TDocHeader,
}

function DocPrintPreviewPageHeader({ pageNumber, docHeader }: TDocPrintPreviewPageHeaderProps) {
    const { classes, cx } = useStyles();
    const printClasses = usePrintStyles().classes;

    return (
        <header className={classes.header} >
            <div>
                <img src={urlDataDecompress(docHeader.company.logo)} alt={docHeader.company.name} className={classes.companyLogoImg} />
            </div>
            <div className={classes.companyInfo}>
                <div className={classes.companyInfoName}>
                    {docHeader.company.name}
                </div>
                <div className={classes.companyInfoAddress}>
                    {docHeader.company.address}
                </div>
                <div className={classes.companyInfoContact}>
                    {docHeader.company.contact}
                </div>
            </div>
            <div className={classes.reportId}>
                <div className={classes.reportIdTitle}>
                    RELATÓRIO DE INSPEÇÃO
                </div>
                <div className={cx(classes.reportIdCell, classes.reportIdNumber)}>
                    <div className={printClasses.cellTitle}>
                        Nº
                    </div>
                    <div className={cx(classes.reportIdCellData, classes.reportIdNumberData)}>

                    </div>
                </div>
                <div className={cx(classes.reportIdCell, classes.reportIdDate)}>
                    <div className={printClasses.cellTitle}>
                        DATA
                    </div>
                    <div className={classes.reportIdDateData}>
                        {docHeader.date}
                    </div>
                </div>
                <div className={classes.reportIdCell}>
                    <div className={printClasses.cellTitle}>
                        FOLHA
                    </div>
                    <div className={cx(classes.reportIdCellData, classes.reportIdDateData)}>
                        {pageNumber}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default DocPrintPreviewPageHeader;