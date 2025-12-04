// Crie um novo arquivo chamado ManutencaoDetailsModal.tsx
import { useState } from "react";
import {
  FiX,
  FiSettings,
  FiCalendar,
  FiClock,
  FiAlertTriangle,
  FiCheckCircle,
  FiTool,
  FiBarChart2,
  FiPrinter,
  FiDownload,
  FiPlus,
  FiTruck,
  FiFileText,
  FiMapPin
} from "react-icons/fi";
import { FaCalculator, FaWrench } from "react-icons/fa";

interface ManutencaoCamiao {
  camiaoId: number;
  matricula: string;
  marca: string;
  modelo: string;
  manutencao?: {
    proximaManutencao?: string;
    ultimaManutencao?: string;
    kmUltimaManutencao?: number;
    periodicidadeManutencao?: number;
    manutencaoGPS?: {
      ultimaManutencao?: string;
      proximaManutencao?: string;
      observacoes?: string;
    };
  };
  nivelInspecao: {
    categoria: "A" | "B" | "C";
    descricao: string;
    dataUltimaInspecao: string;
    dataProximaInspecao?: string;
    resultadoUltimaInspecao: "aprovado" | "aprovado_com_ressalvas" | "reprovado";
    centroInspecao?: string;
    observacoes?: string;
  };
  estado: {
    tipo: "novo" | "seminovo" | "usado" | "recondicionado";
    observacoes?: string;
    dataAvaliacao?: string;
  };
  historicoUtilizacao?: {
    totalKmPercorridos: number;
    totalViagens: number;
    dataPrimeiraUtilizacao?: string;
    dataUltimaUtilizacao?: string;
    consumoMedio?: number;
  };
  status: "disponivel" | "em_viagem" | "manutencao" | "inativo" | "reservado";
  dataCriacao: string;
  dataAtualizacao: string;
}

interface ManutencaoDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  camiao: ManutencaoCamiao | null;
  onAgendarManutencao?: (camiaoId: number) => void;
  onRegistrarManutencao?: (camiaoId: number) => void;
  onAtualizarStatus?: (camiaoId: number, status: string) => void;
  onGerarRelatorio?: (camiaoId: number) => void;
}

