import { useState } from 'react';
import { 
  FiX, 
  FiSave, 
  FiTruck, 
  FiFileText,
  FiSettings,
  FiAlertCircle,
  FiCheckCircle,
  FiCamera,
  FiShield,
  FiMapPin
} from "react-icons/fi";

// Interfaces e tipos (atualizados para incluir GPS)
export type StatusCamiao = "disponivel" | "em_viagem" | "manutencao" | "inativo" | "reservado";
export type TipoCamiao = "rigido" | "articulado" | "reboque" | "tanque" | "frigorifico";
export type CategoriaInspecao = "A" | "B" | "C";
export type ResultadoInspecao = "aprovado" | "aprovado_com_ressalvas" | "reprovado";
export type TipoGPS = "normal" | "vip";
export type StatusGPS = "ativo" | "inativo" | "pendente" | "expirado";

export interface CreateCamiaoData {
  matricula: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  cor?: string;
  transportadoraId: number;
  motoristaId: number;
  codigoGPS: string;
  
  // Novo campo: Tipo de GPS
  tipoGPS?: {
    tipo: TipoGPS;
    dataExpiracao?: string;
  };

  // Novo campo: Especificações GPS VIP
  gpsVip?: {
    camera: {
      possui: boolean;
      modelo?: string;
      resolucao?: string;
    };
    controleMotorista: {
      possui: boolean;
      tipoControle?: "biometrico" | "rfid" | "app" | "codigo";
    };
    recursosAdicionais: {
      monitoramentoTempoReal: boolean;
      alertasVelocidade: boolean;
      relatoriosDesempenho: boolean;
      geofencing: boolean;
      comunicacaoAudio: boolean;
    };
  };

  especificacoes: {
    tipo: TipoCamiao;
    pesoBruto: number;
    tara: number;
    cargaUtil: number;
    comprimento?: number;
    largura?: number;
    altura?: number;
    volumeUtil?: number;
    numEixos: number;
  };
  documentacao: {
    registroComercial?: string;
    seguro: {
      numeroApolice: string;
      seguradora: string;
      dataEmissao: string;
      dataValidade: string;
      cobertura?: string;
    };
    licencaOperacao?: {
      numero: string;
      dataEmissao: string;
      dataValidade: string;
      categoria: string;
    };
    certificadoGPS?: {
      numero: string;
      dataEmissao: string;
      dataValidade: string;
      tipo: TipoGPS;
    };
  };
  nivelInspecao: {
    categoria: CategoriaInspecao;
    dataUltimaInspecao: string;
    resultadoUltimaInspecao: ResultadoInspecao;
    centroInspecao?: string;
    observacoes?: string;
  };
  estado: {
    tipo: "novo" | "seminovo" | "usado" | "recondicionado";
    observacoes?: string;
    dataAvaliacao?: string;
  };
  status?: StatusCamiao;
  disponibilidade?: {
    tipoServico: string[];
    regioes: string[];
    observacoes?: string;
  };
  criadoPor?: string;
  observacoes?: string;
}

interface NovoCamiaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dados: CreateCamiaoData) => Promise<void>;
  isLoading?: boolean;
  idTransportadora?: number;
}

// Constantes para os selects
const TIPO_CAMIAO_OPTIONS = [
  { value: "rigido", label: "Rígido" },
  { value: "articulado", label: "Articulado" },
  { value: "reboque", label: "Reboque" },
  { value: "tanque", label: "Tanque" },
  { value: "frigorifico", label: "Frigorífico" }
] as const;

const CATEGORIA_OPTIONS = [
  { value: "A", label: "A - Chanté" },
  { value: "B", label: "B - Nacional" },
  { value: "C", label: "C - Trânsito" }
] as const;

const RESULTADO_INSPECAO_OPTIONS = [
  { value: "aprovado", label: "Aprovado" },
  { value: "aprovado_com_ressalvas", label: "Aprovado com Ressalvas" },
  { value: "reprovado", label: "Reprovado" }
] as const;

