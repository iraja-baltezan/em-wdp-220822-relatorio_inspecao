import { createStyles } from '@mantine/core';
import { cssVars } from '../../state/ThemeProvider/ThemeConf';

export const useStyles = createStyles(theme => ({
    Card: {
        width: 240,
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: cssVars.boxShadow.z04,
    },
    SectionImg: {
        borderBottom: '1px solid ' + theme.colors['gray'][theme.colorScheme === 'light' ? 3 : 8],
    },
    SectionInfo: {
        flexGrow: 1,
        paddingTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,

        '& > .info-row': {
            lineHeight: '1em',
            fontSize: '0.85rem',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,

            '&.-compact': {
                fontSize: '0.75rem',
                flexDirection: 'row',
                gap: '1em',
                justifyContent: 'space-between'
            },

            '& > .type': {
                fontWeight: 'normal',
                textTransform: 'uppercase',
                color: theme.colors['dark'][theme.colorScheme === 'light' ? 3 : 2],
            },

            '& > .value': {
                fontSize: '1.25em',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            },

            '&.-compact > .value': {
                fontSize: '1em',
            },
        },

    },
    SectionActions: {
        display: 'flex',
        gap: 8,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
}))