import React, { FC, PropsWithChildren } from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import GlobalAppStyles from './GlobalAppStyles';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import {themeOverride} from './ThemeConf';
const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {

    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        defaultValue: 'light',
        key: 'mantine-color-scheme',
        getInitialValueInEffect: true
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+*', () => toggleColorScheme()]]);

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={themeOverride(colorScheme)}
                withGlobalStyles
                withNormalizeCSS
            >
                <GlobalAppStyles />
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default ThemeProvider;