import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const appNavMenu = [
  { to: '/', title: 'Início' },
  { to: '/docs', title: 'Selecionar' },
  { to: '/docs/new', title: 'Criar' },
];

function App() {
  return (
    <>
      <header>
        Gerador de Formulários de Relatório de Inspeção
        <nav>
          {appNavMenu
            .map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                style={({ isActive }) => ({
                  textDecoration:'none',
                  padding:'0.5em',
                  borderBottom: isActive ? '1px solid #000' : 'none',
                })}
              >
                {item.title}
              </NavLink>
            ))
          }
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default App;
