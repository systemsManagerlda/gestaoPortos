/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { FiX, FiUser, FiTruck, FiPackage, FiMapPin, FiCalendar, FiDollarSign, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { Carga } from "../cliente/cargaService";

interface Motorista {
  motoristaId: number;
  nomeCompleto: string;
  empresaMotorista: string;
  empresaMotoristaId: number;
  cartaConducao?: {
    numero: string;
    categoria: string;
    validade: string;
  };
  contactos?: {
    telefonePrincipal: string;
  };
  veiculosHabilitados?: any[];
}

interface Camiao {
  camiaoId: number;
  matricula: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  especificacoes: {
    cargaUtil: number;
    comprimento?: number;
    largura?: number;
    altura?: number;
  };
  nivelInspecao: {
    categoria: string;
    descricao: string;
  };
  status: string;
}

interface ModalEditarCargaProps {
  carga: Carga | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (cargaAtualizada: Carga, dadosAssociacao?: {
    motoristaId?: number;
    camiaoId?: number;
  }) => Promise<boolean>;
}

export function ModalEditarCarga({ carga, isOpen, onClose, onSave }: ModalEditarCargaProps) {
  const [formData, setFormData] = useState<Partial<Carga>>({});
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [camioes, setCamioes] = useState<Camiao[]>([]);
  const [motoristaSelecionado, setMotoristaSelecionado] = useState<number | null>(null);
  const [camiaoSelecionado, setCamiaoSelecionado] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [viabilidade, setViabilidade] = useState<any>(null);
  const [loadingViabilidade, setLoadingViabilidade] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    if (isOpen && carga) {
      setFormData({ ...carga });
      setMotoristaSelecionado(carga.motorista?.id || null);
      setCamiaoSelecionado(carga.veiculo?.id || null);
      carregarMotoristas();
      carregarCamioes();
    }
  }, [isOpen, carga]);

  const carregarMotoristas = async () => {
  try {
    console.log("Iniciando carregamento de motoristas...");
    const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getMotoristaList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curPage: 1,
        pageSize: 100,
        status: "disponivel"
      })
    });

    console.log("Resposta da API:", response.status, response.statusText);

    if (response.ok) {
      const data = await response.json();
      console.log("Dados completos da resposta:", data);
      
      if (data.returnCode === 200) {
        console.log("Lista de motoristas recebida:", data.data.list);
        console.log("Número de motoristas:", data.data.list?.length || 0);
        setMotoristas(data.data.list || []);
      } else {
        console.error("returnCode não é 200:", data.returnCode, data.message);
      }
    } else {
      console.error("Resposta não OK:", response.status);
    }
  } catch (error) {
    console.error("Erro ao carregar motoristas:", error);
  }
};

  const carregarCamioes = async () => {
    try {
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/getCamiaoList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curPage: 1,
          pageSize: 100,
          status: "disponivel"
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.returnCode === 200) {
          setCamioes(data.data.list || []);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar camiões:", error);
    }
  };

  const verificarViabilidade = async () => {
    if (!carga?.codigo || !camiaoSelecionado) return;

    setLoadingViabilidade(true);
    try {
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/verificarViabilidadeCargaCamiao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigoCarga: carga.codigo,
          camiaoId: camiaoSelecionado
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.returnCode === 200) {
          setViabilidade(data.data);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar viabilidade:", error);
    } finally {
      setLoadingViabilidade(false);
    }
  };

  useEffect(() => {
    if (camiaoSelecionado) {
      verificarViabilidade();
    }
  }, [camiaoSelecionado]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Carga] as object || {}),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    if (!carga) return;

    setLoading(true);
    try {
      // Atualizar dados da carga
      const cargaAtualizada = {
        ...carga,
        ...formData,
        dataAtualizacao: new Date().toISOString()
      };

      // Dados para associação
      const dadosAssociacao: any = {};
      
      if (motoristaSelecionado) {
        dadosAssociacao.motoristaId = motoristaSelecionado;
      }
      
      if (camiaoSelecionado) {
        dadosAssociacao.camiaoId = camiaoSelecionado;
      }

      const sucesso = await onSave(cargaAtualizada, Object.keys(dadosAssociacao).length > 0 ? dadosAssociacao : undefined);
      
      if (sucesso) {
        onClose();
      }
    } catch (error) {
      console.error("Erro ao salvar carga:", error);
    } finally {
      setLoading(false);
    }
  };

  const associarCargaCamiao = async () => {
    if (!carga?.codigo || !camiaoSelecionado) {
      alert("Selecione um camião para associar");
      return;
    }

    try {
      const response = await fetch("https://desktop-api-4f850b3f9733.herokuapp.com/associarCargaCamiao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigoCarga: carga.codigo,
          camiaoId: camiaoSelecionado,
          motoristaId: motoristaSelecionado || null
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.returnCode === 200) {
          alert("Carga associada ao camião com sucesso!");
          // Atualizar dados locais
          if (carga) {
            const motoristaSelecionadoObj = motoristas.find(m => m.motoristaId === motoristaSelecionado);
            const camiaoSelecionadoObj = camioes.find(c => c.camiaoId === camiaoSelecionado);
            
            setFormData(prev => ({
              ...prev,
              motorista: motoristaSelecionadoObj ? {
                id: motoristaSelecionadoObj.motoristaId,
                nome: motoristaSelecionadoObj.nomeCompleto,
                empresaMotorista: motoristaSelecionadoObj.empresaMotorista,
                empresaMotoristaId: motoristaSelecionadoObj.empresaMotoristaId,
                telefone: motoristaSelecionadoObj.contactos?.telefonePrincipal || ""
              } : prev.motorista,
              veiculo: camiaoSelecionadoObj ? {
                id: camiaoSelecionadoObj.camiaoId,
                matricula: camiaoSelecionadoObj.matricula,
                modelo: `${camiaoSelecionadoObj.marca} ${camiaoSelecionadoObj.modelo}`
              } : prev.veiculo
            }));
          }
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Erro ao associar carga:", error);
      return false;
    }
  };

  const getMotoristaAtual = () => {
    if (!motoristaSelecionado) return null;
    return motoristas.find(m => m.motoristaId === motoristaSelecionado);
  };

  const getCamiaoAtual = () => {
    if (!camiaoSelecionado) return null;
    return camioes.find(c => c.camiaoId === camiaoSelecionado);
  };

  if (!isOpen || !carga) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

        {/* Modal */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FiPackage className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Editar Carga: {carga.codigo}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {/* Coluna 2: Motorista e Caminhão */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <FiTruck className="mr-2" /> Transporte
              </h4>

              {/* Seletor de Motorista */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <FiUser className="mr-2" /> Motorista
                </label>
                <select
                  value={motoristaSelecionado || ""}
                  onChange={(e) => setMotoristaSelecionado(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Selecione um motorista...</option>
                  {motoristas.map(motorista => (
                    <option key={motorista.motoristaId} value={motorista.motoristaId}>
                      {motorista.nomeCompleto} - {motorista.empresaMotorista}
                    </option>
                  ))}
                </select>
                
                {getMotoristaAtual() && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {getMotoristaAtual()?.nomeCompleto}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Empresa: {getMotoristaAtual()?.empresaMotorista}
                    </p>
                    {getMotoristaAtual()?.cartaConducao && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Carta: {getMotoristaAtual()?.cartaConducao?.categoria} - {getMotoristaAtual()?.cartaConducao?.numero}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Seletor de Caminhão */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <FiTruck className="mr-2" /> Caminhão
                </label>
                <select
                  value={camiaoSelecionado || ""}
                  onChange={(e) => setCamiaoSelecionado(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Selecione um caminhão...</option>
                  {camioes.map(camiao => (
                    <option key={camiao.camiaoId} value={camiao.camiaoId}>
                      {camiao.matricula} - {camiao.marca} {camiao.modelo} ({camiao.nivelInspecao.categoria})
                    </option>
                  ))}
                </select>

                {getCamiaoAtual() && (
                  <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {getCamiaoAtual()?.matricula} - {getCamiaoAtual()?.marca} {getCamiaoAtual()?.modelo}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Capacidade: {getCamiaoAtual()?.especificacoes.cargaUtil} kg
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Categoria: {getCamiaoAtual()?.nivelInspecao.categoria} - {getCamiaoAtual()?.nivelInspecao.descricao}
                    </p>
                  </div>
                )}
              </div>

              {/* Botão para associar carga */}
              {camiaoSelecionado && (
                <button
                  onClick={associarCargaCamiao}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Associar Carga ao Caminhão</span>
                </button>
              )}

              {/* Verificação de Viabilidade */}
              {loadingViabilidade && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 flex items-center">
                    <FiAlertCircle className="mr-2" />
                    Verificando viabilidade...
                  </p>
                </div>
              )}

              {viabilidade && !loadingViabilidade && (
                <div className={`mt-4 p-3 rounded-lg ${
                  viabilidade.viavel 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`text-sm font-medium ${
                      viabilidade.viavel 
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {viabilidade.viavel ? '✅ Viável' : '❌ Não Viável'}
                    </p>
                  </div>
                  
                  {viabilidade.problemas.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Problemas:</p>
                      {viabilidade.problemas.map((problema: string, index: number) => (
                        <p key={index} className="text-xs text-red-600 dark:text-red-400">• {problema}</p>
                      ))}
                    </div>
                  )}
                  
                  {viabilidade.alertas.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Alertas:</p>
                      {viabilidade.alertas.map((alerta: string, index: number) => (
                        <p key={index} className="text-xs text-yellow-600 dark:text-yellow-400">• {alerta}</p>
                      ))}
                    </div>
                  )}
                  
                  {viabilidade.recomendacoes.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Recomendações:</p>
                      {viabilidade.recomendacoes.map((recomendacao: string, index: number) => (
                        <p key={index} className="text-xs text-green-600 dark:text-green-400">• {recomendacao}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}