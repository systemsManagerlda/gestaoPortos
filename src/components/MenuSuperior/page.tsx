"use client"
import React, { useState } from 'react';

// Defina a interface para as props
interface MenuSuperiorProps {
  politicaAtiva: string;
  setPoliticaAtiva: (politicaId: string) => void;
}

function MenuSuperior({ politicaAtiva, setPoliticaAtiva }: MenuSuperiorProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  const politicas = [
    {
      id: 'privacidade-dados',
      titulo: 'PRIVACIDADE E DADOS',
      icon: '🛡️'
    },
    {
      id: 'acesso-permissoes',
      titulo: 'ACESSO E PERMISSÕES',
      icon: '🔐'
    },
    {
      id: 'resposta-incidentes',
      titulo: 'RESPOSTA A INCIDENTES',
      icon: '🚨'
    },
    {
      id: 'retencao-eliminacao',
      titulo: 'RETENÇÃO E ELIMINAÇÃO',
      icon: '🗑️'
    },
    {
      id: 'seguranca-informacao',
      titulo: 'SEGURANÇA DA INFORMAÇÃO',
      icon: '🔒'
    },
    {
      id: 'uso-aceitavel',
      titulo: 'USO ACEITÁVEL',
      icon: '📋'
    }
  ];

  const handlePoliticaClick = (politicaId: string) => {
    setPoliticaAtiva(politicaId);
    setMenuAberto(false);
  };

  return (
    <nav className="menu-superior">
      <div className="menu-container">
        <div className="menu-header">
          <div className="logo">
            <div className="logo-icon">📄</div>
            <div className="logo-text">
              <h2>Políticas Corporativas</h2>
              <p>Mega Centro Logística</p>
            </div>
          </div>
          
          <button 
            className={`menu-hamburguer ${menuAberto ? 'ativo' : ''}`}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`menu-links ${menuAberto ? 'aberto' : ''}`}>
          {politicas.map((politica) => (
            <button
              key={politica.id}
              className={`menu-link ${politicaAtiva === politica.id ? 'ativo' : ''}`}
              onClick={() => handlePoliticaClick(politica.id)}
            >
              <span className="menu-icon">{politica.icon}</span>
              <span className="menu-text">{politica.titulo}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default MenuSuperior;