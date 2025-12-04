/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCargas } from '@/types/useCargas';
import { useState, useEffect } from 'react';
import { FiltrosCargas } from '../transportador/viagens';

interface TabelaCargasContainerProps {
  nomeEmpresa?: string;
}

export function TabelaCargasContainer({ nomeEmpresa }: TabelaCargasContainerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [tipoFilter, setTipoFilter] = useState('todos');
  const [showNovaCargaModal, setShowNovaCargaModal] = useState(false);
  const [filtrosAvancados, setFiltrosAvancados] = useState({
    prioridade: 'todos',
    valorMin: '',
    valorMax: '',
    dataInicio: '',
    dataFim: '',
    tipoCarga: 'todos',
    naturezaCarga: 'todos',
    motoristaEmpresa: false
  });

  // Usar o hook de cargas
  const {
    filteredCargas,
    isDataLoading,
    metrics,
    filtrarCargasLocalmente,
    criarNovaCarga,
    atualizarStatus,
    aceitarCarga,
    visualizarCarga,
    exportarDados,
    fetchCargas // Para recarregar quando necessário
  } = useCargas(nomeEmpresa);

  // Aplicar filtros quando mudarem
  useEffect(() => {
    filtrarCargasLocalmente({
      searchTerm,
      statusFilter,
      tipoFilter,
      filtrosAvancados
    });
  }, [searchTerm, statusFilter, tipoFilter, filtrosAvancados, filtrarCargasLocalmente]);

  // Função para lidar com a criação de nova carga
  const handleCriarNovaCarga = async (dadosCarga: any) => {
    const resultado = await criarNovaCarga(dadosCarga);
    if (resultado.success) {
      alert('Carga criada com sucesso!');
      setShowNovaCargaModal(false);
      return true;
    } else {
      alert(`Erro ao criar carga: ${resultado.error}`);
      return false;
    }
  };

  // Função para lidar com aceitação de carga
  const handleAceitarCarga = async (codigo: string) => {
    const sucesso = await aceitarCarga(codigo);
    if (sucesso) {
      alert('Carga aceita com sucesso!');
    } else {
      alert('Erro ao aceitar carga');
    }
  };

  // Função para lidar com atualização de status
  const handleAtualizarStatus = async (codigo: string, status: any) => {
    const sucesso = await atualizarStatus(codigo, status);
    if (sucesso) {
      alert('Status atualizado com sucesso!');
    } else {
      alert('Erro ao atualizar status');
    }
  };

  // Função para lidar com visualização de carga
  const handleVisualizarCarga = async (carga: any) => {
    const detalhes = await visualizarCarga(carga);
    if (detalhes) {
      // Aqui você pode abrir um modal com os detalhes
      console.log('Detalhes da carga:', detalhes);
      // Exemplo: abrir modal ou redirecionar para página de detalhes
      // setShowDetalhesModal(true);
      // setCargaSelecionada(detalhes);
    } else {
      alert('Erro ao carregar detalhes da carga');
    }
  };

  // Função para exportar dados
  const handleExportarDados = (tipo: string) => {
    exportarDados(tipo);
  };

  // Componente Spinner (exemplo)
  const MeuSpinner = ({ size = 'md' }: { size?: string }) => (
    <div className={`flex justify-center items-center ${size === 'md' ? 'p-8' : 'p-4'}`}>
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-green-500 ${
        size === 'sm' ? 'h-6 w-6' : 
        size === 'md' ? 'h-10 w-10' : 
        'h-16 w-16'
      }`}></div>
      <span className="ml-3 text-gray-600 dark:text-gray-300">Carregando...</span>
    </div>
  );

  return (
    <>
      <FiltrosCargas
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        tipoFilter={tipoFilter}
        setTipoFilter={setTipoFilter}
        filtrosAvancados={filtrosAvancados}
        setFiltrosAvancados={setFiltrosAvancados}
        filteredCargas={filteredCargas}
        metrics={metrics}
        isDataLoading={isDataLoading}
        exportarDados={handleExportarDados}
        setShowNovaCargaModal={setShowNovaCargaModal}
        visualizarCarga={handleVisualizarCarga}
        aceitarCarga={handleAceitarCarga}
        atualizarStatus={handleAtualizarStatus}
        Spinner={MeuSpinner}
        nomeEmpresa={nomeEmpresa}
      />

      {/* Modal para Nova Carga (exemplo) */}
      {showNovaCargaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Nova Carga</h2>
            {/* Formulário para nova carga aqui */}
            <button
              onClick={() => setShowNovaCargaModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}