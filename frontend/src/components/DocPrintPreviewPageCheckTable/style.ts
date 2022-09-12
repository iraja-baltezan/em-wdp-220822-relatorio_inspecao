import { createStyles } from "@mantine/core";
import { cssVars } from "../../state/ThemeProvider/ThemeConf";

export const useStyles = createStyles((theme) => ({
    checkTable: {
        border: cssVars.print.border.default,
        marginBottom: '-1px',
        marginRight: '-1px',
        borderRadius: '1.5mm',
        padding: 0,
        flexGrow: 1,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1.5fr repeat(3, 1fr)',
        // gridTemplateRows: '1fr 1fr repeat(13, 2fr)',
        gridTemplateRows: '1.6em 1.6em repeat(15, auto)',

        '& .th, & .td': {
            borderBottom: cssVars.print.border.default,
            borderRight: cssVars.print.border.default,
            marginBottom: '-1px',
            marginRight: '-1px',
            display: 'flex',
            alignItems: 'center',
            padding: 'calc(1mm + 1px) 1mm 1mm',
            lineHeight: '1em',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },

        '& .th': {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            justifyContent: 'center'
        },

        '& .td': {
            padding: 'calc(0.5mm + 1px) 1mm 0.5mm',
        },

        '& .-rs-2': {
            gridRowEnd: 'span 2'
        },

        '& .-cs-3': {
            gridColumnEnd: 'span 3'
        },

        '& .-cs-4': {
            gridColumnEnd: 'span 4'
        }
    }
}));