const ESTADO_OPTIONS = [
  { value: "novo", label: "Novo" },
  { value: "seminovo", label: "Seminovo" },
  { value: "usado", label: "Usado" },
  { value: "recondicionado", label: "Recondicionado" }
] as const;

const STATUS_OPTIONS = [
  { value: "disponivel", label: "Disponível" },
  { value: "em_viagem", label: "Em Viagem" },
  { value: "manutencao", label: "Em Manutenção" },
  { value: "inativo", label: "Inativo" },
  { value: "reservado", label: "Reservado" }
] as const;

const TIPO_SERVICO_OPTIONS = [
  { value: "chante", label: "Chanté" },
  { value: "nacional", label: "Nacional" },
  { value: "transito", label: "Trânsito" }
] as const;

// Novas constantes para GPS
const TIPO_GPS_OPTIONS = [
  { value: "normal", label: "GPS Normal - 4.000 MT" },
  { value: "vip", label: "GPS VIP - 13.000 MT" }
] as const;

const TIPO_CONTROLE_OPTIONS = [
  { value: "biometrico", label: "Biométrico" },
  { value: "rfid", label: "RFID" },
  { value: "app", label: "Aplicativo" },
  { value: "codigo", label: "Código" }
] as const;

const RESOLUCAO_CAMERA_OPTIONS = [
  { value: "720p", label: "720p HD" },
  { value: "1080p", label: "1080p Full HD" },
  { value: "2k", label: "2K" },
  { value: "4k", label: "4K Ultra HD" }
] as const;

