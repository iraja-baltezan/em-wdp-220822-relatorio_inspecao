import { createStyles } from '@mantine/core';
// import { cssVars } from '../../state/ThemeProvider/ThemeConf';

export const useStyles = createStyles(theme => ({
    TabsOptions: {
        display: 'inline-flex',
        gap: 4,
        marginLeft: 'auto',
        alignItems: 'center',
        padding:'2px 0 8px'
    },
    TabPanel: {
        paddingTop: '1rem!important',
        paddingBottom: '1rem',
    },
    TabTabBadge: {
        padding: '8px',
        lineHeight: '1.25em',
        height: '1em',
        fontWeight: 'normal',
    },
    Grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
    }
}))