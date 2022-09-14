import { Burger, Container, Header, Paper, Transition } from '@mantine/core';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DocContext } from '../../state/DocContextProvider';
import { useStyles } from './style';
import ThemeToggler from '../ThemeToggler';
import { useDisclosure } from '@mantine/hooks';
import logoPicture from '../../assets/img/logo.svg';


function AppHeader() {
    const { doc } = useContext(DocContext);
    const { classes, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);

    const appNavLinks = [
        { to: '/', title: 'Início' },
        { to: '/docs/import', title: 'Importar' },
        // { to: '/docs', title: 'Selecionar' },
        { to: '/docs/new', title: 'Criar' },
        ...(id => id ? [{ to: `/docs/print/${id}`, title: 'Imprimir' }, { to: `/docs/export/${id}`, title: 'Exportar' }] : [])(doc.id)
    ];

    const links = appNavLinks.map((item, index) => (
        <NavLink
            key={index}
            to={item.to}
            end
            className={({ isActive }) => cx(classes.navLink, (isActive ? ' -active' : ''))}
        >
            {item.title}
        </NavLink>
    ))

    return (
        <Header
            height={64}
            className={cx(classes.header, '-do-not-print')}
        >
            <Container className={classes.container} size={'xl'}>
                <div className={classes.logo}>
                    <img
                        className={classes.logoImg}
                        src={logoPicture}
                        alt="Gerenciador de Formulários de Relatório de Inspeção"
                    />
                    <div className={classes.logoTitle}>
                        Formulários de Relatório de Inspeção
                    </div>
                </div>

                <nav className={classes.nav}>
                    {links}
                    <ThemeToggler />
                </nav>

                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size='sm'
                />

                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {links}
                            <div className={classes.themeTogglerContainer}>
                                <ThemeToggler />
                            </div>
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}

export default AppHeader;