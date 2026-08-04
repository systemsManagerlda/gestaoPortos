// components/MenuSuperior/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface MenuSuperiorProps {
  politicaAtiva?: string; // Tornamos opcional com valor padrão
}

function MenuSuperior({ politicaAtiva = 'privacidade-dados' }: MenuSuperiorProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [activeSection, setActiveSection] = useState(politicaAtiva);

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

  // Atualiza a seção ativa quando a prop mudar
  useEffect(() => {
    setActiveSection(politicaAtiva);
  }, [politicaAtiva]);

  const handlePoliticaClick = (politicaId: string) => {
    setActiveSection(politicaId);
    setMenuAberto(false);
    
    // Rolar para a seção correspondente
    const elemento = document.getElementById(politicaId);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Detecta a seção visível na rolagem
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.3
      }
    );

    // Observa todas as seções
    const sections = document.querySelectorAll('.secao[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

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
              className={`menu-link ${activeSection === politica.id ? 'ativo' : ''}`}
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