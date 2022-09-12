import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { DocContext } from './state/DocContextProvider';

const appNavMenu = [
  { to: '/', title: 'Início' },
  { to: '/docs', title: 'Selecionar' },
  { to: '/docs/new', title: 'Criar' },
];

function App() {
  const { doc } = useContext(DocContext);

  return (
    <>
      <header className='-do-not-print'>
        Gerador de Formulários de Relatório de Inspeção
        <nav
          style={{
            display: 'flex',
            gap: 8,
          }}
        >
          {appNavMenu
            .map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  padding: '0.5em',
                  borderBottom: isActive ? '1px solid #000' : 'none',
                })}
              >
                {item.title}
              </NavLink>
            ))
          }
          {doc.id && (
            <NavLink
              to={`/docs/print/${doc.id}`}
              style={({ isActive }) => ({
                textDecoration: 'none',
                padding: '0.5em',
                borderBottom: isActive ? '1px solid #000' : 'none',
              })}
            >
              Imprimir
            </NavLink>
          )}
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default App;
