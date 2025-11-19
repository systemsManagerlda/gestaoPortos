import { FiCheckCircle, FiPackage, FiMapPin, FiClock, FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";

export interface Carga {
  id: string;
  codigo: string;
  cliente: string;
  prioridade: string;
  origem: {
    cidade: string;
    local: string;
  };
  destino: {
    cidade: string;
    local: string;
  };
  distancia: number;
  pesoBruto: number;
  volume: number;
  tipoCarga: string;
  tempoRestante: string;
  descricao: string;
  requisitos: string[];
  valorFrete: number;
  status: string;
  dataColeta: string;
  dataEntregaPrevista: string;
  naturezaCarga: string;
}

interface CargasDisponiveisProps {
  aceitarCarga: (id: string) => void;
}

export function CargasDisponiveis({ aceitarCarga }: CargasDisponiveisProps) {
  const [cargasDisponiveis, setCargasDisponiveis] = useState<Carga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>("todas");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");

  // Buscar cargas disponíveis da API
  useEffect(() => {
    async function fetchCargasDisponiveis() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getCargaList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            curPage: 1,
            pageSize: 50,
            status: "planeada" // Buscar apenas cargas planeadas/disponíveis
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.returnCode === 200 && data.data?.list) {
            const cargasProcessadas = processarCargas(data.data.list);
            setCargasDisponiveis(cargasProcessadas);
          } else {
            setCargasDisponiveis([]);
          }
        } else {
          throw new Error("Erro ao buscar cargas");
        }
      } catch (error) {
        console.error("Erro ao buscar cargas disponíveis:", error);
        setError("Erro ao carregar cargas disponíveis. Tente novamente.");
        setCargasDisponiveis([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCargasDisponiveis();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processarCargas = (cargas: any[]): Carga[] => {
    if (!Array.isArray(cargas)) return [];

    return cargas
      .filter(carga => 
        carga?.status === "planeada" || 
        carga?.status === "aguardando_coleta"
      )
      .map(carga => {
        // Calcular tempo restante baseado na data de coleta
        const tempoRestante = calcularTempoRestante(carga.dataColeta);
        
        // Gerar requisitos baseados na natureza da carga
        const requisitos = gerarRequisitos(carga);

        return {
          id: carga._id || carga.codigo || `carga-${Date.now()}`,
          codigo: carga.codigo || "N/A",
          cliente: carga.cliente || "Cliente não especificado",
          prioridade: carga.prioridade || "média",
          origem: {
            cidade: carga.origem?.cidade || "Não especificada",
            local: carga.origem?.local || "Não especificado"
          },
          destino: {
            cidade: carga.destino?.cidade || "Não especificada",
            local: carga.destino?.local || "Não especificado"
          },
          distancia: calcularDistancia(carga.origem, carga.destino),
          pesoBruto: carga.pesoBruto || 0,
          volume: carga.volume || 0,
          tipoCarga: carga.tipoCarga || "Não especificado",
          tempoRestante,
          descricao: carga.descricao || "Sem descrição disponível",
          requisitos,
          valorFrete: carga.valorFrete || carga.valorTotal || 0,
          status: carga.status || "planeada",
          dataColeta: carga.dataColeta,
          dataEntregaPrevista: carga.dataEntregaPrevista,
          naturezaCarga: carga.naturezaCarga || "não perigosa"
        };
      });
  };

  const calcularTempoRestante = (dataColeta: string): string => {
    if (!dataColeta) return "Não definido";
    
    const dataColetaObj = new Date(dataColeta);
    const agora = new Date();
    const diffMs = dataColetaObj.getTime() - agora.getTime();
    const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias < 0) return "Expirado";
    if (diffDias === 0) return "Hoje";
    if (diffDias === 1) return "1 dia";
    if (diffDias <= 7) return `${diffDias} dias`;
    return `${Math.ceil(diffDias / 7)} semanas`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const calcularDistancia = (origem: any, destino: any): number => {
    // Simulação de cálculo de distância (em produção, usar API de rotas)
    const distancias = [150, 280, 420, 560, 750, 890, 1200];
    return distancias[Math.floor(Math.random() * distancias.length)];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gerarRequisitos = (carga: any): string[] => {
    const requisitos: string[] = [];

    if (carga.naturezaCarga === "perigosa") {
      requisitos.push("Certificado de transporte de produtos perigosos");
      requisitos.push("Equipamento de proteção individual");
    }

    if (carga.tipoCarga === "Frigorífica") {
      requisitos.push("Veículo com refrigeração ativa");
      requisitos.push("Monitoramento de temperatura");
    }

    if (carga.prioridade === "urgente") {
      requisitos.push("Coleta imediata");
    }

    if (carga.pesoBruto > 20000) {
      requisitos.push("Veículo pesado adequado");
    }

    if (!carga.requisitos || carga.requisitos.length === 0) {
      requisitos.push("Documentação em ordem");
      requisitos.push("Veículo em bom estado");
    }

    return requisitos;
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade.toLowerCase()) {
      case 'urgente':
      case 'alta':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800';
      case 'média':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800';
      case 'baixa':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
    }
  };

  const getNaturezaColor = (natureza: string) => {
    switch (natureza.toLowerCase()) {
      case 'perigosa':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      case 'sensível':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      case 'fragil':
        return 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 0
    }).format(valor);
  };

  const formatarData = (data: string) => {
    if (!data) return "Não definida";
    return new Date(data).toLocaleDateString('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Filtrar cargas baseado nos filtros selecionados
  const cargasFiltradas = cargasDisponiveis.filter(carga => {
    const prioridadeMatch = filtroPrioridade === "todas" || carga.prioridade.toLowerCase() === filtroPrioridade;
    const tipoMatch = filtroTipo === "todos" || carga.tipoCarga.toLowerCase().includes(filtroTipo);
    return prioridadeMatch && tipoMatch;
  });

  const tiposCargaUnicos = [...new Set(cargasDisponiveis.map(c => c.tipoCarga))];
  const prioridadesUnicas = [...new Set(cargasDisponiveis.map(c => c.prioridade))];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center justify-center h-32 text-red-600 dark:text-red-400">
            <FiAlertCircle className="w-8 h-8 mb-2" />
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Cargas Disponíveis 
              <span className="ml-2 text-green-600">({cargasFiltradas.length})</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Aceite novas cargas para aumentar sua renda
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Filtro de Prioridade */}
            <select 
              value={filtroPrioridade}
              onChange={(e) => setFiltroPrioridade(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="todas">Todas as Prioridades</option>
              {prioridadesUnicas.map(prioridade => (
                <option key={prioridade} value={prioridade.toLowerCase()}>
                  {prioridade}
                </option>
              ))}
            </select>

            {/* Filtro de Tipo */}
            <select 
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="todos">Todos os Tipos</option>
              {tiposCargaUnicos.map(tipo => (
                <option key={tipo} value={tipo.toLowerCase()}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
        </div>

        {cargasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhuma carga disponível
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {cargasDisponiveis.length === 0 
                ? "Não há cargas disponíveis no momento." 
                : "Nenhuma carga corresponde aos filtros selecionados."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {cargasFiltradas.map((carga) => (
              <div
                key={carga.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-700"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                      {carga.codigo}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {carga.cliente}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPrioridadeColor(
                        carga.prioridade
                      )}`}
                    >
                      {carga.prioridade.charAt(0).toUpperCase() + carga.prioridade.slice(1)}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${getNaturezaColor(carga.naturezaCarga)}`}
                    >
                      {carga.naturezaCarga}
                    </span>
                  </div>
                </div>

                {/* Informações da Rota */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <FiMapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">{carga.origem.cidade}</span>
                    <span className="mx-2">→</span>
                    <span className="font-medium">{carga.destino.cidade}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Distância:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {carga.distancia} km
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Peso:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {(carga.pesoBruto / 1000).toFixed(1)} ton
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Volume:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {carga.volume} m³
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Tipo:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {carga.tipoCarga}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-sm">
                      <FiClock className="w-4 h-4 mr-1 text-orange-500" />
                      <span className="text-gray-500 dark:text-gray-400">Coleta:</span>
                    </div>
                    <span className={`font-medium ${
                      carga.tempoRestante === "Expirado" || carga.tempoRestante === "Hoje" 
                        ? "text-red-600" 
                        : "text-orange-600"
                    }`}>
                      {carga.tempoRestante}
                    </span>
                  </div>
                </div>

                {/* Descrição e Requisitos */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {carga.descricao}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Requisitos:
                    </p>
                    {carga.requisitos.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs text-gray-600 dark:text-gray-300"
                      >
                        <FiCheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                        <span className="flex-1">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer com Valor e Ação */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <div className="text-lg font-bold text-green-600">
                      {formatarMoeda(carga.valorFrete)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Entrega: {formatarData(carga.dataEntregaPrevista)}
                    </div>
                  </div>
                  <button
                    onClick={() => aceitarCarga(carga.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center space-x-2"
                  >
                    <FiCheckCircle className="w-4 h-4" />
                    <span>Aceitar Carga</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}