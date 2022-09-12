import React from 'react';
import { useStyles } from './style';
import { usePrintStyles } from "../../state/ThemeProvider/ThemeConf";

function DocPrintPreviewPageFooter() {
    const { classes } = useStyles();
    const printStyles = usePrintStyles().classes;

    return (
        <>
            <section className={classes.notes}>
                <div className={printStyles.cellTitle}>Observações</div>
            </section>
            <section className={classes.visas}>
                <div className={classes.visa}>
                    <div className={printStyles.cellTitle}>Visto Inspetor</div>
                </div>
                <div className={classes.visa}>
                    <div className={printStyles.cellTitle}>Visto Condomínio</div>
                </div>
                <div className={classes.visaDate}>
                    <div className={printStyles.cellTitle}>Data</div>
                    <div className={classes.visaDateContent}>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </div>
            </section>
        </>
    );
}

export default DocPrintPreviewPageFooter;