/* eslint-disable @typescript-eslint/no-explicit-any */
// components/NoticiaDashboard.tsx
import React from 'react';
import { Noticia } from '@/types/noticia';

interface NoticiaDashboardProps {
  estatisticas: any;
  noticiasUrgentes: Noticia[];
  noticiasRecentes: Noticia[];
  onViewNoticia: (id: string) => void;
  onCreateNoticia: () => void;
}

export const NoticiaDashboard: React.FC<NoticiaDashboardProps> = ({
  estatisticas,
  noticiasUrgentes,
  noticiasRecentes,
  onViewNoticia,
  onCreateNoticia
}) => {
  // Calcular totais
  const totalUrgentes = estatisticas?.estatisticas?.reduce((total: number, stat: any) => total + (stat.urgentes || 0), 0) || 0;
  const totalVisualizacoes = estatisticas?.estatisticas?.reduce((total: number, stat: any) => total + (stat.totalVisualizacoes || 0), 0) || 0;
  const totalNoticias = estatisticas?.totais?.geral || 0;
  const totalPublicadas = estatisticas?.totais?.publicadas || 0;

  return (
    <div className="space-y-8">
      {/* Header do Dashboard */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Notícias</h1>
          <p className="text-gray-600 mt-2">Visão geral das notícias e métricas importantes</p>
        </div>
        <button
          onClick={onCreateNoticia}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 font-semibold"
        >
          <span className="text-lg">+</span>
          <span>Nova Notícia</span>
        </button>
      </div>

      {/* Estatísticas em Destaque */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total de Notícias */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Total de Notícias</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalNoticias}</p>
              <p className="text-blue-600 text-sm mt-1 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Todas as notícias
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
              <span className="text-xl">📰</span>
            </div>
          </div>
        </div>

        {/* Notícias Publicadas */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-semibold uppercase tracking-wide">Publicadas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalPublicadas}</p>
              <p className="text-green-600 text-sm mt-1 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {Math.round((totalPublicadas / totalNoticias) * 100) || 0}% do total
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
              <span className="text-xl">✅</span>
            </div>
          </div>
        </div>

        {/* Notícias Urgentes */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-semibold uppercase tracking-wide">Urgentes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalUrgentes}</p>
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Prioridade máxima
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white">
              <span className="text-xl">🚨</span>
            </div>
          </div>
        </div>

        {/* Total de Visualizações */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Visualizações</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalVisualizacoes.toLocaleString('pt-BR')}</p>
              <p className="text-purple-600 text-sm mt-1 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Engajamento total
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white">
              <span className="text-xl">👁️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Notícias Urgentes */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🚨</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Notícias Urgentes</h2>
                  <p className="text-red-100 text-sm">Prioridade máxima - atenção necessária</p>
                </div>
              </div>
              <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {noticiasUrgentes.length}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {noticiasUrgentes.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-gray-500 font-medium">Nenhuma notícia urgente</p>
                <p className="text-gray-400 text-sm mt-1">Todas as notícias estão sob controle</p>
              </div>
            ) : (
              <div className="space-y-4">
                {noticiasUrgentes.slice(0, 5).map(noticia => (
                  <div
                    key={noticia._id}
                    className="group p-4 border border-red-200 bg-red-50 rounded-xl cursor-pointer hover:bg-red-100 hover:border-red-300 transition-all duration-200 transform hover:scale-[1.02]"
                    onClick={() => onViewNoticia(noticia._id!)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-semibold">
                            URGENTE
                          </span>
                          <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                            {noticia.prioridade}
                          </span>
                        </div>
                        <h3 className="font-bold text-red-900 line-clamp-1 group-hover:text-red-800">
                          {noticia.titulo}
                        </h3>
                        <p className="text-sm text-red-700 line-clamp-2 mt-1">
                          {noticia.resumo}
                        </p>
                        <div className="flex items-center justify-between mt-3 text-xs text-red-600">
                          <div className="flex items-center space-x-3">
                            <span className="bg-white px-2 py-1 rounded-md font-medium">
                              {noticia.entidade}
                            </span>
                            <span>
                              {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          {/* Indicadores de mídia */}
                          <div className="flex items-center space-x-1">
                            {noticia.imagens?.length > 0 && (
                              <span className="text-xs bg-white px-1.5 py-0.5 rounded">🖼️ {noticia.imagens.length}</span>
                            )}
                            {noticia.videos?.length > 0 && (
                              <span className="text-xs bg-white px-1.5 py-0.5 rounded">🎥 {noticia.videos.length}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notícias Recentes */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🆕</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Notícias Recentes</h2>
                  <p className="text-blue-100 text-sm">Publicações mais recentes</p>
                </div>
              </div>
              <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {noticiasRecentes.length}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {noticiasRecentes.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📰</span>
                </div>
                <p className="text-gray-500 font-medium">Nenhuma notícia recente</p>
                <p className="text-gray-400 text-sm mt-1">Crie a primeira notícia para começar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {noticiasRecentes.slice(0, 5).map(noticia => (
                  <div
                    key={noticia._id}
                    className="group p-4 border border-gray-200 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 transform hover:scale-[1.02]"
                    onClick={() => onViewNoticia(noticia._id!)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                            noticia.status === 'publicado' 
                              ? 'bg-green-100 text-green-800'
                              : noticia.status === 'rascunho'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {noticia.status}
                          </span>
                          <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full border">
                            {noticia.prioridade}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-800">
                          {noticia.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                          {noticia.resumo}
                        </p>
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-3">
                            <span className="bg-white px-2 py-1 rounded-md font-medium border">
                              {noticia.entidade}
                            </span>
                            <span>
                              {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          {/* Indicadores de mídia e engajamento */}
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {noticia.imagens?.length > 0 && (
                                <span className="text-xs bg-white px-1.5 py-0.5 rounded border">🖼️</span>
                              )}
                              {noticia.videos?.length > 0 && (
                                <span className="text-xs bg-white px-1.5 py-0.5 rounded border">🎥</span>
                              )}
                            </div>
                            <span className="text-xs bg-white px-1.5 py-0.5 rounded border">
                              👁️ {noticia.estatisticas?.visualizacoes || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={onCreateNoticia}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
              <span className="text-blue-600 text-lg">📝</span>
            </div>
            <h4 className="font-semibold text-gray-900">Criar Notícia</h4>
            <p className="text-sm text-gray-600 mt-1">Iniciar uma nova publicação</p>
          </button>
          
          <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-left group">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <span className="text-green-600 text-lg">📊</span>
            </div>
            <h4 className="font-semibold text-gray-900">Ver Relatórios</h4>
            <p className="text-sm text-gray-600 mt-1">Análises detalhadas</p>
          </button>
          
          <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left group">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
              <span className="text-purple-600 text-lg">⚙️</span>
            </div>
            <h4 className="font-semibold text-gray-900">Configurações</h4>
            <p className="text-sm text-gray-600 mt-1">Personalizar sistema</p>
          </button>
        </div>
      </div>
    </div>
  );
};