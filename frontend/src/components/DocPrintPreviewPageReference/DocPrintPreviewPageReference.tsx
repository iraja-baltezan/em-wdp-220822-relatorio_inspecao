import React from 'react';
import { useStyles } from './style';
import { usePrintStyles } from '../../state/ThemeProvider/ThemeConf';

function DocPrintPreviewPageReference() {
    const { classes } = useStyles();
    const printClasses = usePrintStyles().classes;

    return (
        <section className={classes.references}>
            <div className={classes.reference}>
                <div className={printClasses.cellTitle}>
                    Código de Defeitos
                </div>
                <div className={classes.content}>
                    <div className={classes.title2}>BOMBAS</div>
                    <ol>
                        <li>MOTOR</li>
                        <li>ROLAMENTOS</li>
                        <li>SELO MEC./GAXETAS</li>
                        <li>FALTA PRESSÃO</li>
                        <li>JUNTA</li>
                    </ol>

                    <div className={classes.title2}>COMANDO</div>
                    <ol start={6}>
                        <li>CONTRACTORA</li>
                        <li>RELÉ</li>
                        <li>FUZÍVEL</li>
                        <li>DISJUNTOR</li>
                        <li>AUTOM. DE NÍVEL</li>
                        <li>FIAÇÃO</li>
                    </ol>

                    <div className={classes.title2}>TUBULAÇÃO</div>
                    <ol start={12}>
                        <li>REGISTRO</li>
                        <li>VALV. DE RET.</li>
                        <li>TORNEIRA BOIA</li>
                        <li>VAZAMENTO</li>
                        <li>TUBULAÇÃO</li>
                        <li>___________________</li>
                    </ol>
                </div>
            </div>
            <div className={classes.reference}>
                <div className={printClasses.cellTitle}>Código de Equipamentos</div>
                <dl className={classes.definitionList}>
                    <dt>BAP</dt><dd>BOMBA DE ÁGUA POTÁVEL</dd>
                    <dt>BEP</dt><dd>BOMBA DE ESGOTO PLUVIAL</dd>
                    <dt>BCI</dt><dd>BOMBA DE COMBATE A INCENDIO</dd>
                    <dt>BEC</dt><dd>BOMBA DE ESGOTO CLOACAL</dd>
                    <dt>EDC</dt><dd>EXAUSTOR DE COLUNA</dd>
                    <dt>BPF</dt><dd>BOMBA COM PRÉ-FILTRO</dd>
                    <dt>BAC</dt><dd>BOMBA DO AR CONDICIONADO</dd>
                </dl>
            </div>
        </section>
    );
}

export default DocPrintPreviewPageReference;