/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import FotoVistoriaUploader from "./FotoVistoriaUploader";
import Image from "next/image";

// Tipos baseados no schema
interface ChecklistItem {
  descricao: string;
  status: string;
  observacao?: string;
}
interface ExecucaoFormState {
  checklist: ChecklistItem[];
  observacoes: string;
  resultado: string;
  fotos: EvidenciaFoto[];
}

interface Vistoriador {
  id: string;
  nome: string;
  matricula: string;
}
interface NaoConformidade {
  descricao: string;
  tipo: "critica" | "grave" | "moderada" | "leve";
  status: "aberta" | "em_correcao" | "corrigida" | "verificada" | "fechada";
}

interface EvidenciaFoto {
  url: string;
  descricao: string;
}

interface Vistoria {
  codigo: string;
  tipo:
    | "preventiva"
    | "corretiva"
    | "seguro"
    | "rotina"
    | "extraordinaria"
    | "transferencia";
  tipoObjeto: "camiao" | "carga" | "equipamento" | "instalacao";
  objetoId: string;
  objetoDetalhes?: {
    camiao?: {
      camiaoId: number;
      matricula: string;
      marca: string;
      modelo: string;
      categoriaInspecao?: "A" | "B" | "C";
      dataProximaInspecao?: string;
    };
    carga?: {
      codigo: string;
      descricao: string;
      tipoCarga: string;
      pesoBruto: number;
      valorMercadoria: number;
    };
  };
  descricao: string;
  dataAgendada: string;
  dataExecucao?: string;
  dataValidade?: string;
  local: {
    nome: string;
    tipo:
      | "ponto_fixo"
      | "local_cliente"
      | "via_publica"
      | "terminal"
      | "armazem";
    endereco?: string;
  };
  vistoriadorId: string;
  vistoriadorDetalhes?: {
    nome: string;
    matricula: string;
  };
  prioridade: "baixa" | "media" | "alta" | "urgente";
  motivo?: string;
  status:
    | "agendada"
    | "confirmada"
    | "em_andamento"
    | "concluida"
    | "cancelada"
    | "reagendada"
    | "pendente_aprovacao";
  resultado?:
    | "aprovado"
    | "aprovado_com_ressalvas"
    | "reprovado"
    | "pendente"
    | "inconclusivo";
  checklist?: {
    tipo: "padrao" | "personalizado" | "seguradora" | "regulamentar";
    itens: ChecklistItem[];
    percentualAprovacao?: number;
  };
  naoConformidades?: NaoConformidade[];
  evidencias?: {
    fotos: EvidenciaFoto[];
  };
  observacoes?: string;
  calculos?: {
    proximaVistoria?: string;
    pontuacao?: {
      total: number;
      maxima: number;
      percentual: number;
    };
    resultadoCalculado?: string;
    valida?: boolean;
    diasExpiracao?: number;
    atrasada?: boolean;
    tempoExecucao?: number;
    eficiencia?: number;
  };
}

interface Camiao {
  camiaoId: number;
  matricula: string;
  marca: string;
  modelo: string;
  nivelInspecao?: {
    categoria: "A" | "B" | "C";
    dataProximaInspecao?: string;
  };
  especificacoes: {
    cargaUtil: number;
    numEixos: number;
  };
}

interface Carga {
  codigo: string;
  descricao: string;
  tipoCarga: string;
  pesoBruto: number;
  valorMercadoria: number;
  status: string;
}
// Interface para o Modal de Detalhes
interface VistoriaDetailModalProps {
  vistoria: Vistoria | null;
  isOpen: boolean;
  onClose: () => void;
}

