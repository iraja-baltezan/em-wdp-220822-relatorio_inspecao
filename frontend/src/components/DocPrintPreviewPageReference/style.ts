import { createStyles } from "@mantine/core";
import { cssVars } from "../../state/ThemeProvider/ThemeConf";

export const useStyles = createStyles((theme) => ({
    references: {
        minWidth: '57mm'
    },
    reference: {
        border: cssVars.print.border.default,
        marginBottom: '-1px',
        marginRight: '-1px',
        borderRadius: '1.5mm',
        padding: '1mm'
    },
    content: {
        padding: '0 2mm',
        '& li::marker': {
            unicodeBidi: 'isolate',
            fontVariantNumeric: 'tabular-nums',
            textTransform: 'none',
            textIndent: '0px !important',
            textAlign: 'start',
            textAlignLast: 'start',
        },
        '& ol': {
            margin: 0,
            lineHeight: '1.15em',
        }
    },
    title2: {
        paddingTop: '1mm',
        fontWeight: "bold",
    },
    definitionList: {
        margin: 0,
        padding: '2mm 1mm 0',
        '& > dt': {
            paddingTop: 0,
            letterSpacing: '1px',
            lineHeight: '1em',
            fontWeight: 'bold',
        },
        '& > dd': {
            margin: '0',
            padding: '0 0 1mm 2mm',
            fontSize: '0.8em',
            letterSpacing: '0.05em'
        }

    }

}));