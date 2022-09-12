import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { DocContext } from './state/DocContextProvider';
import { createStyles } from '@mantine/core';

const appNavMenu = [
  { to: '/', title: 'Início' },
  { to: '/docs/import', title: 'Importar' },
  { to: '/docs', title: 'Selecionar' },
  { to: '/docs/new', title: 'Criar' },
];

const useStyles = createStyles((theme) => ({
  nav: {
    display: 'flex',
    gap: 8,
  },
  navLink: {
    textDecoration: 'none',
    padding: '0.5em',
    borderBottom: 'none',
    '&.-active': {
      borderBottom: '1px solid #000',
    }
  }
}))

function App() {
  const { doc } = useContext(DocContext);
  const { classes } = useStyles();

  return (
    <>
      <header className='-do-not-print'>
        Gerador de Formulários de Relatório de Inspeção
        <nav className={classes.nav}>
          {appNavMenu
            .map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={state => classes.navLink + (state.isActive ? ' -active' : '')}
              >
                {item.title}
              </NavLink>
            ))
          }
          {doc.id && (
            <>
              <NavLink
                to={`/docs/print/${doc.id}`}
                className={state => classes.navLink + (state.isActive ? ' -active' : '')}
              >
                Imprimir
              </NavLink>
              <NavLink
                to={`/docs/export/${doc.id}`}
                className={state => classes.navLink + (state.isActive ? ' -active' : '')}
              >
                Exportar
              </NavLink>

            </>
          )}
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default App;