// Componente Modal de Detalhes
const VistoriaDetailModal: React.FC<VistoriaDetailModalProps> = ({
  vistoria,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !vistoria) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluida":
        return "bg-green-100 text-green-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      case "em_andamento":
        return "bg-yellow-100 text-yellow-800";
      case "agendada":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getResultadoColor = (resultado?: string) => {
    switch (resultado) {
      case "aprovado":
        return "bg-green-100 text-green-800";
      case "reprovado":
        return "bg-red-100 text-red-800";
      case "aprovado_com_ressalvas":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getNaoConformidadeColor = (tipo: string) => {
    switch (tipo) {
      case "critica":
        return "bg-red-100 text-red-800";
      case "grave":
        return "bg-orange-100 text-orange-800";
      case "moderada":
        return "bg-yellow-100 text-yellow-800";
      case "leve":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Detalhes da Vistoria
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Código: {vistoria.codigo}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 rounded-lg hover:text-gray-500 hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {/* Informações Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Informações Gerais
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tipo:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {vistoria.tipo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        vistoria.status
                      )}`}
                    >
                      {vistoria.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Resultado:</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getResultadoColor(
                        vistoria.resultado
                      )}`}
                    >
                      {vistoria.resultado || "Não definido"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Prioridade:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {vistoria.prioridade}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Datas
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Agendada:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(vistoria.dataAgendada).toLocaleDateString()}{" "}
                      {new Date(vistoria.dataAgendada).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {vistoria.dataExecucao && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Executada:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(vistoria.dataExecucao).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {vistoria.dataValidade && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Validade:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(vistoria.dataValidade).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Objeto da Vistoria */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Objeto da Vistoria
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                {vistoria.objetoDetalhes?.camiao ? (
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Caminhão: {vistoria.objetoDetalhes.camiao.matricula}
                    </p>
                    <p className="text-sm text-gray-600">
                      {vistoria.objetoDetalhes.camiao.marca}{" "}
                      {vistoria.objetoDetalhes.camiao.modelo}
                    </p>
                    {vistoria.objetoDetalhes.camiao.categoriaInspecao && (
                      <p className="text-sm text-gray-600">
                        Categoria:{" "}
                        {vistoria.objetoDetalhes.camiao.categoriaInspecao}
                      </p>
                    )}
                  </div>
                ) : vistoria.objetoDetalhes?.carga ? (
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Carga: {vistoria.objetoDetalhes.carga.codigo}
                    </p>
                    <p className="text-sm text-gray-600">
                      {vistoria.objetoDetalhes.carga.descricao}
                    </p>
                    <p className="text-sm text-gray-600">
                      Tipo: {vistoria.objetoDetalhes.carga.tipoCarga} | Peso:{" "}
                      {vistoria.objetoDetalhes.carga.pesoBruto}kg
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    Objeto ID: {vistoria.objetoId}
                  </p>
                )}
              </div>
            </div>

            {/* Local e Vistoriador */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Local
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    {vistoria.local.nome}
                  </p>
                  <p className="text-sm text-gray-600">
                    Tipo: {vistoria.local.tipo}
                  </p>
                  {vistoria.local.endereco && (
                    <p className="text-sm text-gray-600">
                      {vistoria.local.endereco}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Vistoriador
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    {vistoria.vistoriadorDetalhes?.nome ||
                      vistoria.vistoriadorId}
                  </p>
                  {vistoria.vistoriadorDetalhes?.matricula && (
                    <p className="text-sm text-gray-600">
                      Matrícula: {vistoria.vistoriadorDetalhes.matricula}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Checklist */}
            {vistoria.checklist?.itens &&
              vistoria.checklist.itens.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-500">
                      Checklist
                    </h4>
                    {vistoria.checklist.percentualAprovacao && (
                      <span className="text-sm font-medium text-gray-900">
                        Aprovação:{" "}
                        {vistoria.checklist.percentualAprovacao.toFixed(0)}%
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {vistoria.checklist.itens.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-gray-900">
                            {item.descricao}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              item.status === "ok"
                                ? "bg-green-100 text-green-800"
                                : item.status === "nok"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.status.toUpperCase()}
                          </span>
                        </div>
                        {item.observacao && (
                          <p className="mt-1 text-sm text-gray-600">
                            Obs: {item.observacao}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Não Conformidades */}
            {vistoria.naoConformidades &&
              vistoria.naoConformidades.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Não Conformidades
                  </h4>
                  <div className="space-y-2">
                    {vistoria.naoConformidades.map((nc, index) => (
                      <div
                        key={index}
                        className="bg-red-50 p-3 rounded-lg border border-red-100"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {nc.descricao}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${getNaoConformidadeColor(
                              nc.tipo
                            )}`}
                          >
                            {nc.tipo.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Status: {nc.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Evidências Fotográficas */}
            {vistoria.evidencias?.fotos &&
              vistoria.evidencias.fotos.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Evidências Fotográficas ({vistoria.evidencias.fotos.length})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vistoria.evidencias.fotos.map((foto, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg overflow-hidden"
                      >
                        <div className="aspect-square relative">
                          <Image
                            src={foto.url || "/placeholder.svg"}
                            alt={foto.descricao || `Evidência ${index + 1}`}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                            onError={() => {}}
                          />
                        </div>
                        {foto.descricao && (
                          <p className="p-2 text-xs text-gray-600 truncate">
                            {foto.descricao}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Observações */}
            {vistoria.observacoes && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Observações
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {vistoria.observacoes}
                  </p>
                </div>
              </div>
            )}

            {/* Cálculos (se disponíveis) */}
            {vistoria.calculos && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Informações Calculadas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vistoria.calculos.proximaVistoria && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-600 font-medium">
                        Próxima Vistoria
                      </p>
                      <p className="text-sm text-gray-900">
                        {new Date(
                          vistoria.calculos.proximaVistoria
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {vistoria.calculos.diasExpiracao !== undefined && (
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <p className="text-xs text-amber-600 font-medium">
                        Dias até Expiração
                      </p>
                      <p className="text-sm text-gray-900">
                        {vistoria.calculos.diasExpiracao} dias
                      </p>
                    </div>
                  )}
                  {vistoria.calculos.pontuacao && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-600 font-medium">
                        Pontuação
                      </p>
                      <p className="text-sm text-gray-900">
                        {vistoria.calculos.pontuacao.total}/
                        {vistoria.calculos.pontuacao.maxima} (
                        {vistoria.calculos.pontuacao.percentual.toFixed(1)}%)
                      </p>
                    </div>
                  )}
                  {vistoria.calculos.tempoExecucao && (
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-purple-600 font-medium">
                        Tempo de Execução
                      </p>
                      <p className="text-sm text-gray-900">
                        {vistoria.calculos.tempoExecucao} minutos
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Fechar
            </button>
            <button
              onClick={() => {
                // Aqui você pode implementar a geração de relatório
                alert("Gerar relatório da vistoria " + vistoria.codigo);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FormDataState {
  tipo: string;
  subtipo: string; // ADICIONAR ESTE CAMPO
  tipoObjeto: string;
  objetoId: string;
  descricao: string;
  dataAgendada: string;
  horaAgendada: string;
  local: {
    nome: string;
    tipo:
      | "ponto_fixo"
      | "local_cliente"
      | "via_publica"
      | "terminal"
      | "armazem";
    endereco: string;
  };
  vistoriadorId: string;
  prioridade: "baixa" | "media" | "alta" | "urgente";
  motivo: string;
  naturezaVistoria:
    | "obrigatoria"
    | "programada"
    | "solicitada"
    | "emergencial"
    | "auditoria"; // Expandir opções
}

interface ExecucaoFormState {
  checklist: ChecklistItem[];
  observacoes: string;
  resultado: string;
  fotos: EvidenciaFoto[];
}

interface FiltrosState {
  dataInicio: string;
  dataFim: string;
  tipo: string;
  status: string;
  resultado: string;
}

interface ApiResponse<T = any> {
  returnCode: number;
  returnMsg: string;
  data: T;
}

export const VistoriaPanel = ({
  activeVistoriaForm,
  setActiveVistoriaForm,
}: {
  activeVistoriaForm: string;
  setActiveVistoriaForm: (value: string) => void;
}) => {
  const [modalDetalhes, setModalDetalhes] = useState<{
    isOpen: boolean;
    vistoria: Vistoria | null;
  }>({
    isOpen: false,
    vistoria: null,
  });
  const [formData, setFormData] = useState<FormDataState>({
    tipo: "",
    subtipo: "", // ADICIONAR ESTE CAMPO
    tipoObjeto: "",
    objetoId: "",
    descricao: "",
    dataAgendada: "",
    horaAgendada: "",
    local: {
      nome: "",
      tipo: "ponto_fixo",
      endereco: "",
    },
    vistoriadorId: "",
    prioridade: "media",
    motivo: "",
    naturezaVistoria: "programada", // Valor padrão correto
  });
  // Adicione este state
  const [vistoriadores, setVistoriadores] = useState<Vistoriador[]>([
    { id: "VIST-001", nome: "João Silva", matricula: "M001" },
    { id: "VIST-002", nome: "Maria Santos", matricula: "M002" },
    { id: "VIST-003", nome: "Carlos Oliveira", matricula: "M003" },
    { id: "VIST-004", nome: "Ana Pereira", matricula: "M004" },
  ]);
  const [execucaoForm, setExecucaoForm] = useState<ExecucaoFormState>({
    checklist: [],
    observacoes: "",
    resultado: "",
    fotos: [],
  });

  const [camioes, setCamioes] = useState<Camiao[]>([]);
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [vistorias, setVistorias] = useState<Vistoria[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filtros, setFiltros] = useState<FiltrosState>({
    dataInicio: "",
    dataFim: "",
    tipo: "",
    status: "",
    resultado: "",
  });

  const buscarDetalhesVistoria = async (codigo: string) => {
    try {
      const response = await axios.post<ApiResponse<Vistoria>>(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getVistoriaDetail",
        { codigo }
      );

      if (response.data.returnCode === 200) {
        setModalDetalhes({
          isOpen: true,
          vistoria: response.data.data,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      alert("Erro ao buscar detalhes da vistoria");
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    carregarCamioes();
    carregarCargas();
    carregarVistorias();
  }, []);

  // Carregar vistorias quando filtros mudam
  useEffect(() => {
    if (
      activeVistoriaForm === "historico" ||
      activeVistoriaForm === "relatorios"
    ) {
      carregarVistorias();
    }
  }, [filtros, activeVistoriaForm]);

  const handleFotosUploaded = (fotos: EvidenciaFoto[]) => {
    setExecucaoForm((prev) => ({
      ...prev,
      fotos: [...prev.fotos, ...fotos],
    }));
    alert(`${fotos.length} foto(s) enviada(s) com sucesso!`);
  };

  const carregarCamioes = async (): Promise<void> => {
    try {
      const response = await axios.post<ApiResponse<{ list: Camiao[] }>>(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCamiaoList",
        {
          curPage: 1,
          pageSize: 100,
        }
      );
      if (response.data.returnCode === 200) {
        setCamioes(response.data.data.list);
      }
    } catch (error) {
      console.error("Erro ao carregar caminhões:", error);
    }
  };

  const carregarCargas = async (): Promise<void> => {
    try {
      const response = await axios.post<ApiResponse<{ list: Carga[] }>>(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCargaList",
        {
          curPage: 1,
          pageSize: 100,
          status: "em_transito",
        }
      );
      if (response.data.returnCode === 200) {
        setCargas(response.data.data.list);
      }
    } catch (error) {
      console.error("Erro ao carregar cargas:", error);
    }
  };

  const carregarVistorias = async (): Promise<void> => {
    try {
      const response = await axios.post<ApiResponse<{ list: Vistoria[] }>>(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getVistoriaList",
        {
          curPage: 1,
          pageSize: 20,
          ...filtros,
        }
      );
      if (response.data.returnCode === 200) {
        setVistorias(response.data.data.list);
      }
    } catch (error) {
      console.error("Erro ao carregar vistorias:", error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    if (name.startsWith("local.")) {
      const field = name.split(".")[1] as keyof FormDataState["local"];
      setFormData((prev) => ({
        ...prev,
        local: {
          ...prev.local,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Quando o tipo de objeto muda, atualizar subtipo automaticamente
      if (name === "tipoObjeto") {
        setFormData((prev) => ({
          ...prev,
          objetoId: "",
          subtipo:
            value === "camiao" ? "veicular" : value === "carga" ? "carga" : "", // Auto-preenche subtipo
        }));
      }
    }
  };

  const handleAgendarVistoria = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      // DEBUG: Mostrar todos os valores
      console.log("DEBUG - Valores do formulário:", {
        tipo: formData.tipo,
        tipoObjeto: formData.tipoObjeto,
        objetoId: formData.objetoId,
        descricao: formData.descricao,
        dataAgendada: formData.dataAgendada,
        horaAgendada: formData.horaAgendada,
        local_nome: formData.local.nome,
        vistoriadorId: formData.vistoriadorId, // ATENÇÃO: tem um typo aqui?
        naturezaVistoria: formData.naturezaVistoria,
      });

      // Validar campos obrigatórios CONFORME A ROTA (não conforme o schema completo)
      if (
        !formData.tipo ||
        !formData.tipoObjeto ||
        !formData.objetoId ||
        !formData.descricao ||
        !formData.dataAgendada ||
        !formData.horaAgendada ||
        !formData.local.nome ||
        !formData.vistoriadorId
      ) {
        alert("Preencha todos os campos obrigatórios!");
        console.error("Campos faltando:", {
          tipo: !formData.tipo,
          tipoObjeto: !formData.tipoObjeto,
          objetoId: !formData.objetoId,
          descricao: !formData.descricao,
          dataAgendada: !formData.dataAgendada,
          horaAgendada: !formData.horaAgendada,
          local_nome: !formData.local.nome,
          vistoriadorId: !formData.vistoriadorId,
        });
        setLoading(false);
        return;
      }

      // Determinar objeto da vistoria
      let objetoDetalhes: any = {};
      if (formData.tipoObjeto === "camiao") {
        const camiao = camioes.find(
          (c) => c.camiaoId.toString() === formData.objetoId
        );
        if (!camiao) {
          alert("Caminhão não encontrado!");
          setLoading(false);
          return;
        }

        objetoDetalhes = {
          camiao: {
            camiaoId: camiao.camiaoId,
            matricula: camiao.matricula,
            marca: camiao.marca,
            modelo: camiao.modelo,
            categoriaInspecao: camiao.nivelInspecao?.categoria || "B",
          },
        };
      } else if (formData.tipoObjeto === "carga") {
        const carga = cargas.find((c) => c.codigo === formData.objetoId);
        if (!carga) {
          alert("Carga não encontrada!");
          setLoading(false);
          return;
        }

        objetoDetalhes = {
          carga: {
            codigo: carga.codigo,
            descricao: carga.descricao,
            tipoCarga: carga.tipoCarga,
            pesoBruto: carga.pesoBruto || 0,
            valorMercadoria: carga.valorMercadoria || 0,
          },
        };
      }

      // Combinar data e hora
      const dataAgendada = new Date(
        `${formData.dataAgendada}T${formData.horaAgendada}:00`
      );
      if (isNaN(dataAgendada.getTime())) {
        alert("Data ou hora inválida!");
        setLoading(false);
        return;
      }

      // GERAR vistoriaId NO FRONTEND (temporário)
      const vistoriaId = `VST-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 6)
        .toUpperCase()}`;
      const codigo = vistoriaId; // Usar o mesmo como código

      // Dados completos incluindo vistoriaId
      const vistoriaData = {
        // Campos obrigatórios do schema
        vistoriaId: vistoriaId, // ADICIONAR ESTE CAMPO
        codigo: codigo, // ADICIONAR ESTE CAMPO
        nomeEmpresa: "Mega Centro e Logistica",

        // Campos do formulário
        tipo: formData.tipo,
        tipoObjeto: formData.tipoObjeto,
        objetoId: formData.objetoId,
        descricao: formData.descricao,
        dataAgendada: dataAgendada.toISOString(),
        vistoriadorId: formData.vistoriadorId,
        naturezaVistoria: formData.naturezaVistoria || "programada",

        // Local básico
        local: {
          nome: formData.local.nome,
          tipo: formData.local.tipo || "ponto_fixo",
        },

        // Prioridade
        prioridade: formData.prioridade || "media",

        // Motivo (opcional)
        motivo: formData.motivo || "",

        // Status inicial
        status: "agendada",

        // Subtipo baseado no tipoObjeto
        subtipo:
          formData.tipoObjeto === "camiao"
            ? "veicular"
            : formData.tipoObjeto === "carga"
            ? "carga"
            : "",

        // Categoria padrão
        categoria: "B",

        // Objeto detalhes (se houver)
        ...(Object.keys(objetoDetalhes).length > 0 && { objetoDetalhes }),

        // Campos com valores padrão
        periodoValidadeMeses: 6,
        tempoPrevistoMinutos: 60,
      };

      console.log(
        "Dados FINAIS enviados para API:",
        JSON.stringify(vistoriaData, null, 2)
      );

      const response = await axios.post<ApiResponse<Vistoria>>(
        "https://desktop-api-4f850b3f9733.herokuapp.com/createVistoria",
        vistoriaData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.returnCode === 201) {
        alert("Vistoria agendada com sucesso!");
        console.log("Resposta da API:", response.data);

        // Resetar formulário
        setFormData({
          tipo: "",
          subtipo: "",
          tipoObjeto: "",
          objetoId: "",
          descricao: "",
          dataAgendada: "",
          horaAgendada: "",
          local: {
            nome: "",
            tipo: "ponto_fixo",
            endereco: "",
          },
          vistoriadorId: "",
          prioridade: "media",
          motivo: "",
          naturezaVistoria: "programada",
        });

        carregarVistorias();
      } else {
        throw new Error(response.data.returnMsg || "Erro ao agendar vistoria");
      }
    } catch (error: any) {
      console.error("Erro detalhado ao agendar vistoria:", error);

      // Log EXTREMAMENTE detalhado
      if (error.response) {
        console.error("=== ERRO DA API ===");
        console.error("Status:", error.response.status);
        console.error("Mensagem:", error.response.data?.returnMsg);
        console.error("Erro completo:", error.response.data);
        console.error("=== FIM ERRO ===");

        // Tente mostrar mensagens específicas
        if (error.response.data?.errors) {
          console.error("Erros de validação:", error.response.data.errors);
          alert(
            `Erros de validação:\n${JSON.stringify(
              error.response.data.errors,
              null,
              2
            )}`
          );
        } else if (error.response.data?.message) {
          alert(`Erro: ${error.response.data.message}`);
        } else {
          alert(
            `Erro ${error.response.status}: ${
              error.response.data?.returnMsg || "Erro desconhecido"
            }`
          );
        }
      } else if (error.request) {
        console.error("Request feito:", error.request);
        alert("Erro de conexão: Não foi possível conectar ao servidor");
      } else {
        console.error("Erro config:", error.message);
        alert(`Erro: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExecutarVistoria = async (
    vistoriaCodigo: string
  ): Promise<void> => {
    setLoading(true);

    try {
      // Validar se há fotos
      if (execucaoForm.fotos.length === 0) {
        const confirmar = window.confirm(
          "Nenhuma foto foi adicionada à vistoria. Deseja continuar sem evidências fotográficas?"
        );
        if (!confirmar) {
          setLoading(false);
          return;
        }
      }

      // Preparar dados para envio na estrutura QUE O BACKEND ESPERA
      const vistoriaData = {
        codigo: vistoriaCodigo,
        checklist: {
          tipo: "padrao" as const,
          itens: execucaoForm.checklist,
        },
        observacoes: execucaoForm.observacoes,
        resultado: execucaoForm.resultado,
        // ENVIAR COMO "fotos" NO NÍVEL RAIZ (não dentro de evidencias)
        fotos: execucaoForm.fotos.map((foto) => ({
          url: foto.url,
          descricao: foto.descricao || "",
          // O backend vai adicionar a data automaticamente
        })),
      };

      console.log(
        "DEBUG - Enviando vistoria:",
        JSON.stringify(vistoriaData, null, 2)
      );

      const response = await axios.post<ApiResponse<Vistoria>>(
        "https://desktop-api-4f850b3f9733.herokuapp.com/executarVistoria",
        vistoriaData
      );

      if (response.data.returnCode === 200) {
        alert("✅ Vistoria executada com sucesso!");
        console.log("DEBUG - Resposta da API:", response.data.data);

        // Verificar se as fotos foram salvas
        if (response.data.data.evidencias?.fotos) {
          console.log("Fotos salvas:", response.data.data.evidencias.fotos);
        } else {
          console.warn("Aviso: Fotos não aparecem na resposta");
        }

        // Resetar formulário
        setExecucaoForm({
          checklist: [],
          observacoes: "",
          resultado: "",
          fotos: [],
        });

        // Recarregar vistorias
        carregarVistorias();
      } else {
        throw new Error(response.data.returnMsg);
      }
    } catch (error: any) {
      console.error("Erro ao executar vistoria:", error);

      // Log detalhado do erro
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Mensagem:", error.response.data?.returnMsg);
        console.error("Dados:", error.response.data);
      }

      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      alert(`❌ Erro ao executar vistoria: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarVistoria = async (
    codigo: string,
    motivo: string
  ): Promise<void> => {
    try {
      const response = await axios.post<ApiResponse<Vistoria>>(
        "https://desktop-api-4f850b3f9733.herokuapp.com/cancelarVistoria",
        {
          codigo,
          motivoCancelamento: motivo,
        }
      );

      if (response.data.returnCode === 200) {
        alert("Vistoria cancelada com sucesso!");
        carregarVistorias();
      }
    } catch (error) {
      console.error("Erro ao cancelar vistoria:", error);
      alert("Erro ao cancelar vistoria");
    }
  };

  const handleReagendarVistoria = async (
    codigo: string,
    novaData: string,
    novaHora: string,
    motivo: string
  ): Promise<void> => {
    try {
      const response = await axios.post<ApiResponse<Vistoria>>(
        "https://desktop-api-4f850b3f9733.herokuapp.com/reagendarVistoria",
        {
          codigo,
          novaData,
          novaHora,
          motivo,
        }
      );

      if (response.data.returnCode === 200) {
        alert("Vistoria reagendada com sucesso!");
        carregarVistorias();
      }
    } catch (error) {
      console.error("Erro ao reagendar vistoria:", error);
      alert("Erro ao reagendar vistoria");
    }
  };

  const handleGerarRelatorio = async (): Promise<void> => {
    try {
      const response = await axios.post<
        ApiResponse<{
          geral?: {
            totalVistorias: number;
            taxaAprovacao: number;
            tempoMedioExecucao: number;
          };
          porTipo?: Array<{
            _id: string;
            count: number;
            mediaPontuacao: number;
            taxaAprovacao: number;
          }>;
          porVistoriador?: Array<{
            _id: string;
            count: number;
            nome: string;
            aprovadas: number;
            mediaTempo: number;
            eficienciaMedia: number;
          }>;
        }>
      >(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getVistoriaStats",
        filtros
      );

      if (response.data.returnCode === 200) {
        const stats = response.data.data;

        // Formatar relatório
        const relatorio = {
          periodo: `${filtros.dataInicio || "Início"} à ${
            filtros.dataFim || "Fim"
          }`,
          totalVistorias: stats.geral?.totalVistorias || 0,
          taxaAprovacao: stats.geral?.taxaAprovacao
            ? `${(stats.geral.taxaAprovacao * 100).toFixed(1)}%`
            : "0%",
          tempoMedio: `${stats.geral?.tempoMedioExecucao?.toFixed(0) || 0} min`,
          porTipo: stats.porTipo || [],
          topVistoriadores: stats.porVistoriador || [],
        };

        console.log("Relatório:", relatorio);
        alert("Relatório gerado com sucesso! Veja o console para detalhes.");
      }
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Erro ao gerar relatório");
    }
  };

  const handleAddNaoConformidade = async (
    codigoVistoria: string,
    descricao: string,
    tipo: string
  ): Promise<void> => {
    try {
      const response = await axios.post<ApiResponse<Vistoria>>(
        "https://desktop-api-4f850b3f9733.herokuapp.com/addNaoConformidade",
        {
          codigo: codigoVistoria,
          naoConformidadeData: {
            descricao,
            tipo: tipo as NaoConformidade["tipo"],
            status: "aberta" as const,
          },
        }
      );

      if (response.data.returnCode === 200) {
        alert("Não conformidade registrada!");
        carregarVistorias();
      }
    } catch (error) {
      console.error("Erro ao adicionar não conformidade:", error);
      alert("Erro ao registrar não conformidade");
    }
  };

  const handleCalcularProximaVistoria = async (
    tipo: string,
    categoria: string,
    dataUltima: string
  ): Promise<void> => {
    try {
      const response = await axios.post<
        ApiResponse<{
          tipo: string;
          categoria: string;
          dataUltima: string;
          periodicidadeMeses: number;
          proximaData: string;
          diasRestantes: number;
        }>
      >(
        "https://desktop-api-4f850b3f9733.herokuapp.com/calcularProximaVistoria",
        {
          tipo,
          categoria,
          dataUltima,
        }
      );

      if (response.data.returnCode === 200) {
        const data = response.data.data;
        alert(
          `Próxima vistoria: ${new Date(
            data.proximaData
          ).toLocaleDateString()}\nDias restantes: ${data.diasRestantes}`
        );
      }
    } catch (error) {
      console.error("Erro ao calcular próxima vistoria:", error);
    }
  };

  // Filtros para objetos com base no tipo
  const objetosFiltrados =
    formData.tipoObjeto === "camiao"
      ? camioes
      : formData.tipoObjeto === "carga"
      ? cargas
      : [];

  // Vistorias agendadas (para o painel)
  const vistoriasAgendadas = vistorias.filter(
    (v) => v.status === "agendada" || v.status === "confirmada"
  );
  const vistoriasEmAndamento = vistorias.filter(
    (v) => v.status === "em_andamento"
  );
  const vistoriasConcluidas = vistorias.filter((v) => v.status === "concluida");

  return (
    <div className="h-full flex flex-col">
      {/* Modal de Detalhes */}
      <VistoriaDetailModal
        vistoria={modalDetalhes.vistoria}
        isOpen={modalDetalhes.isOpen}
        onClose={() => setModalDetalhes({ isOpen: false, vistoria: null })}
      />
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-amber-500 text-white p-2 rounded-lg mr-3">
            🔍
          </span>
          Vistoria - Vistorias de Veículos e Cargas
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Agendamento, execução e relatórios de vistorias técnicas
        </p>
      </div>

      <div className="flex-1 p-6">
        {/* Menu de Navegação entre Formulários */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4 overflow-x-auto">
          {[
            "agendamento",
            "execucao",
            "relatorios",
            "historico",
            "graficos",
          ].map((form) => (
            <button
              key={form}
              onClick={() => setActiveVistoriaForm(form)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                activeVistoriaForm === form
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {form === "agendamento" && "📅 Agendamento"}
              {form === "execucao" && "🔧 Execução"}
              {form === "relatorios" && "📋 Relatórios"}
              {form === "historico" && "📊 Histórico"}
              {form === "graficos" && "📈 Gráficos"}
            </button>
          ))}
        </div>

        {/* Formulário de Agendamento */}
        {activeVistoriaForm === "agendamento" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-amber-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-amber-500 text-white p-2 rounded-lg mr-2">
                      📅
                    </span>
                    Agendamento de Vistoria
                  </h3>
                </div>
                <div className="p-6">
                  <form onSubmit={handleAgendarVistoria} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Vistoria *
                        </label>
                        <select
                          name="tipo"
                          value={formData.tipo}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="preventiva">Preventiva</option>
                          <option value="corretiva">Corretiva</option>
                          <option value="seguro">Para Seguro</option>
                          <option value="rotina">Rotina</option>
                          <option value="extraordinaria">Extraordinária</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Objeto *
                        </label>
                        <select
                          name="tipoObjeto"
                          value={formData.tipoObjeto}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="camiao">Caminhão</option>
                          <option value="carga">Carga</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {formData.tipoObjeto === "camiao"
                            ? "Caminhão *"
                            : formData.tipoObjeto === "carga"
                            ? "Carga *"
                            : "Objeto *"}
                        </label>
                        <select
                          name="objetoId"
                          value={formData.objetoId}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          required
                          disabled={!formData.tipoObjeto}
                        >
                          <option value="">Selecione</option>
                          {objetosFiltrados.map((obj) => {
                            // Verificar o tipo do objeto
                            const isCamiao = "camiaoId" in obj;
                            const isCarga = "codigo" in obj;

                            return (
                              <option
                                key={
                                  isCamiao
                                    ? (obj as Camiao).camiaoId
                                    : (obj as Carga).codigo
                                }
                                value={
                                  isCamiao
                                    ? (obj as Camiao).camiaoId
                                    : (obj as Carga).codigo
                                }
                              >
                                {isCamiao
                                  ? `${(obj as Camiao).matricula} - ${
                                      (obj as Camiao).marca
                                    } ${(obj as Camiao).modelo}`
                                  : `${(obj as Carga).codigo} - ${
                                      (obj as Carga).descricao
                                    }`}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prioridade
                        </label>
                        <select
                          name="prioridade"
                          value={formData.prioridade}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        >
                          <option value="baixa">Baixa</option>
                          <option value="media">Média</option>
                          <option value="alta">Alta</option>
                          <option value="urgente">Urgente</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data da Vistoria *
                        </label>
                        <input
                          type="date"
                          name="dataAgendada"
                          value={formData.dataAgendada}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hora *
                        </label>
                        <input
                          type="time"
                          name="horaAgendada"
                          value={formData.horaAgendada}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          required
                        />
                      </div>
                    </div>

                    {/* No formulário de agendamento, adicione este campo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Campo de subtipo - pode ser auto-preenchido baseado no tipoObjeto */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subtipo da Vistoria *
                        </label>
                        <select
                          name="subtipo"
                          value={formData.subtipo}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione</option>
                          <option
                            value="veicular"
                            disabled={formData.tipoObjeto !== "camiao"}
                          >
                            Veicular (para Caminhões)
                          </option>
                          <option
                            value="carga"
                            disabled={formData.tipoObjeto !== "carga"}
                          >
                            Carga (para Cargas)
                          </option>
                          <option value="equipamento">Equipamento</option>
                          <option value="instalacao">Instalação</option>
                          <option value="documental">Documental</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Natureza da Vistoria *
                        </label>
                        <select
                          name="naturezaVistoria"
                          value={formData.naturezaVistoria}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          required
                        >
                          <option value="programada">Programada</option>
                          <option value="obrigatoria">Obrigatória</option>
                          <option value="solicitada">Solicitada</option>
                          <option value="emergencial">Emergencial</option>
                          <option value="auditoria">Auditoria</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Local da Vistoria *
                        </label>
                        <input
                          type="text"
                          name="local.nome"
                          value={formData.local.nome}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          placeholder="Nome do local"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Local
                        </label>
                        <select
                          name="local.tipo"
                          value={formData.local.tipo}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        >
                          <option value="ponto_fixo">Ponto Fixo</option>
                          <option value="local_cliente">
                            Local do Cliente
                          </option>
                          <option value="via_publica">Via Pública</option>
                          <option value="terminal">Terminal</option>
                          <option value="armazem">Armazém</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vistoriador *
                        </label>
                        <select
                          name="vistoriadorId"
                          value={formData.vistoriadorId}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                          required
                        >
                          <option value="">Selecione um vistoriador</option>
                          {vistoriadores.map((vistoriador) => (
                            <option key={vistoriador.id} value={vistoriador.id}>
                              {vistoriador.nome} ({vistoriador.matricula})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição da Vistoria *
                      </label>
                      <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        placeholder="Descreva o objetivo e escopo da vistoria..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Motivo da Vistoria
                      </label>
                      <textarea
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-950"
                        placeholder="Descreva o motivo da vistoria..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            tipo: "",
                            subtipo: "",
                            tipoObjeto: "",
                            objetoId: "",
                            descricao: "",
                            dataAgendada: "",
                            horaAgendada: "",
                            local: {
                              nome: "",
                              tipo: "ponto_fixo",
                              endereco: "",
                            },
                            vistoriadorId: "",
                            prioridade: "media",
                            motivo: "",
                            naturezaVistoria: "programada",
                          })
                        }
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Agendando..." : "Agendar Vistoria"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Painel de Agendamentos */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Próximas Vistorias
                </h4>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {vistoriasAgendadas.map((vistoria) => (
                    <div
                      key={vistoria.codigo}
                      className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <p className="text-sm font-medium text-gray-950">
                        {vistoria.objetoDetalhes?.camiao?.matricula ||
                          vistoria.objetoDetalhes?.carga?.codigo ||
                          vistoria.objetoId}
                      </p>
                      <p className="text-xs text-gray-600">
                        {vistoria.tipo} •{" "}
                        {new Date(vistoria.dataAgendada).toLocaleDateString()}{" "}
                        {new Date(vistoria.dataAgendada).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        {vistoria.vistoriadorDetalhes?.nome ||
                          vistoria.vistoriadorId}
                      </p>
                      <div className="flex justify-between mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            vistoria.prioridade === "alta" ||
                            vistoria.prioridade === "urgente"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {vistoria.prioridade}
                        </span>
                        <button
                          onClick={() =>
                            handleCalcularProximaVistoria(
                              vistoria.tipo,
                              vistoria.objetoDetalhes?.camiao
                                ?.categoriaInspecao || "B",
                              vistoria.dataAgendada
                            )
                          }
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Calcular próxima
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Estatísticas do Mês
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vistorias Realizadas:</span>
                    <span className="font-semibold text-gray-950">
                      {vistoriasConcluidas.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agendadas:</span>
                    <span className="font-semibold text-gray-950">
                      {vistoriasAgendadas.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Em Andamento:</span>
                    <span className="font-semibold text-gray-950">
                      {vistoriasEmAndamento.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Execução */}
        {activeVistoriaForm === "execucao" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                      🔧
                    </span>
                    Execução de Vistoria
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selecione Vistoria para Executar
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                        onChange={(e) => {
                          const vistoria = vistoriasAgendadas.find(
                            (v) => v.codigo === e.target.value
                          );
                          if (vistoria) {
                            // Preencher checklist baseado no tipo de objeto
                            const checklistBase =
                              vistoria.tipoObjeto === "camiao"
                                ? [
                                    {
                                      descricao: "Pneus em bom estado",
                                      status: "pendente",
                                      observacao: "",
                                    },
                                    {
                                      descricao: "Sistema de freios OK",
                                      status: "pendente",
                                      observacao: "",
                                    },
                                    {
                                      descricao: "Luzes funcionando",
                                      status: "pendente",
                                      observacao: "",
                                    },
                                    {
                                      descricao: "Documentação em dia",
                                      status: "pendente",
                                      observacao: "",
                                    },
                                  ]
                                : [
                                    {
                                      descricao: "Embalagem íntegra",
                                      status: "pendente",
                                      observacao: "",
                                    },
                                    {
                                      descricao: "Lacres intactos",
                                      status: "pendente",
                                      observacao: "",
                                    },
                                    {
                                      descricao: "Peso conforme documentação",
                                      status: "pendente",
                                      observacao: "",
                                    },
                                    {
                                      descricao: "Documentação OK",
                                      status: "pendente",
                                      observacao: "",
                                    },
                                  ];
                            setExecucaoForm((prev) => ({
                              ...prev,
                              checklist: checklistBase,
                            }));
                          }
                        }}
                      >
                        <option value="">Selecione a vistoria</option>
                        {vistoriasAgendadas.map((v) => (
                          <option key={v.codigo} value={v.codigo}>
                            {v.codigo} -{" "}
                            {v.objetoDetalhes?.camiao?.matricula ||
                              v.objetoDetalhes?.carga?.codigo}{" "}
                            ({v.tipo})
                          </option>
                        ))}
                      </select>
                    </div>

                    {execucaoForm.checklist.length > 0 && (
                      <>
                        <div className="border-t border-gray-200 pt-6 text-gray-900">
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Checklist de Vistoria
                          </h4>

                          <div className="space-y-4">
                            {execucaoForm.checklist.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">
                                    {item.descricao}
                                  </p>
                                  <div className="mt-2 flex space-x-3">
                                    {["ok", "nok", "nao_aplicavel"].map(
                                      (status) => (
                                        <label
                                          key={status}
                                          className="flex items-center"
                                        >
                                          <input
                                            type="radio"
                                            name={`checklist-${index}`}
                                            value={status}
                                            checked={item.status === status}
                                            onChange={(e) => {
                                              const newChecklist = [
                                                ...execucaoForm.checklist,
                                              ];
                                              newChecklist[index].status =
                                                e.target.value;
                                              setExecucaoForm((prev) => ({
                                                ...prev,
                                                checklist: newChecklist,
                                              }));
                                            }}
                                            className="mr-2"
                                          />
                                          <span className="text-sm">
                                            {status === "ok"
                                              ? "OK"
                                              : status === "nok"
                                              ? "Não OK"
                                              : "Não Aplicável"}
                                          </span>
                                        </label>
                                      )
                                    )}
                                  </div>
                                  <textarea
                                    placeholder="Observações"
                                    value={item.observacao}
                                    onChange={(e) => {
                                      const newChecklist = [
                                        ...execucaoForm.checklist,
                                      ];
                                      newChecklist[index].observacao =
                                        e.target.value;
                                      setExecucaoForm((prev) => ({
                                        ...prev,
                                        checklist: newChecklist,
                                      }));
                                    }}
                                    className="mt-2 w-full px-2 py-1 text-sm border rounded"
                                    rows={2}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* SEÇÃO DE FOTOS - NOVA */}
                        <div className="border-t border-gray-200 pt-6">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-gray-900 flex items-center">
                              <span className="mr-2">📸</span>
                              Evidências Fotográficas
                            </h4>
                            <span className="text-sm text-gray-500">
                              {execucaoForm.fotos.length} foto(s) adicionada(s)
                            </span>
                          </div>

                          {/* Componente de Upload */}
                          <FotoVistoriaUploader
                            onFilesUploaded={handleFotosUploaded}
                            maxFiles={10}
                            maxSizeMB={5}
                          />

                          {/* Preview das Fotos já Enviadas */}
                          {execucaoForm.fotos.length > 0 && (
                            <>
                              <div className="mt-6">
                                <h5 className="font-medium text-gray-900 mb-3">
                                  Fotos da Vistoria
                                </h5>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-950">
                                  {execucaoForm.fotos.map((foto, index) => (
                                    <div key={index} className="relative group">
                                      <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                                        <Image
                                          src={foto.url || "/placeholder.svg"}
                                          alt={
                                            foto.descricao ||
                                            `Foto ${index + 1}`
                                          }
                                          width={500} // obrigatório
                                          height={500} // obrigatório
                                          className="w-full h-full object-cover"
                                          onError={() => {}}
                                        />
                                      </div>

                                      <div className="mt-1">
                                        <input
                                          type="text"
                                          placeholder="Descrição da foto"
                                          value={foto.descricao}
                                          onChange={(e) => {
                                            const novasFotos = [
                                              ...execucaoForm.fotos,
                                            ];
                                            novasFotos[index].descricao =
                                              e.target.value;
                                            setExecucaoForm((prev) => ({
                                              ...prev,
                                              fotos: novasFotos,
                                            }));
                                          }}
                                          className="w-full px-2 py-1 text-xs border rounded"
                                        />
                                      </div>

                                      <button
                                        onClick={() => {
                                          const novasFotos = [
                                            ...execucaoForm.fotos,
                                          ];
                                          novasFotos.splice(index, 1);
                                          setExecucaoForm((prev) => ({
                                            ...prev,
                                            fotos: novasFotos,
                                          }));
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        ×
                                      </button>

                                      <div className="mt-1">
                                        <a
                                          href={foto.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-blue-600 hover:text-blue-800 truncate block"
                                          title={foto.url}
                                        >
                                          🔗 Ver foto original
                                        </a>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}

                          {/* Dicas de Uso */}
                          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start">
                              <svg
                                className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <div>
                                <p className="text-sm text-blue-800 font-medium mb-1">
                                  📌 Dicas para boas evidências fotográficas:
                                </p>
                                <ul className="text-xs text-blue-700 list-disc pl-4 space-y-1">
                                  <li>
                                    Fotos devem estar bem iluminadas e focadas
                                  </li>
                                  <li>
                                    Capture o número da placa em inspeções
                                    veiculares
                                  </li>
                                  <li>
                                    Foque na área específica sendo inspecionada
                                  </li>
                                  <li>
                                    Adicione descrições claras para cada
                                    evidência
                                  </li>
                                  <li>
                                    Mantenha fotos relacionadas a um mesmo item
                                    juntas
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Resultado Final
                          </label>
                          <select
                            value={execucaoForm.resultado}
                            onChange={(e) =>
                              setExecucaoForm((prev) => ({
                                ...prev,
                                resultado: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                          >
                            <option value="">Selecione</option>
                            <option value="aprovado">Aprovado</option>
                            <option value="aprovado_com_ressalvas">
                              Aprovado com Ressalvas
                            </option>
                            <option value="reprovado">Reprovado</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Observações Gerais
                          </label>
                          <textarea
                            value={execucaoForm.observacoes}
                            onChange={(e) =>
                              setExecucaoForm((prev) => ({
                                ...prev,
                                observacoes: e.target.value,
                              }))
                            }
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-950"
                            placeholder="Descreva as observações da vistoria e recomendações necessárias..."
                          />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                          <button
                            type="button"
                            onClick={() =>
                              setExecucaoForm({
                                checklist: [],
                                observacoes: "",
                                resultado: "",
                                fotos: [],
                              })
                            }
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => {
                              const selectElement = document.querySelector(
                                "select"
                              ) as HTMLSelectElement;
                              const vistoriaCodigo = selectElement?.value;
                              if (vistoriaCodigo) {
                                handleExecutarVistoria(vistoriaCodigo);
                              } else {
                                alert("Selecione uma vistoria para executar");
                              }
                            }}
                            disabled={loading || !execucaoForm.resultado}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? "Finalizando..." : "Finalizar Vistoria"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Painel de Informações */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Ações Rápidas
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const codigo = prompt(
                        "Código da vistoria para adicionar não conformidade:"
                      );
                      const descricao = prompt(
                        "Descrição da não conformidade:"
                      );
                      const tipo = prompt(
                        "Tipo (critica/grave/moderada/leve):"
                      );
                      if (codigo && descricao && tipo) {
                        handleAddNaoConformidade(codigo, descricao, tipo);
                      }
                    }}
                    className="w-full text-left p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 text-sm text-gray-950"
                  >
                    ⚠️ Registrar Não Conformidade
                  </button>
                  <button
                    onClick={() => {
                      const codigo = prompt(
                        "Código da vistoria para cancelar:"
                      );
                      const motivo = prompt("Motivo do cancelamento:");
                      if (codigo && motivo) {
                        handleCancelarVistoria(codigo, motivo);
                      }
                    }}
                    className="w-full text-left p-3 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 text-sm text-gray-950"
                  >
                    🚫 Cancelar Vistoria
                  </button>
                  <button
                    onClick={() => {
                      const codigo = prompt(
                        "Código da vistoria para reagendar:"
                      );
                      const novaData = prompt("Nova data (YYYY-MM-DD):");
                      const novaHora = prompt("Nova hora (HH:MM):");
                      const motivo = prompt("Motivo do reagendamento:");
                      if (codigo && novaData && novaHora && motivo) {
                        handleReagendarVistoria(
                          codigo,
                          novaData,
                          novaHora,
                          motivo
                        );
                      }
                    }}
                    className="w-full text-left p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 text-sm text-gray-950"
                  >
                    📅 Reagendar Vistoria
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Vistorias em Andamento
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {vistoriasEmAndamento.map((v) => (
                    <div
                      key={v.codigo}
                      className="p-2 bg-yellow-50 rounded border border-yellow-200"
                    >
                      <p className="text-sm font-medium">
                        {v.objetoDetalhes?.camiao?.matricula ||
                          v.objetoDetalhes?.carga?.codigo}
                      </p>
                      <p className="text-xs text-gray-600">{v.tipo}</p>
                      <p className="text-xs text-yellow-600">{v.codigo}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Relatórios */}
        {activeVistoriaForm === "relatorios" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-green-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-green-500 text-white p-2 rounded-lg mr-2">
                  📋
                </span>
                Relatórios de Vistoria
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-lg mb-2">📊</div>
                  <p className="font-medium text-gray-900">Relatório Diário</p>
                  <p className="text-sm text-gray-600">Vistorias do dia</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-lg mb-2">📈</div>
                  <p className="font-medium text-gray-900">Relatório Mensal</p>
                  <p className="text-sm text-gray-600">Estatísticas do mês</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-orange-600 text-lg mb-2">⚠️</div>
                  <p className="font-medium text-gray-900">Não Conformidades</p>
                  <p className="text-sm text-gray-600">
                    Problemas identificados
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-purple-600 text-lg mb-2">✅</div>
                  <p className="font-medium text-gray-900">Certificados</p>
                  <p className="text-sm text-gray-600">
                    Documentos de aprovação
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-900 mb-4">
                  Gerar Relatório Personalizado
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      value={filtros.dataInicio}
                      onChange={(e) =>
                        setFiltros((prev) => ({
                          ...prev,
                          dataInicio: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Final
                    </label>
                    <input
                      type="date"
                      value={filtros.dataFim}
                      onChange={(e) =>
                        setFiltros((prev) => ({
                          ...prev,
                          dataFim: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Vistoria
                    </label>
                    <select
                      value={filtros.tipo}
                      onChange={(e) =>
                        setFiltros((prev) => ({
                          ...prev,
                          tipo: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    >
                      <option value="">Todos</option>
                      <option value="preventiva">Preventiva</option>
                      <option value="corretiva">Corretiva</option>
                      <option value="seguro">Seguro</option>
                      <option value="rotina">Rotina</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={filtros.status}
                      onChange={(e) =>
                        setFiltros((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    >
                      <option value="">Todos</option>
                      <option value="concluida">Concluída</option>
                      <option value="cancelada">Cancelada</option>
                      <option value="em_andamento">Em Andamento</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resultado
                    </label>
                    <select
                      value={filtros.resultado}
                      onChange={(e) =>
                        setFiltros((prev) => ({
                          ...prev,
                          resultado: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-950"
                    >
                      <option value="">Todos</option>
                      <option value="aprovado">Aprovado</option>
                      <option value="reprovado">Reprovado</option>
                      <option value="aprovado_com_ressalvas">
                        Com Ressalvas
                      </option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleGerarRelatorio}
                  className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium"
                >
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Histórico de Vistorias */}
        {activeVistoriaForm === "historico" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm text-gray-900">
            <div className="p-4 border-b border-gray-200 bg-purple-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-purple-500 text-white p-2 rounded-lg mr-2">
                  📊
                </span>
                Histórico de Vistorias
              </h3>
            </div>
            <div className="p-6">
              {/* Filtros para o histórico */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Inicial
                  </label>
                  <input
                    type="date"
                    value={filtros.dataInicio}
                    onChange={(e) =>
                      setFiltros((prev) => ({
                        ...prev,
                        dataInicio: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Final
                  </label>
                  <input
                    type="date"
                    value={filtros.dataFim}
                    onChange={(e) =>
                      setFiltros((prev) => ({
                        ...prev,
                        dataFim: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select
                    value={filtros.tipo}
                    onChange={(e) =>
                      setFiltros((prev) => ({ ...prev, tipo: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Todos</option>
                    <option value="preventiva">Preventiva</option>
                    <option value="corretiva">Corretiva</option>
                    <option value="seguro">Seguro</option>
                    <option value="rotina">Rotina</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filtros.status}
                    onChange={(e) =>
                      setFiltros((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Todos</option>
                    <option value="concluida">Concluída</option>
                    <option value="cancelada">Cancelada</option>
                    <option value="em_andamento">Em Andamento</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Código
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Objeto
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Tipo
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Data
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Resultado
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Pontuação
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vistorias.map((vistoria) => (
                      <tr
                        key={vistoria.codigo}
                        className="border-b border-gray-100 hover:bg-gray-50 text-gray-950"
                      >
                        <td className="py-3 text-sm font-mono">
                          {vistoria.codigo}
                        </td>
                        <td className="py-3 text-sm">
                          {vistoria.objetoDetalhes?.camiao?.matricula ||
                            vistoria.objetoDetalhes?.carga?.codigo ||
                            vistoria.objetoId}
                        </td>
                        <td className="py-3 text-sm">{vistoria.tipo}</td>
                        <td className="py-3 text-sm">
                          {new Date(vistoria.dataAgendada).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              vistoria.status === "concluida"
                                ? "bg-green-100 text-green-600"
                                : vistoria.status === "cancelada"
                                ? "bg-red-100 text-red-600"
                                : vistoria.status === "em_andamento"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {vistoria.status}
                          </span>
                        </td>
                        <td className="py-3">
                          {vistoria.resultado && (
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                vistoria.resultado === "aprovado"
                                  ? "bg-green-100 text-green-600"
                                  : vistoria.resultado === "reprovado"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {vistoria.resultado}
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-sm">
                          {vistoria.checklist?.percentualAprovacao
                            ? `${vistoria.checklist.percentualAprovacao.toFixed(
                                0
                              )}%`
                            : "-"}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() =>
                              buscarDetalhesVistoria(vistoria.codigo)
                            }
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        {activeVistoriaForm === "graficos" && (
          <div className="space-y-6 text-gray-950">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-amber-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-amber-500 text-white p-2 rounded-lg mr-2">
                    📈
                  </span>
                  Dashboard de Vistorias - Métricas e Estatísticas
                </h3>
              </div>
              <div className="p-6">
                {/* Grid de Gráficos Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Gráfico de Resultados de Vistorias */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-amber-500 mr-2">📊</span>
                      Resultados das Vistorias
                    </h4>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center w-full">
                        <div className="flex justify-center mb-4">
                          <div className="relative w-32 h-32">
                            <div
                              className="w-full h-full rounded-full"
                              style={{
                                background:
                                  "conic-gradient(#10b981 0% 65%, #f59e0b 65% 85%, #ef4444 85% 100%)",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                            <span>
                              Aprovadas (
                              {
                                vistoriasConcluidas.filter(
                                  (v) => v.resultado === "aprovado"
                                ).length
                              }
                              )
                            </span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                            <span>
                              Com Ressalvas (
                              {
                                vistoriasConcluidas.filter(
                                  (v) =>
                                    v.resultado === "aprovado_com_ressalvas"
                                ).length
                              }
                              )
                            </span>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                            <span>
                              Reprovadas (
                              {
                                vistoriasConcluidas.filter(
                                  (v) => v.resultado === "reprovado"
                                ).length
                              }
                              )
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Vistorias por Status */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-blue-500 mr-2">🔧</span>
                      Vistorias por Status
                    </h4>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {[
                        "agendada",
                        "em_andamento",
                        "concluida",
                        "cancelada",
                      ].map((status) => {
                        const count = vistorias.filter(
                          (v) => v.status === status
                        ).length;
                        const height = (count / vistorias.length) * 100;
                        return (
                          <div
                            key={status}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div
                              className={`w-3/4 rounded-t-lg transition-all hover:opacity-80 ${
                                status === "concluida"
                                  ? "bg-green-500"
                                  : status === "agendada"
                                  ? "bg-blue-500"
                                  : status === "em_andamento"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ height: `${Math.max(height, 10)}%` }}
                            ></div>
                            <span className="text-xs mt-2 font-medium">
                              {status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-600 font-medium">
                      Total Vistorias
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {vistorias.length}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium">
                      Taxa Aprovação
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {vistoriasConcluidas.length > 0
                        ? `${(
                            (vistoriasConcluidas.filter(
                              (v) => v.resultado === "aprovado"
                            ).length /
                              vistoriasConcluidas.length) *
                            100
                          ).toFixed(0)}%`
                        : "0%"}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Agendadas
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {vistoriasAgendadas.length}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">
                      Em Andamento
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {vistoriasEmAndamento.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
