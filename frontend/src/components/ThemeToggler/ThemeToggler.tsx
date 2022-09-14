import React from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { BsSun, BsMoon } from 'react-icons/bs';

function ThemeToggler() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon
            onClick={() => toggleColorScheme()}
            size='lg'
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                color: theme.colorScheme === 'dark' ? theme.colors.yellow[5] : theme.colors.blue[3],
              })}
        >
            {colorScheme === 'dark' ? <BsSun size={18} /> : <BsMoon size={18} />}
        </ActionIcon>
    );
}

export default ThemeToggler;