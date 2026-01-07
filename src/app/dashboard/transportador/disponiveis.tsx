/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FiCheckCircle,
  FiPackage,
  FiMapPin,
  FiClock,
  FiAlertCircle,
  FiEdit,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { ModalEditarCarga } from "./ModalEditarCarga";
import { Carga } from "../cliente/cargaService";
import { useCargas } from "@/types/useCargas";

interface FiltrosFaturaPaga {
  clienteId?: string;
  clienteNome?: string;
  codigoCarga?: string;
  dataInicio?: string;
  dataFim?: string;
  tipoPercurso?: string;
  abrangenciaSeguro?: string;
  categoriaSeguro?: string;
}

export function CargasDisponiveis() {
  const [cargasDisponiveis, setCargasDisponiveis] = useState<Carga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>("todas");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [cargaParaEditar, setCargaParaEditar] = useState<Carga | null>(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [aceitandoCargaId, setAceitandoCargaId] = useState<string | null>(null);
  
  // Filtros para faturas pagas
  const [filtrosFaturaPaga, setFiltrosFaturaPaga] = useState<FiltrosFaturaPaga>({});
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false);

  const nomeEmpresa = "Mega Centro e Logistica";
  const { aceitarCarga } = useCargas(nomeEmpresa);

  // Função para abrir edição
  const abrirEditarCarga = (carga: Carga) => {
    setCargaParaEditar(carga);
    setModalEditarAberto(true);
  };

  // Função para salvar
  const handleSalvarCarga = async (
    cargaAtualizada: Carga,
    dadosAssociacao?: {
      motoristaId?: number;
      camiaoId?: number;
    }
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/updateCarga",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cargaAtualizada),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.returnCode === 200) {
          if (dadosAssociacao?.camiaoId) {
            try {
              const associacaoResponse = await fetch(
                "https://desktop-api-4f850b3f9733.herokuapp.com/associarCargaCamiao",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    codigoCarga: cargaAtualizada.codigo,
                    camiaoId: dadosAssociacao.camiaoId,
                    motoristaId: dadosAssociacao.motoristaId,
                  }),
                }
              );

              if (!associacaoResponse.ok) {
                console.warn("Erro ao associar carga ao camião");
              }
            } catch (associacaoError) {
              console.warn("Erro na associação:", associacaoError);
            }
          }

          await fetchCargasDisponiveis();
          return true;
        }
      }

      console.error("Erro na resposta da API:", await response.text());
      return false;
    } catch (error) {
      console.error("Erro ao salvar carga:", error);
      return false;
    }
  };

  // Atualizada para usar a rota de faturas pagas
  async function fetchCargasDisponiveis() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCargasComFaturaPaga",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            curPage: 1,
            pageSize: 50,
            ...filtrosFaturaPaga,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        if (data.returnCode === 200 && data.data?.list) {
          // Verifica se as cargas têm faturas pagas
          const cargasComFaturaPaga = data.data.list.filter((carga: any) => 
            carga.fatura && carga.fatura.status === "paga"
          );
          
          const cargasProcessadas = processarCargas(cargasComFaturaPaga);
          setCargasDisponiveis(cargasProcessadas);
        } else {
          setCargasDisponiveis([]);
        }
      } else {
        throw new Error("Erro ao buscar cargas com faturas pagas");
      }
    } catch (error) {
      console.error("Erro ao buscar cargas disponíveis:", error);
      setError("Erro ao carregar cargas com faturas pagas. Tente novamente.");
      setCargasDisponiveis([]);
    } finally {
      setLoading(false);
    }
  }

  // Buscar cargas disponíveis da API
  useEffect(() => {
    fetchCargasDisponiveis();
  }, [filtrosFaturaPaga]);

  // Função para aceitar carga
  const handleAceitarCarga = async (codigoCarga: string) => {
    if (aceitandoCargaId) {
      return;
    }

    try {
      setAceitandoCargaId(codigoCarga);
      await aceitarCarga(codigoCarga);
      await fetchCargasDisponiveis();

      setTimeout(() => {
        setAceitandoCargaId(null);
      }, 500);
    } catch (error) {
      console.error("Erro ao aceitar carga:", error);
      setAceitandoCargaId(null);
    }
  };

  // Aplicar filtros para faturas pagas
  const aplicarFiltrosFaturaPaga = () => {
    fetchCargasDisponiveis();
  };

  // Limpar filtros
  const limparFiltros = () => {
    setFiltrosFaturaPaga({});
  };

  const processarCargas = (cargas: any[]): Carga[] => {
    if (!Array.isArray(cargas)) return [];

    return cargas
      .filter((carga) => carga?.fatura?.status === "paga")
      .map((carga) => {
        const tempoRestante = calcularTempoRestante(carga.dataColeta);
        const requisitos = gerarRequisitos(carga);

        return {
          codigo: carga.codigo || "N/A",
          atrasada: "false",
          nomeEmpresa: carga.nomeEmpresa || "Mega Centro e Logistica",
          clienteId: carga.clienteId?.toString() || "",
          cliente: carga.cliente || "Cliente não especificado",
          tipoCarga: carga.tipoCarga || "Solta",
          descricao: carga.descricao || "Sem descrição disponível",
          naturezaCarga: carga.naturezaCarga || "não perigosa",
          categoriaSeguro: carga.categoriaSeguro || "Carga Geral",
          abrangenciaSeguro: carga.abrangenciaSeguro || "Nacional",
          tipoPercurso: carga.tipoPercurso || "Nacional",
          destinoFrete: carga.destinoFrete || carga.destino?.cidade || "",
          pesoBruto: carga.pesoBruto || 0,
          valorMercadoria: carga.valorMercadoria || carga.valorTotal || 0,
          origem: {
            cidade: carga.origem?.cidade || "Não especificada",
            local: carga.origem?.local || "Não especificado",
            pais: carga.origem?.pais || "Moçambique",
          },
          destino: {
            cidade: carga.destino?.cidade || "Não especificada",
            local: carga.destino?.local || "Não especificado",
            pais: carga.destino?.pais || "Moçambique",
          },
          status: carga.status || "planeada",
          prioridade: carga.prioridade || "média",
          dataCriacao: carga.dataCriacao || new Date().toISOString(),
          valorTotal: carga.valorTotal || carga.valorFrete || 0,
          id: carga._id || carga.codigo || `carga-${Date.now()}`,
          distancia: calcularDistancia(carga.origem, carga.destino),
          volume: carga.volume || 0,
          tempoRestante,
          requisitos,
          dataColeta: carga.dataColeta,
          dataEntregaPrevista: carga.dataEntregaPrevista,
          dataAtualizacao: carga.dataAtualizacao || new Date().toISOString(),
          subtipo: carga.subtipo,
          pesoLiquido: carga.pesoLiquido,
          embalagem: carga.embalagem,
          quantidadeVolumes: carga.quantidadeVolumes,
          dimensoes: carga.dimensoes,
          umidadeAtual: carga.umidadeAtual,
          umidadePermitidaPercentual: carga.umidadePermitidaPercentual,
          contentor: carga.contentor,
          gps: carga.gps,
          sensoresIOT: carga.sensoresIOT,
          exportador: carga.exportador,
          importador: carga.importador,
          consignatario: carga.consignatario,
          contatoCliente: carga.contatoCliente,
          instrucaoEspecial: carga.instrucaoEspecial,
          pontoAtual: carga.pontoAtual,
          rotaPlanejada: carga.rotaPlanejada,
          rotaRealizada: carga.rotaRealizada,
          desvioRotaPercentual: carga.desvioRotaPercentual,
          fluxoStatus: carga.fluxoStatus,
          checkpointHistorico: carga.checkpointHistorico,
          documentos: carga.documentos,
          motorista: carga.motorista,
          veiculo: carga.veiculo,
          tempoArmazenagemHoras: carga.tempoArmazenagemHoras,
          tempoTransitoHoras: carga.tempoTransitoHoras,
          distanciaKm: carga.distanciaKm,
          freteIda: carga.freteIda,
          freteVolta: carga.freteVolta,
          percentualLogistica: carga.percentualLogistica,
          contentorVazio: carga.contentorVazio,
          valorFrete: carga.valorFrete || carga.valorTotal || 0,
          taxasPortuarias: carga.taxasPortuarias,
          despesasOperacionais: carga.despesasOperacionais,
          custoCarga: carga.custoCarga,
          comissaoCalculada: carga.comissaoCalculada,
          moedaComissao: carga.moedaComissao,
          custosExtras: carga.custosExtras,
          margemLucro: carga.margemLucro,
          seguro: carga.seguro,
          ocorrencias: carga.ocorrencias,
          auditorias: carga.auditorias,
          checklist: carga.checklist,
          viagemId: carga.viagemId,
          observacoes: carga.observacoes,
          criadoPor: carga.criadoPor,
          atualizadoPor: carga.atualizadoPor,
          // Informações da fatura paga
          faturaPaga: carga.fatura ? {
            numeroFatura: carga.fatura.numeroFatura,
            valorTotal: carga.fatura.valorTotal,
            dataEmissao: carga.fatura.dataEmissao,
            status: carga.fatura.status
          } : null
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

  const calcularDistancia = (origem: any, destino: any): number => {
    const distancias = [150, 280, 420, 560, 750, 890, 1200];
    return distancias[Math.floor(Math.random() * distancias.length)];
  };

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
      case "urgente":
      case "alta":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800";
      case "média":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800";
      case "baixa":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border border-gray-200 dark:border-gray-700";
    }
  };

  const getNaturezaColor = (natureza: string) => {
    switch (natureza.toLowerCase()) {
      case "perigosa":
        return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300";
      case "sensível":
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
      case "fragil":
        return "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300";
      default:
        return "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      minimumFractionDigits: 0,
    }).format(valor);
  };

  const formatarData = (data: string) => {
    if (!data) return "Não definida";
    return new Date(data).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Filtrar cargas baseado nos filtros selecionados
  const cargasFiltradas = cargasDisponiveis.filter((carga) => {
    const prioridadeMatch =
      filtroPrioridade === "todas" ||
      carga.prioridade.toLowerCase() === filtroPrioridade;
    const tipoMatch =
      filtroTipo === "todos" ||
      carga.tipoCarga.toLowerCase().includes(filtroTipo);
    return prioridadeMatch && tipoMatch;
  });

  const tiposCargaUnicos = [
    ...new Set(cargasDisponiveis.map((c) => c.tipoCarga)),
  ];
  const prioridadesUnicas = [
    ...new Set(cargasDisponiveis.map((c) => c.prioridade)),
  ];

  // Componente de filtros avançados
  const FiltrosAvancados = () => (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cliente
          </label>
          <input
            type="text"
            value={filtrosFaturaPaga.clienteNome || ''}
            onChange={(e) => setFiltrosFaturaPaga({...filtrosFaturaPaga, clienteNome: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            placeholder="Nome do cliente"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Código Carga
          </label>
          <input
            type="text"
            value={filtrosFaturaPaga.codigoCarga || ''}
            onChange={(e) => setFiltrosFaturaPaga({...filtrosFaturaPaga, codigoCarga: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            placeholder="Código da carga"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data Início
          </label>
          <input
            type="date"
            value={filtrosFaturaPaga.dataInicio || ''}
            onChange={(e) => setFiltrosFaturaPaga({...filtrosFaturaPaga, dataInicio: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data Fim
          </label>
          <input
            type="date"
            value={filtrosFaturaPaga.dataFim || ''}
            onChange={(e) => setFiltrosFaturaPaga({...filtrosFaturaPaga, dataFim: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={limparFiltros}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          Limpar Filtros
        </button>
        <button
          onClick={aplicarFiltrosFaturaPaga}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );

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
      <ModalEditarCarga
        carga={cargaParaEditar}
        isOpen={modalEditarAberto}
        onClose={() => {
          setModalEditarAberto(false);
          setCargaParaEditar(null);
        }}
        onSave={handleSalvarCarga}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Cargas com Faturas Pagas
              <span className="ml-2 text-green-600">
                ({cargasFiltradas.length})
              </span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Cargas disponíveis com pagamento confirmado
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setMostrarFiltrosAvancados(!mostrarFiltrosAvancados)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {mostrarFiltrosAvancados ? 'Esconder Filtros' : 'Filtros Avançados'}
            </button>

            <select
              value={filtroPrioridade}
              onChange={(e) => setFiltroPrioridade(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="todas">Todas as Prioridades</option>
              {prioridadesUnicas.map((prioridade) => (
                <option key={prioridade} value={prioridade.toLowerCase()}>
                  {prioridade}
                </option>
              ))}
            </select>

            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="todos">Todos os Tipos</option>
              {tiposCargaUnicos.map((tipo) => (
                <option key={tipo} value={tipo.toLowerCase()}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
        </div>

        {mostrarFiltrosAvancados && <FiltrosAvancados />}

        {cargasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhuma carga com fatura paga disponível
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {cargasDisponiveis.length === 0
                ? "Não há cargas com faturas pagas no momento."
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
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                      {carga.codigo}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {carga.cliente}
                    </p>
                    {/* Badge de fatura paga */}
                    <div className="inline-flex items-center mt-1 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs">
                      <FiCheckCircle className="w-3 h-3 mr-1" />
                      Fatura Paga
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPrioridadeColor(
                        carga.prioridade
                      )}`}
                    >
                      {carga.prioridade.charAt(0).toUpperCase() +
                        carga.prioridade.slice(1)}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${getNaturezaColor(
                        carga.naturezaCarga
                      )}`}
                    >
                      {carga.naturezaCarga}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <FiMapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">{carga.origem.cidade}</span>
                    <span className="mx-2">→</span>
                    <span className="font-medium">{carga.destino.cidade}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Distância:
                      </span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {carga.distanciaKm} km
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Peso:
                      </span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {(carga.pesoBruto / 1000).toFixed(1)} ton
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Volume:
                      </span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {carga.volume} m³
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Tipo:
                      </span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {carga.tipoCarga}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-sm">
                      <FiClock className="w-4 h-4 mr-1 text-orange-500" />
                      <span className="text-gray-500 dark:text-gray-400">
                        Coleta:
                      </span>
                    </div>
                    <span
                      className={`font-medium ${
                        carga.tempoRestante === "Expirado" ||
                        carga.tempoRestante === "Hoje"
                          ? "text-red-600"
                          : "text-orange-600"
                      }`}
                    >
                      {carga.tempoRestante}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {carga.descricao}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Requisitos:
                    </p>
                    {carga.requisitos?.map((req, index) => (
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

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <div className="text-lg font-bold text-green-600">
                      {formatarMoeda(carga.valorFrete)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Entrega: {formatarData(carga.dataEntregaPrevista)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {carga.status === "planeada" && (
                      <button
                        onClick={() => handleAceitarCarga(carga.codigo)}
                        disabled={aceitandoCargaId === carga.codigo}
                        className={`
                      px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors
                      ${
                        aceitandoCargaId === carga.codigo
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }
                    `}
                      >
                        {aceitandoCargaId === carga.codigo ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Aceitando...</span>
                          </>
                        ) : (
                          <>
                            <FiCheckCircle className="w-4 h-4" />
                            <span>Aceitar Carga</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}