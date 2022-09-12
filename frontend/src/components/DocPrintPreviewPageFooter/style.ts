import { createStyles } from "@mantine/core";
import { cssVars } from "../../state/ThemeProvider/ThemeConf";

export const useStyles = createStyles((theme) => ({
    notes: {
        border: cssVars.print.border.default,
        borderRadius: '1.5mm',
        flexGrow: 1,
        marginBottom: '-1px',
        padding: '1mm'
    },
    visas: {
        border: cssVars.print.border.default,
        borderRadius: '1.5mm',
        display: 'flex'
    },
    visa: {
        padding: '1mm',
        flexGrow: 1,
        borderRight: cssVars.print.border.default,
    },
    visaDate: {
        padding: '1mm'
    },
    visaDateContent: {
        fontSize: '12pt',
        fontFamily: theme.fontFamilyMonospace
    }
}));