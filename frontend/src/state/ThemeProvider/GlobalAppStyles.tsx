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
                }
            })}
        />
    );
}

export default GlobalAppStyles;