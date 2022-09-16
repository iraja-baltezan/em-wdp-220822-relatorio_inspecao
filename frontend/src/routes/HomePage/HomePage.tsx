import { Container } from '@mantine/core';
import React from 'react';
import DocCache from '../../components/DocCache';
import { useStyles } from './style';

function HomePage(props: React.PropsWithChildren) {
    const { classes } = useStyles();

    return (
        <Container fluid className={classes.Container}>
            <DocCache />
        </Container>
    );
}

export default HomePage;