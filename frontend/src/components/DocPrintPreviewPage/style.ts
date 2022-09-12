import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    printPage: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#fff',
        border: '1px solid ' + theme.colors['gray'][4],//hsl(220deg 2% 69%)',
        padding: '1cm',
        width: '210mm',
        height: '297mm',
        margin: '1rem auto',
        overflow: 'hidden',
        pageBreakAfter: 'always',
        pageBreakInside: 'avoid',
        fontSize: '10pt',
        '@media print': {
            '&': {
                border: 'none',
                margin: 0,
            }
        }
    },
}))
