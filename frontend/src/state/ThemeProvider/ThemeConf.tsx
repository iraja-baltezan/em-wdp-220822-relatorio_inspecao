import { ColorScheme, createStyles, MantineThemeOverride } from '@mantine/core';

export const cssVars = (
    () => ({
        print: {
            border: {
                default: '1px solid #000',
            },
        },
        boxShadow: {
            z00: '0px 0px  0px  0px  rgba(0, 0, 0, 0.2), 0px 0px  0px  0px rgba(0, 0, 0, 0.14), 0px 0px 0px  0px rgba(0, 0, 0, 0.12)',
            z01: '0px 2px  1px  -1px rgba(0, 0, 0, 0.2), 0px 1px  1px  0px rgba(0, 0, 0, 0.14), 0px 1px 3px  0px rgba(0, 0, 0, 0.12)',
            z02: '0px 3px  1px  -2px rgba(0, 0, 0, 0.2), 0px 2px  2px  0px rgba(0, 0, 0, 0.14), 0px 1px 5px  0px rgba(0, 0, 0, 0.12)',
            z03: '0px 3px  3px  -2px rgba(0, 0, 0, 0.2), 0px 3px  4px  0px rgba(0, 0, 0, 0.14), 0px 1px 8px  0px rgba(0, 0, 0, 0.12)',
            z04: '0px 2px  4px  -1px rgba(0, 0, 0, 0.2), 0px 4px  5px  0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
            z05: '0px 3px  5px  -1px rgba(0, 0, 0, 0.2), 0px 5px  8px  0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
            z06: '0px 3px  5px  -1px rgba(0, 0, 0, 0.2), 0px 6px  10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            z07: '0px 4px  5px  -2px rgba(0, 0, 0, 0.2), 0px 7px  10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12)',
            z08: '0px 5px  5px  -3px rgba(0, 0, 0, 0.2), 0px 8px  10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
            z09: '0px 5px  6px  -3px rgba(0, 0, 0, 0.2), 0px 9px  12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12)',
            z10: '0px 6px  6px  -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12)',
            z11: '0px 6px  7px  -4px rgba(0, 0, 0, 0.2), 0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12)',
            z12: '0px 7px  8px  -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)',
            z13: '0px 7px  8px  -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12)',
            z14: '0px 7px  9px  -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12)',
            z15: '0px 8px  9px  -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)',
            z16: '0px 8px  10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
            z17: '0px 8px  11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12)',
            z18: '0px 9px  11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12)',
            z19: '0px 9px  12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12)',
            z20: '0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12)',
            z21: '0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12)',
            z22: '0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12)',
            z23: '0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12)',
            z24: '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
        },
    })
)();

export const usePrintStyles = createStyles((theme) => ({
    cellTitle: {
        textTransform: 'uppercase',
        fontSize: '8pt',
        fontWeight: 'bold',
        lineHeight: '1em',
    },
}))

export const themeOverride = (colorScheme: ColorScheme): MantineThemeOverride => ({
    colorScheme,
    primaryShade: 7,
    // fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Oxygen, Ubuntu, Cantarell, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    fontFamily: 'Open Sans, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Oxygen, Ubuntu, Cantarell, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    fontFamilyMonospace: 'Azeret Mono, source-code-pro, Menlo, Monaco, Consolas, \'Courier New\', monospace',
    headings: {
        fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Oxygen, Ubuntu, Cantarell, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
        fontWeight: 'normal'
    },
    other: {
        shadows: {
            xs: '0px 3px  1px  -2px rgba(0, 0, 0, 0.2), 0px 2px  2px  0px rgba(0, 0, 0, 0.14), 0px 1px 5px  0px rgba(0, 0, 0, 0.12)',
            sm: '0px 3px  5px  -1px rgba(0, 0, 0, 0.2), 0px 6px  10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            md: '0px 7px  8px  -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)',
            lg: '0px 9px  11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12)',
            xl: '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
        },
    },
    components: {
        Button: {
            styles: (theme) => ({
                label: {
                    fontFamily: theme.headings.fontFamily,
                }
            })
        },
    }
})