export function NovoCamiaoModal({ isOpen, onClose, onSave, isLoading = false, idTransportadora }: NovoCamiaoModalProps) {
  const [formData, setFormData] = useState<CreateCamiaoData>({
    matricula: '',
    marca: '',
    modelo: '',
    anoFabricacao: new Date().getFullYear(),
    cor: '',
    transportadoraId: 0,
    motoristaId: 0,
    codigoGPS: '',
    tipoGPS: {
      tipo: 'normal',
      dataExpiracao: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    },
    especificacoes: {
      tipo: 'rigido',
      pesoBruto: 0,
      tara: 0,
      cargaUtil: 0,
      comprimento: 0,
      largura: 0,
      altura: 0,
      volumeUtil: 0,
      numEixos: 2
    },
    documentacao: {
      seguro: {
        numeroApolice: '',
        seguradora: '',
        dataEmissao: new Date().toISOString().split('T')[0],
        dataValidade: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        cobertura: 'Responsabilidade Civil'
      }
    },
    nivelInspecao: {
      categoria: 'A',
      dataUltimaInspecao: new Date().toISOString().split('T')[0],
      resultadoUltimaInspecao: 'aprovado',
      centroInspecao: '',
      observacoes: ''
    },
    estado: {
      tipo: 'usado'
    },
    status: 'disponivel',
    disponibilidade: {
      tipoServico: ['chante'],
      regioes: [],
      observacoes: ''
    },
    observacoes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'basico' | 'gps' | 'especificacoes' | 'documentacao' | 'inspecao'>('basico');
  const [showGPSVipWarning, setShowGPSVipWarning] = useState(false);

  // Função para validar o formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validações básicas
    if (!formData.matricula.trim()) newErrors.matricula = 'Matrícula é obrigatória';
    if (!formData.marca.trim()) newErrors.marca = 'Marca é obrigatória';
    if (!formData.modelo.trim()) newErrors.modelo = 'Modelo é obrigatório';
    if (!formData.transportadoraId || formData.transportadoraId <= 0) newErrors.transportadoraId = 'ID da transportadora é obrigatório';
    if (!formData.motoristaId || formData.motoristaId <= 0) newErrors.motoristaId = 'ID do motorista é obrigatório';
    if (!formData.codigoGPS.trim()) newErrors.codigoGPS = 'Código GPS é obrigatório';

    // Validações das especificações
    if (!formData.especificacoes.pesoBruto || formData.especificacoes.pesoBruto <= 0) newErrors.pesoBruto = 'Peso bruto deve ser maior que zero';
    if (!formData.especificacoes.tara || formData.especificacoes.tara <= 0) newErrors.tara = 'Tara deve ser maior que zero';
    if (!formData.especificacoes.cargaUtil || formData.especificacoes.cargaUtil <= 0) newErrors.cargaUtil = 'Carga útil deve ser maior que zero';
    if (!formData.especificacoes.numEixos || formData.especificacoes.numEixos <= 0) newErrors.numEixos = 'Número de eixos deve ser maior que zero';

    // Validações do seguro
    if (!formData.documentacao.seguro.numeroApolice.trim()) newErrors.numeroApolice = 'Número da apólice é obrigatório';
    if (!formData.documentacao.seguro.seguradora.trim()) newErrors.seguradora = 'Seguradora é obrigatória';
    if (!formData.documentacao.seguro.dataEmissao) newErrors.dataEmissaoSeguro = 'Data de emissão do seguro é obrigatória';
    if (!formData.documentacao.seguro.dataValidade) newErrors.dataValidadeSeguro = 'Data de validade do seguro é obrigatória';

    // Validações da inspeção
    if (!formData.nivelInspecao.dataUltimaInspecao) newErrors.dataUltimaInspecao = 'Data da última inspeção é obrigatória';

    // Validações específicas para GPS VIP
    if (formData.tipoGPS?.tipo === 'vip') {
      if (formData.nivelInspecao.categoria !== 'C') {
        newErrors.categoriaGPS = 'GPS VIP só está disponível para camiões categoria C';
      }
      if (formData.estado.tipo === 'usado') {
        newErrors.estadoGPS = 'GPS VIP não está disponível para camiões usados';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para lidar com mudanças nos campos
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      const keys = field.split('.');

      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else if (keys.length === 2) {
        return { 
          ...prev, 
          [keys[0]]: { 
            ...(prev[keys[0] as keyof CreateCamiaoData] as object || {}), 
            [keys[1]]: value 
          } 
        };
      } else if (keys.length === 3) {
        return {
          ...prev,
          [keys[0]]: {
            ...(prev[keys[0] as keyof CreateCamiaoData] as object || {}),
            [keys[1]]: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...((prev[keys[0] as keyof CreateCamiaoData] as any)[keys[1]] || {}),
              [keys[2]]: value
            }
          }
        };
      }

      return prev;
    });

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Verificar se deve mostrar aviso de GPS VIP
    if (field === 'tipoGPS.tipo' && value === 'vip') {
      setShowGPSVipWarning(true);
    } else if (field === 'tipoGPS.tipo' && value === 'normal') {
      setShowGPSVipWarning(false);
    }
  };

  // Função para lidar com mudança no tipo de GPS
  const handleTipoGPSChange = (tipo: TipoGPS) => {
    handleChange('tipoGPS.tipo', tipo);
    
    if (tipo === 'vip') {
      // Inicializar automaticamente a estrutura GPS VIP
      setFormData(prev => ({
        ...prev,
        gpsVip: {
          camera: {
            possui: true,
            modelo: 'Câmera GPS VIP',
            resolucao: '1080p'
          },
          controleMotorista: {
            possui: true,
            tipoControle: 'biometrico'
          },
          recursosAdicionais: {
            monitoramentoTempoReal: true,
            alertasVelocidade: true,
            relatoriosDesempenho: true,
            geofencing: true,
            comunicacaoAudio: true
          }
        }
      }));
    } else {
      // Remover estrutura GPS VIP se mudar para normal
      setFormData(prev => {
        const newData = { ...prev };
        delete newData.gpsVip;
        return newData;
      });
    }
  };

  // Função para lidar com múltipla seleção (tipoServico)
  const handleTipoServicoChange = (value: string) => {
    setFormData(prev => {
      const currentServices = prev.disponibilidade?.tipoServico || [];
      const newServices = currentServices.includes(value)
        ? currentServices.filter(service => service !== value)
        : [...currentServices, value];
      
      return {
        ...prev,
        disponibilidade: {
          ...prev.disponibilidade!,
          tipoServico: newServices
        }
      };
    });
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData);
      // Limpar formulário após sucesso
      setFormData({
        matricula: '',
        marca: '',
        modelo: '',
        anoFabricacao: new Date().getFullYear(),
        cor: '',
        transportadoraId: 0,
        motoristaId: 0,
        codigoGPS: '',
        tipoGPS: {
          tipo: 'normal',
          dataExpiracao: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
        },
        especificacoes: {
          tipo: 'rigido',
          pesoBruto: 0,
          tara: 0,
          cargaUtil: 0,
          comprimento: 0,
          largura: 0,
          altura: 0,
          volumeUtil: 0,
          numEixos: 2
        },
        documentacao: {
          seguro: {
            numeroApolice: '',
            seguradora: '',
            dataEmissao: new Date().toISOString().split('T')[0],
            dataValidade: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            cobertura: 'Responsabilidade Civil'
          }
        },
        nivelInspecao: {
          categoria: 'A',
          dataUltimaInspecao: new Date().toISOString().split('T')[0],
          resultadoUltimaInspecao: 'aprovado',
          centroInspecao: '',
          observacoes: ''
        },
        estado: {
          tipo: 'usado'
        },
        status: 'disponivel',
        disponibilidade: {
          tipoServico: ['chante'],
          regioes: [],
          observacoes: ''
        },
        observacoes: ''
      });
      setErrors({});
      setShowGPSVipWarning(false);
    } catch (error) {
      console.error('Erro ao salvar camião:', error);
    }
  };

  // Função para calcular volume útil automaticamente
  const calcularVolumeUtil = () => {
    const { comprimento, largura, altura } = formData.especificacoes;
    if (comprimento && largura && altura) {
      const volume = comprimento * largura * altura;
      handleChange('especificacoes.volumeUtil', Math.round(volume * 100) / 100);
    }
  };

  // Função para obter o valor do registro baseado no tipo de GPS
  const getValorRegistro = () => {
    return formData.tipoGPS?.tipo === 'vip' ? '13.000 MT' : '4.000 MT';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <FiTruck className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Adicionar Novo Camião
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs de Navegação */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'basico', label: 'Informações Básicas', icon: FiTruck },
              { id: 'gps', label: 'Sistema GPS', icon: FiMapPin },
              { id: 'especificacoes', label: 'Especificações', icon: FiSettings },
              { id: 'documentacao', label: 'Documentação', icon: FiFileText },
              { id: 'inspecao', label: 'Inspeção', icon: FiCheckCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Tab: Informações Básicas */}
          {activeTab === 'basico' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Matrícula *
                  </label>
                  <input
                    type="text"
                    value={formData.matricula}
                    onChange={(e) => handleChange('matricula', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.matricula ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Ex: AB-123-CD"
                  />
                  {errors.matricula && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.matricula}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Código GPS *
                  </label>
                  <input
                    type="text"
                    value={formData.codigoGPS}
                    onChange={(e) => handleChange('codigoGPS', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.codigoGPS ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Ex: GPS001"
                  />
                  {errors.codigoGPS && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.codigoGPS}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Marca *
                  </label>
                  <input
                    type="text"
                    value={formData.marca}
                    onChange={(e) => handleChange('marca', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.marca ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Ex: Mercedes, Volvo..."
                  />
                  {errors.marca && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.marca}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    value={formData.modelo}
                    onChange={(e) => handleChange('modelo', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.modelo ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Ex: Actros, FH16..."
                  />
                  {errors.modelo && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.modelo}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ano de Fabricação
                  </label>
                  <input
                    type="number"
                    value={formData.anoFabricacao}
                    onChange={(e) => handleChange('anoFabricacao', parseInt(e.target.value))}
                    min="1950"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cor
                  </label>
                  <input
                    type="text"
                    value={formData.cor}
                    onChange={(e) => handleChange('cor', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Azul, Branco..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ID Transportadora *
                  </label>
                  <input
                    type="number"
                    value={idTransportadora}
                    onChange={() => handleChange('transportadoraId', idTransportadora)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.transportadoraId ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="ID da transportadora"
                  />
                  {errors.transportadoraId && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.transportadoraId}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ID Motorista *
                  </label>
                  <input
                    type="number"
                    value={formData.motoristaId}
                    onChange={(e) => handleChange('motoristaId', parseInt(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.motoristaId ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="ID do motorista"
                  />
                  {errors.motoristaId && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.motoristaId}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estado do Veículo
                  </label>
                  <select
                    value={formData.estado.tipo}
                    onChange={(e) => handleChange('estado.tipo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {ESTADO_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {STATUS_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Observações
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => handleChange('observacoes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Observações adicionais sobre o camião..."
                />
              </div>
            </div>
          )}

          {/* Tab: Sistema GPS */}
          {activeTab === 'gps' && (
            <div className="space-y-6">
              {/* Seleção do Tipo de GPS */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <FiMapPin className="h-5 w-5 text-blue-600" />
                  <span>Tipo de Sistema GPS</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de GPS *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {TIPO_GPS_OPTIONS.map(option => (
                      <label
                        key={option.value}
                        className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                          formData.tipoGPS?.tipo === option.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="tipoGPS"
                          value={option.value}
                          checked={formData.tipoGPS?.tipo === option.value}
                          onChange={() => handleTipoGPSChange(option.value)}
                          className="sr-only"
                        />
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {option.label.split(' - ')[0]}
                              </div>
                              <div className="text-gray-500 dark:text-gray-400">
                                {option.label.split(' - ')[1]}
                              </div>
                            </div>
                          </div>
                          {formData.tipoGPS?.tipo === option.value && (
                            <FiCheckCircle className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.categoriaGPS && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.categoriaGPS}</span>
                    </p>
                  )}
                  {errors.estadoGPS && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.estadoGPS}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Expiração do GPS
                  </label>
                  <input
                    type="date"
                    value={formData.tipoGPS?.dataExpiracao || ''}
                    onChange={(e) => handleChange('tipoGPS.dataExpiracao', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Valor do Registro
                  </label>
                  <div className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white">
                    {getValorRegistro()}
                  </div>
                </div>
              </div>

              {/* Aviso para GPS VIP */}
              {showGPSVipWarning && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiAlertCircle className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-300">
                      Requisitos para GPS VIP
                    </h4>
                  </div>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                    <li>• Categoria de inspeção deve ser C (Trânsito)</li>
                    <li>• Estado do veículo não pode ser &quot;Usado&quot;</li>
                    <li>• Valor do registro: 13.000 MT</li>
                    <li>• Inclui câmera e controle de motorista</li>
                  </ul>
                </div>
              )}

              {/* Configurações GPS VIP */}
              {formData.tipoGPS?.tipo === 'vip' && formData.gpsVip && (
                <>
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                      <FiCamera className="h-5 w-5 text-purple-600" />
                      <span>Configurações GPS VIP</span>
                    </h3>
                  </div>

                  {/* Câmera */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                      <FiCamera className="h-4 w-4 text-purple-600" />
                      <span>Sistema de Câmera</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Modelo da Câmera
                        </label>
                        <input
                          type="text"
                          value={formData.gpsVip.camera.modelo || ''}
                          onChange={(e) => handleChange('gpsVip.camera.modelo', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Modelo da câmera"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Resolução
                        </label>
                        <select
                          value={formData.gpsVip.camera.resolucao || ''}
                          onChange={(e) => handleChange('gpsVip.camera.resolucao', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Selecione a resolução</option>
                          {RESOLUCAO_CAMERA_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Controle do Motorista */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                      <FiShield className="h-4 w-4 text-purple-600" />
                      <span>Controle do Motorista</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tipo de Controle
                        </label>
                        <select
                          value={formData.gpsVip.controleMotorista.tipoControle || ''}
                          onChange={(e) => handleChange('gpsVip.controleMotorista.tipoControle', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Selecione o tipo</option>
                          {TIPO_CONTROLE_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Recursos Adicionais */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Recursos Adicionais
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(formData.gpsVip.recursosAdicionais).map(([key, value]) => (
                        <label key={key} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleChange(`gpsVip.recursosAdicionais.${key}`, e.target.checked)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tab: Especificações Técnicas */}
          {activeTab === 'especificacoes' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de Camião
                  </label>
                  <select
                    value={formData.especificacoes.tipo}
                    onChange={(e) => handleChange('especificacoes.tipo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {TIPO_CAMIAO_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Número de Eixos *
                  </label>
                  <input
                    type="number"
                    value={formData.especificacoes.numEixos}
                    onChange={(e) => handleChange('especificacoes.numEixos', parseInt(e.target.value))}
                    min="1"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.numEixos ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.numEixos && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.numEixos}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Peso Bruto Total (PBT) em kg *
                  </label>
                  <input
                    type="number"
                    value={formData.especificacoes.pesoBruto}
                    onChange={(e) => handleChange('especificacoes.pesoBruto', parseFloat(e.target.value))}
                    min="0"
                    step="0.1"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.pesoBruto ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.pesoBruto && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.pesoBruto}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tara (Peso Vazio) em kg *
                  </label>
                  <input
                    type="number"
                    value={formData.especificacoes.tara}
                    onChange={(e) => handleChange('especificacoes.tara', parseFloat(e.target.value))}
                    min="0"
                    step="0.1"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.tara ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.tara && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.tara}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Carga Útil em kg *
                  </label>
                  <input
                    type="number"
                    value={formData.especificacoes.cargaUtil}
                    onChange={(e) => handleChange('especificacoes.cargaUtil', parseFloat(e.target.value))}
                    min="0"
                    step="0.1"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.cargaUtil ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.cargaUtil && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.cargaUtil}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Volume Útil (m³)
                  </label>
                  <input
                    type="number"
                    value={formData.especificacoes.volumeUtil}
                    onChange={(e) => handleChange('especificacoes.volumeUtil', parseFloat(e.target.value))}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Comprimento (m)
                  </label>
                  <input
                    type="number"
                    value={formData.especificacoes.comprimento}
                    onChange={(e) => handleChange('especificacoes.comprimento', parseFloat(e.target.value))}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Largura (m)
                  </label>
                  <input
                    type="number"
                    value={formData.especificacoes.largura}
                    onChange={(e) => handleChange('especificacoes.largura', parseFloat(e.target.value))}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Altura (m)
                  </label>
                  <input
                    type="number"
                    value={formData.especificacoes.altura}
                    onChange={(e) => handleChange('especificacoes.altura', parseFloat(e.target.value))}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={calcularVolumeUtil}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Calcular Volume
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipos de Serviço Permitidos
                </label>
                <div className="flex flex-wrap gap-3">
                  {TIPO_SERVICO_OPTIONS.map(option => (
                    <label key={option.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.disponibilidade?.tipoServico.includes(option.value)}
                        onChange={() => handleTipoServicoChange(option.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Documentação */}
          {activeTab === 'documentacao' && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <FiFileText className="h-5 w-5 text-blue-600" />
                  <span>Seguro</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Número da Apólice *
                  </label>
                  <input
                    type="text"
                    value={formData.documentacao.seguro.numeroApolice}
                    onChange={(e) => handleChange('documentacao.seguro.numeroApolice', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.numeroApolice ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Número da apólice"
                  />
                  {errors.numeroApolice && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.numeroApolice}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Seguradora *
                  </label>
                  <input
                    type="text"
                    value={formData.documentacao.seguro.seguradora}
                    onChange={(e) => handleChange('documentacao.seguro.seguradora', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.seguradora ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Nome da seguradora"
                  />
                  {errors.seguradora && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.seguradora}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Emissão *
                  </label>
                  <input
                    type="date"
                    value={formData.documentacao.seguro.dataEmissao}
                    onChange={(e) => handleChange('documentacao.seguro.dataEmissao', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.dataEmissaoSeguro ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.dataEmissaoSeguro && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.dataEmissaoSeguro}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Validade *
                  </label>
                  <input
                    type="date"
                    value={formData.documentacao.seguro.dataValidade}
                    onChange={(e) => handleChange('documentacao.seguro.dataValidade', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.dataValidadeSeguro ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.dataValidadeSeguro && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.dataValidadeSeguro}</span>
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cobertura
                  </label>
                  <input
                    type="text"
                    value={formData.documentacao.seguro.cobertura}
                    onChange={(e) => handleChange('documentacao.seguro.cobertura', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Tipo de cobertura do seguro"
                  />
                </div>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                  <FiFileText className="h-5 w-5 text-blue-600" />
                  <span>Licença de Operação (Opcional)</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Número da Licença
                  </label>
                  <input
                    type="text"
                    value={formData.documentacao.licencaOperacao?.numero || ''}
                    onChange={(e) => handleChange('documentacao.licencaOperacao.numero', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Número da licença"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={formData.documentacao.licencaOperacao?.categoria || ''}
                    onChange={(e) => handleChange('documentacao.licencaOperacao.categoria', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Categoria da licença"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Emissão
                  </label>
                  <input
                    type="date"
                    value={formData.documentacao.licencaOperacao?.dataEmissao || ''}
                    onChange={(e) => handleChange('documentacao.licencaOperacao.dataEmissao', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data de Validade
                  </label>
                  <input
                    type="date"
                    value={formData.documentacao.licencaOperacao?.dataValidade || ''}
                    onChange={(e) => handleChange('documentacao.licencaOperacao.dataValidade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Registro Comercial (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.documentacao.registroComercial || ''}
                  onChange={(e) => handleChange('documentacao.registroComercial', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Número do registro comercial"
                />
              </div>
            </div>
          )}

          {/* Tab: Inspeção */}
          {activeTab === 'inspecao' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categoria de Inspeção
                  </label>
                  <select
                    value={formData.nivelInspecao.categoria}
                    onChange={(e) => handleChange('nivelInspecao.categoria', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {CATEGORIA_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resultado da Última Inspeção
                  </label>
                  <select
                    value={formData.nivelInspecao.resultadoUltimaInspecao}
                    onChange={(e) => handleChange('nivelInspecao.resultadoUltimaInspecao', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {RESULTADO_INSPECAO_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data da Última Inspeção *
                  </label>
                  <input
                    type="date"
                    value={formData.nivelInspecao.dataUltimaInspecao}
                    onChange={(e) => handleChange('nivelInspecao.dataUltimaInspecao', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.dataUltimaInspecao ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.dataUltimaInspecao && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="h-4 w-4" />
                      <span>{errors.dataUltimaInspecao}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Centro de Inspeção
                  </label>
                  <input
                    type="text"
                    value={formData.nivelInspecao.centroInspecao || ''}
                    onChange={(e) => handleChange('nivelInspecao.centroInspecao', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nome do centro de inspeção"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Observações da Inspeção
                  </label>
                  <textarea
                    value={formData.nivelInspecao.observacoes || ''}
                    onChange={(e) => handleChange('nivelInspecao.observacoes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Observações sobre a última inspeção..."
                  />
                </div>
              </div>

              {/* Informações sobre a categoria selecionada */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                  Informações da Categoria {formData.nivelInspecao.categoria}
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  {formData.nivelInspecao.categoria === 'A' && 
                    'Chanté - Inspeção a cada 6 meses - Não em boas condições'}
                  {formData.nivelInspecao.categoria === 'B' && 
                    'Nacional - Inspeção a cada 1 ano - Condições médias'}
                  {formData.nivelInspecao.categoria === 'C' && 
                    'Transito - Inspeção a cada 2 anos - Camião novo'}
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Footer com botões de ação */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Campos marcados com * são obrigatórios
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <FiSave className="h-4 w-4" />
                  <span>Salvar Camião</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}