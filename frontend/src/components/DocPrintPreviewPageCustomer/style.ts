import { createStyles } from "@mantine/core";
import { cssVars } from "../../state/ThemeProvider/ThemeConf";

export const useStyles = createStyles((theme) => ({
    contractInfo: {
        marginTop: '0.5mm',
        display: 'flex',
        justifyContent: 'stretch'
    },
    reportCol: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    cell: {
        position: 'relative',
        display: 'flex',
        flexDirection: "column",
        gap: 2,
        border: cssVars.print.border.default,
        marginBottom: '-1px',
        marginRight: '-1px',
        borderRadius: '1.5mm',
        padding: '1mm',
        flexGrow: 1
    },
    cellTitle: {
        textTransform: 'uppercase',
        fontSize: '8pt',
        fontWeight: 'bold',
        lineHeight:'1em',
    },
    cellData: {
        lineHeight: '1.1rem',
        fontSize: '11pt'
    },
    ContractTypeData: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        flexGrow: 1,
    },
}));