export function ManutencaoDetailsModal({
  isOpen,
  onClose,
  camiao,
  onAgendarManutencao,
  onRegistrarManutencao,
  onAtualizarStatus,
  onGerarRelatorio
}: ManutencaoDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("agenda");

  if (!isOpen || !camiao) return null;

  // Funções auxiliares para formatação e estilos
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const formatarNumero = (numero: number) => {
    return new Intl.NumberFormat("pt-MZ").format(numero);
  };

  const calcularDiasRestantes = (dataFutura: string) => {
    const hoje = new Date();
    const data = new Date(dataFutura);
    const diffTime = data.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (dias: number) => {
    if (dias <= 0) return "bg-red-100 text-red-800 border-red-200";
    if (dias <= 7) return "bg-orange-100 text-orange-800 border-orange-200";
    if (dias <= 30) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getStatusText = (dias: number) => {
    if (dias <= 0) return "Vencida";
    if (dias <= 7) return "Urgente";
    if (dias <= 30) return "Próxima";
    return "Em dia";
  };

  const getPrioridadeColor = (dias: number) => {
    if (dias <= 0) return "text-red-600";
    if (dias <= 7) return "text-orange-600";
    if (dias <= 30) return "text-yellow-600";
    return "text-green-600";
  };

  const getResultadoInspecaoColor = (resultado: string) => {
    switch (resultado) {
      case "aprovado":
        return "bg-green-100 text-green-800";
      case "aprovado_com_ressalvas":
        return "bg-yellow-100 text-yellow-800";
      case "reprovado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "novo":
        return "bg-green-100 text-green-800";
      case "seminovo":
        return "bg-blue-100 text-blue-800";
      case "usado":
        return "bg-yellow-100 text-yellow-800";
      case "recondicionado":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calcular próximas manutenções
  const calcularProximasManutencoes = () => {
    const manutencoes = [];

    // Manutenção programada do veículo
    if (camiao.manutencao?.proximaManutencao) {
      const dias = calcularDiasRestantes(camiao.manutencao.proximaManutencao);
      manutencoes.push({
        tipo: "Manutenção Programada",
        data: camiao.manutencao.proximaManutencao,
        dias: dias,
        prioridade: getPrioridadeColor(dias),
        descricao: "Manutenção periódica do veículo",
        tipoManutencao: "preventiva"
      });
    }

    // Inspeção
    if (camiao.nivelInspecao.dataProximaInspecao) {
      const dias = calcularDiasRestantes(camiao.nivelInspecao.dataProximaInspecao);
      manutencoes.push({
        tipo: "Inspeção Técnica",
        data: camiao.nivelInspecao.dataProximaInspecao,
        dias: dias,
        prioridade: getPrioridadeColor(dias),
        descricao: `Inspeção categoria ${camiao.nivelInspecao.categoria}`,
        tipoManutencao: "inspecao"
      });
    }

    // Manutenção GPS
    if (camiao.manutencao?.manutencaoGPS?.proximaManutencao) {
      const dias = calcularDiasRestantes(camiao.manutencao.manutencaoGPS.proximaManutencao);
      manutencoes.push({
        tipo: "Manutenção GPS",
        data: camiao.manutencao.manutencaoGPS.proximaManutencao,
        dias: dias,
        prioridade: getPrioridadeColor(dias),
        descricao: "Manutenção do sistema GPS",
        tipoManutencao: "gps"
      });
    }

    return manutencoes.sort((a, b) => a.dias - b.dias);
  };

  // Renderizar conteúdo baseado na aba ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case "agenda":
        return <AgendaTab camiao={camiao} />;
      case "historico":
        return <HistoricoTab camiao={camiao} />;
      case "inspecao":
        return <InspecaoTab camiao={camiao} />;
      case "estatisticas":
        return <EstatisticasTab camiao={camiao} />;
      default:
        return <AgendaTab camiao={camiao} />;
    }
  };

  // Componentes das abas
  const AgendaTab = ({ camiao }: { camiao: ManutencaoCamiao }) => {
    const proximasManutencoes = calcularProximasManutencoes();
    const manutencaoUrgente = proximasManutencoes.find(m => m.dias <= 7);

    return (
      <div className="space-y-6">
        {/* Alertas Urgentes */}
        {manutencaoUrgente && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <FiAlertTriangle className="h-5 w-5 text-red-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Manutenção Urgente
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {manutencaoUrgente.tipo} vence em {manutencaoUrgente.dias} dias
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Próximas Manutenções */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
            Próximas Manutenções
          </h3>
          
          {proximasManutencoes.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FiCheckCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Nenhuma manutenção agendada</p>
              <p className="text-sm mt-2">Todas as manutenções estão em dia</p>
            </div>
          ) : (
            <div className="space-y-4">
              {proximasManutencoes.map((manutencao, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${manutencao.prioridade.replace('text', 'bg')}`}>
                      <FiTool className={`w-4 h-4 ${manutencao.prioridade}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{manutencao.tipo}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{manutencao.descricao}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {formatarData(manutencao.data)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(manutencao.dias)}`}>
                      {getStatusText(manutencao.dias)}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {manutencao.dias > 0 ? `${manutencao.dias} dias` : 'Vencida'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Atual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <FiSettings className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900 dark:text-white">Status</div>
            <div className={`text-lg font-semibold ${
              camiao.status === 'manutencao' ? 'text-orange-600' :
              camiao.status === 'disponivel' ? 'text-green-600' :
              'text-gray-600'
            }`}>
              {camiao.status === 'manutencao' ? 'Em Manutenção' : 
               camiao.status === 'disponivel' ? 'Disponível' : 
               camiao.status.charAt(0).toUpperCase() + camiao.status.slice(1)}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <FiTool className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900 dark:text-white">Estado</div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(camiao.estado.tipo)}`}>
              {camiao.estado.tipo.charAt(0).toUpperCase() + camiao.estado.tipo.slice(1)}
            </span>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <FiBarChart2 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900 dark:text-white">Próxima</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {proximasManutencoes.length > 0 ? 
                `${proximasManutencoes[0].dias} dias` : 
                'N/A'
              }
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FaWrench className="w-5 h-5 mr-2 text-orange-600" />
            Ações Rápidas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onAgendarManutencao?.(camiao.camiaoId)}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiCalendar className="w-4 h-4" />
              <span>Agendar Manutenção</span>
            </button>
            
            <button
              onClick={() => onRegistrarManutencao?.(camiao.camiaoId)}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              <span>Registrar Manutenção</span>
            </button>
            
            {camiao.status !== 'manutencao' && (
              <button
                onClick={() => onAtualizarStatus?.(camiao.camiaoId, 'manutencao')}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <FiSettings className="w-4 h-4" />
                <span>Enviar para Manutenção</span>
              </button>
            )}
            
            {camiao.status === 'manutencao' && (
              <button
                onClick={() => onAtualizarStatus?.(camiao.camiaoId, 'disponivel')}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiCheckCircle className="w-4 h-4" />
                <span>Liberar da Manutenção</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const HistoricoTab = ({ camiao }: { camiao: ManutencaoCamiao }) => (
    <div className="space-y-6">
      {/* Histórico de Manutenções */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiClock className="w-5 h-5 mr-2 text-blue-600" />
          Histórico de Manutenções
        </h3>
        
        <div className="space-y-4">
          {/* Última Manutenção */}
          {camiao.manutencao?.ultimaManutencao && (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <FiTool className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Manutenção Programada</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Última manutenção realizada</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatarData(camiao.manutencao.ultimaManutencao)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Concluída
                </span>
                {camiao.manutencao.kmUltimaManutencao && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {formatarNumero(camiao.manutencao.kmUltimaManutencao)} km
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Última Inspeção */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <FiFileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Inspeção Técnica</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Última inspeção realizada</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {formatarData(camiao.nivelInspecao.dataUltimaInspecao)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getResultadoInspecaoColor(camiao.nivelInspecao.resultadoUltimaInspecao)}`}>
                {camiao.nivelInspecao.resultadoUltimaInspecao.replace('_', ' ')}
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Categoria {camiao.nivelInspecao.categoria}
              </p>
            </div>
          </div>

          {/* Manutenção GPS */}
          {camiao.manutencao?.manutencaoGPS?.ultimaManutencao && (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                  <FaWrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Manutenção GPS</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Última manutenção do GPS</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatarData(camiao.manutencao.manutencaoGPS.ultimaManutencao)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Concluída
                </span>
                {camiao.manutencao.manutencaoGPS.observacoes && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {camiao.manutencao.manutencaoGPS.observacoes}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {!camiao.manutencao?.ultimaManutencao && !camiao.manutencao?.manutencaoGPS?.ultimaManutencao && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FiClock className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>Nenhum histórico de manutenção encontrado</p>
          </div>
        )}
      </div>

      {/* Informações de Periodicidade */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiCalendar className="w-5 h-5 mr-2 text-green-600" />
          Periodicidade de Manutenções
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Manutenção Programada:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {camiao.manutencao?.periodicidadeManutencao ? 
                `A cada ${formatarNumero(camiao.manutencao.periodicidadeManutencao)} km` : 
                'Não definida'
              }
            </div>
          </div>
          
          <div>
            <span className="text-gray-600 dark:text-gray-400">Inspeção Técnica:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {camiao.nivelInspecao.categoria === 'A' ? '6 meses' :
               camiao.nivelInspecao.categoria === 'B' ? '1 ano' :
               '2 anos'}
            </div>
          </div>
          
          <div>
            <span className="text-gray-600 dark:text-gray-400">Próxima Manutenção:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {camiao.manutencao?.proximaManutencao ? 
                formatarData(camiao.manutencao.proximaManutencao) : 
                'Não agendada'
              }
            </div>
          </div>
          
          <div>
            <span className="text-gray-600 dark:text-gray-400">Próxima Inspeção:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {camiao.nivelInspecao.dataProximaInspecao ? 
                formatarData(camiao.nivelInspecao.dataProximaInspecao) : 
                'Não agendada'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const InspecaoTab = ({ camiao }: { camiao: ManutencaoCamiao }) => (
    <div className="space-y-6">
      {/* Status da Inspeção */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiFileText className="w-5 h-5 mr-2 text-blue-600" />
          Status da Inspeção
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-blue-600">{camiao.nivelInspecao.categoria}</span>
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Categoria</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {camiao.nivelInspecao.categoria === 'A' ? 'Chanté' :
               camiao.nivelInspecao.categoria === 'B' ? 'Nacional' :
               'Trânsito'}
            </div>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
              getResultadoInspecaoColor(camiao.nivelInspecao.resultadoUltimaInspecao).replace('text', 'bg')
            }`}>
              <FiCheckCircle className={`w-6 h-6 ${
                camiao.nivelInspecao.resultadoUltimaInspecao === 'aprovado' ? 'text-green-600' :
                camiao.nivelInspecao.resultadoUltimaInspecao === 'aprovado_com_ressalvas' ? 'text-yellow-600' :
                'text-red-600'
              }`} />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Resultado</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {camiao.nivelInspecao.resultadoUltimaInspecao.replace('_', ' ')}
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <FiCalendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Última</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatarData(camiao.nivelInspecao.dataUltimaInspecao)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <FiClock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">Próxima</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {camiao.nivelInspecao.dataProximaInspecao ? 
                formatarData(camiao.nivelInspecao.dataProximaInspecao) : 
                'N/A'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Detalhes da Inspeção */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiBarChart2 className="w-5 h-5 mr-2 text-green-600" />
          Detalhes da Inspeção
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Categoria:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {camiao.nivelInspecao.categoria} - 
              {camiao.nivelInspecao.categoria === 'A' ? ' Chanté' :
               camiao.nivelInspecao.categoria === 'B' ? ' Nacional' :
               ' Trânsito'}
            </div>
          </div>
          
          <div>
            <span className="text-gray-600 dark:text-gray-400">Descrição:</span>
            <div className="font-medium text-gray-900 dark:text-white">{camiao.nivelInspecao.descricao}</div>
          </div>
          
          <div>
            <span className="text-gray-600 dark:text-gray-400">Data Última Inspeção:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarData(camiao.nivelInspecao.dataUltimaInspecao)}
            </div>
          </div>
          
          {camiao.nivelInspecao.dataProximaInspecao && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">Data Próxima Inspeção:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(camiao.nivelInspecao.dataProximaInspecao)}
              </div>
            </div>
          )}
          
          {camiao.nivelInspecao.centroInspecao && (
            <div className="md:col-span-2">
              <span className="text-gray-600 dark:text-gray-400">Centro de Inspeção:</span>
              <div className="font-medium text-gray-900 dark:text-white">{camiao.nivelInspecao.centroInspecao}</div>
            </div>
          )}
          
          {camiao.nivelInspecao.observacoes && (
            <div className="md:col-span-2">
              <span className="text-gray-600 dark:text-gray-400">Observações:</span>
              <div className="font-medium text-gray-900 dark:text-white">{camiao.nivelInspecao.observacoes}</div>
            </div>
          )}
        </div>
      </div>

      {/* Viabilidade Baseada na Inspeção */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiMapPin className="w-5 h-5 mr-2 text-purple-600" />
          Viabilidade Operacional
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
              camiao.nivelInspecao.categoria === 'A' || 
              camiao.nivelInspecao.categoria === 'B' || 
              camiao.nivelInspecao.categoria === 'C' ? 
              'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <FiCheckCircle className="w-6 h-6" />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Chanté</div>
            <div className="text-xs text-green-600">Permitido</div>
          </div>
          
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
              camiao.nivelInspecao.categoria === 'B' || 
              camiao.nivelInspecao.categoria === 'C' ? 
              'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <FiCheckCircle className="w-6 h-6" />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nacional</div>
            <div className={`text-xs ${
              camiao.nivelInspecao.categoria === 'B' || camiao.nivelInspecao.categoria === 'C' ? 
              'text-green-600' : 'text-red-600'
            }`}>
              {camiao.nivelInspecao.categoria === 'B' || camiao.nivelInspecao.categoria === 'C' ? 
               'Permitido' : 'Não Permitido'}
            </div>
          </div>
          
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
              camiao.nivelInspecao.categoria === 'C' ? 
              'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <FiCheckCircle className="w-6 h-6" />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Trânsito</div>
            <div className={`text-xs ${
              camiao.nivelInspecao.categoria === 'C' ? 'text-green-600' : 'text-red-600'
            }`}>
              {camiao.nivelInspecao.categoria === 'C' ? 'Permitido' : 'Não Permitido'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EstatisticasTab = ({ camiao }: { camiao: ManutencaoCamiao }) => (
    <div className="space-y-6">
      {/* Estatísticas de Utilização */}
      {camiao.historicoUtilizacao && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <FiMapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatarNumero(camiao.historicoUtilizacao.totalKmPercorridos)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total KM</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <FiTruck className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatarNumero(camiao.historicoUtilizacao.totalViagens)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Viagens</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <FiBarChart2 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {camiao.historicoUtilizacao.consumoMedio ? 
                camiao.historicoUtilizacao.consumoMedio.toFixed(1) : 'N/A'
              }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Consumo (km/l)</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <FiCalendar className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {camiao.manutencao?.periodicidadeManutencao ? 
                formatarNumero(camiao.manutencao.periodicidadeManutencao) : 'N/A'
              }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Periodicidade (km)</div>
          </div>
        </div>
      )}

      {/* Cálculo de Manutenção Baseado em KM */}
      {camiao.manutencao?.kmUltimaManutencao && camiao.manutencao?.periodicidadeManutencao && camiao.historicoUtilizacao && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FaCalculator className="w-5 h-5 mr-2 text-blue-600" />
            Previsão de Manutenção por KM
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">KM desde última manutenção:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatarNumero(camiao.historicoUtilizacao.totalKmPercorridos - (camiao.manutencao.kmUltimaManutencao || 0))} km
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">KM até próxima manutenção:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatarNumero((camiao.manutencao.kmUltimaManutencao || 0) + (camiao.manutencao.periodicidadeManutencao || 0) - camiao.historicoUtilizacao.totalKmPercorridos)} km
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ 
                  width: `${Math.min(100, ((camiao.historicoUtilizacao.totalKmPercorridos - (camiao.manutencao.kmUltimaManutencao || 0)) / (camiao.manutencao.periodicidadeManutencao || 1)) * 100)}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0 km</span>
              <span>{formatarNumero(camiao.manutencao.periodicidadeManutencao || 0)} km</span>
            </div>
          </div>
        </div>
      )}

      {/* Datas Importantes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiCalendar className="w-5 h-5 mr-2 text-green-600" />
          Datas Importantes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {camiao.historicoUtilizacao?.dataPrimeiraUtilizacao && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">Primeira Utilização:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(camiao.historicoUtilizacao.dataPrimeiraUtilizacao)}
              </div>
            </div>
          )}
          
          {camiao.historicoUtilizacao?.dataUltimaUtilizacao && (
            <div>
              <span className="text-gray-600 dark:text-gray-400">Última Utilização:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {formatarData(camiao.historicoUtilizacao.dataUltimaUtilizacao)}
              </div>
            </div>
          )}
          
          <div>
            <span className="text-gray-600 dark:text-gray-400">Data Criação:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarData(camiao.dataCriacao)}
            </div>
          </div>
          
          <div>
            <span className="text-gray-600 dark:text-gray-400">Última Atualização:</span>
            <div className="font-medium text-gray-900 dark:text-white">
              {formatarData(camiao.dataAtualizacao)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal */}
        <div className="relative inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 rounded-2xl shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <FiSettings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Gestão de Manutenção
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {camiao.matricula} - {camiao.marca} {camiao.modelo}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    camiao.status === 'manutencao' ? 'bg-orange-100 text-orange-800' :
                    camiao.status === 'disponivel' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {camiao.status === 'manutencao' ? 'Em Manutenção' : 
                     camiao.status === 'disponivel' ? 'Disponível' : 
                     camiao.status.charAt(0).toUpperCase() + camiao.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {camiao.camiaoId}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {onGerarRelatorio && (
                <button
                  onClick={() => onGerarRelatorio(camiao.camiaoId)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiPrinter className="w-4 h-4" />
                  <span>Relatório</span>
                </button>
              )}
              
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "agenda", label: "Agenda", icon: FiCalendar },
                { id: "historico", label: "Histórico", icon: FiClock },
                { id: "inspecao", label: "Inspeção", icon: FiFileText },
                { id: "estatisticas", label: "Estatísticas", icon: FiBarChart2 },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {renderTabContent()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Criado em {formatarData(camiao.dataCriacao)} • 
              Atualizado em {formatarData(camiao.dataAtualizacao)}
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiPrinter className="w-4 h-4" />
                <span>Imprimir</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiDownload className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}