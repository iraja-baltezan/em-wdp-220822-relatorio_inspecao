import { createStyles } from '@mantine/core';
import { cssVars } from '../../state/ThemeProvider/ThemeConf';

const HEADER_HEIGHT = 64;

export const useStyles = createStyles(theme => ({
    header: {
        // display:'flex',
        // gap: '1rem',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    logo: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem 1rem',
    },
    logoImg: {
        height: 40,
        width: 40,
        filter: theme.colorScheme === 'dark' ? 'invert(1)' : 'none',
    },
    logoTitle: {
        fontFamily: theme.headings.fontFamily,
        fontWeight: 'bold',
        lineHeight: '1em',
        fontSize: '0.8rem',
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'light' ? 9 : 1],

        [theme.fn.largerThan(364)]: {
            fontSize: '1rem',
        },

        [theme.fn.largerThan(767)]: {
            fontSize: '0.6rem',
        },

        [theme.fn.largerThan(800)]: {
            fontSize: '0.75rem',
        },

        [theme.fn.largerThan(860)]: {
            fontSize: '1rem',
        },
    },
    nav: {
        display: 'none',

        [theme.fn.largerThan(767)]: {
            display: 'flex',
            gap: 8,
            padding: '0 1rem',
            height: 64,
            alignItems: 'center',
        },
    },
    navLink: {
        textDecoration: 'none',
        padding: '0.8em 1rem',
        borderBottom: 'none',
        borderLeft: '1rem solid ' + theme.colors['gray'][theme.colorScheme === 'light' ? 1 : 9],
        color: theme.colors['dark'][theme.colorScheme === 'light' ? 9 : 0],
        display: 'flex',
        alignItems: 'center',

        [theme.fn.largerThan(767)]: {
            padding: '0.8rem',
            borderLeft: 'none',
            height: 64,
        },

        '&.-active': {
            borderLeft: '1rem solid ' + theme.colors['gray'][theme.colorScheme === 'light' ? 4 : 6],
            backgroundColor: theme.colors['gray'][theme.colorScheme === 'light' ? 2 : 8],
            color: theme.colors['dark'][theme.colorScheme === 'light' ? 9 : 0],

            [theme.fn.largerThan(767)]: {
                padding: '1rem 0.8rem',
                borderLeft: 'none',
                borderBottom: '1px solid ' + theme.colors[theme.primaryColor][theme.colorScheme === 'light' ? 5 : 5],
                backgroundColor: theme.colors['gray'][theme.colorScheme === 'light' ? 1 : 9],
            },
        },

        '&:hover': {
            backgroundColor: theme.colors['gray'][theme.colorScheme === 'light' ? 2 : 8],
            color: theme.colors['dark'][theme.colorScheme === 'light' ? 9 : 0],
        },
    },

    burger: {
        [theme.fn.largerThan(767)]: {
            display: 'none',
        },
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: cssVars.boxShadow.z12,



        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
    themeTogglerContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
    }
}))
