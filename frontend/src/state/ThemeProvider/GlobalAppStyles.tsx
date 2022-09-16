import React from 'react';
import { Global } from '@mantine/core';

function GlobalAppStyles() {
    return (
        <Global
            styles={(theme) => ({
                '@media print': {
                    '.-do-not-print': {
                        display: 'none!important',
                    }
                },
                'body':{
                    backgroundColor: theme.colors['gray'][theme.colorScheme==='light'?1:9]
                },
                '#root': {
                    display:'flex',
                    flexDirection:'column',
                    minHeight: '100vh',
                }
            })}
        />
    );
}

export default GlobalAppStyles;