/* eslint-disable @typescript-eslint/no-explicit-any */
// components/NovaCargaModal.tsx

import React, { useState, useEffect } from "react";
import {
  FiX,
  FiSave,
  FiPackage,
  FiUser,
  FiMapPin,
  FiDollarSign,
  FiTruck,
  FiAlertCircle,
  FiShield,
  FiAlertTriangle,
} from "react-icons/fi";
import { FaCalculator } from "react-icons/fa";

interface NovaCargaModalProps {
  show: boolean;
  onClose: () => void;
  novaCarga: any;
  setNovaCarga: (carga: any) => void;
  onSubmit: (camiaoId?: string, codigoGPS?: string) => Promise<void>;
  isSubmitting: boolean;
  clientes?: any[];
  isLoadingClientes?: boolean;
  onSelecionarCliente?: (clienteId: string) => void;
  // Novas props para cálculos
  onCalcularCustos?: (dados: any) => Promise<any>;
  onVerificarViabilidade?: (
    codigoCarga: string,
    camiaoId: string
  ) => Promise<any>;
}

// Tipos melhorados
interface CampoBase {
  tipo: string;
  nome: string;
  label: string;
  valor: any;
  placeholder?: string;
  step?: string;
  disabled?: boolean;
  required?: boolean;
  validacao?: (valor: any) => string | null;
}

interface CampoSelect extends CampoBase {
  tipo: "select";
  opcoes: { valor: string; label: string }[];
}
interface CampoText extends CampoBase {
  tipo: "text" | "number" | "textarea" | "datetime-local";
  min?: number;
  max?: number;
}
interface CampoSecao {
  tipo: "section";
  titulo: string;
  descricao?: string;
  campos: (CampoText | CampoSelect)[]; // subseções podem ter campos normais
}

type Campo = CampoText | CampoSelect | CampoSecao;

interface Secao {
  id: string;
  titulo: string;
  icone: React.ComponentType;
  descricao?: string;
  campos: Campo[];
}

export const NovaCargaModal: React.FC<NovaCargaModalProps> = ({
  show,
  onClose,
  novaCarga,
  setNovaCarga,
  onSubmit,
  isSubmitting,
  onCalcularCustos,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onVerificarViabilidade,
}) => {
  const [erros, setErros] = useState<Record<string, string>>({});
  const [calculos, setCalculos] = useState<any>(null);
  const [secaoAtiva, setSecaoAtiva] = useState<string>("identificacao");
  const [mostrarAlertaSeguro, setMostrarAlertaSeguro] = useState(false);
  const [seguroAceito, setSeguroAceito] = useState(false);

  // Validações personalizadas
  const validacoes = {
    pesoBruto: (valor: number) =>
      valor <= 0 ? "Peso bruto deve ser maior que zero" : null,
    valorMercadoria: (valor: number) =>
      valor <= 0 ? "Valor da mercadoria deve ser maior que zero" : null,
    quantidadeVolumes: (valor: number) =>
      valor < 0 ? "Quantidade não pode ser negativa" : null,
  };

  // Função para calcular custos automaticamente
  const calcularCustosAutomaticos = async () => {
    if (!onCalcularCustos) return;

    try {
      const dadosCalculo = {
        tipoPercurso: novaCarga.tipoPercurso,
        destinoFrete: novaCarga.destinoFrete,
        pesoBruto: novaCarga.pesoBruto,
        valorMercadoria: novaCarga.valorMercadoria,
        categoriaSeguro: novaCarga.categoriaSeguro,
        abrangenciaSeguro: novaCarga.abrangenciaSeguro,
      };

      // Verificar se todos os campos necessários estão preenchidos
      const camposPreenchidos = Object.values(dadosCalculo).every(
        (valor) =>
          valor !== undefined && valor !== null && valor !== "" && valor !== 0
      );

      if (camposPreenchidos) {
        const resultado = await onCalcularCustos(dadosCalculo);
        setCalculos(resultado);
      }
    } catch (error) {
      console.error("Erro ao calcular custos:", error);
    }
  };

  // Calcular automaticamente quando campos relevantes mudam
  useEffect(() => {
    if (show) {
      // Só calcular quando o modal estiver aberto
      calcularCustosAutomaticos();
    }
  }, [
    show,
    novaCarga.tipoPercurso,
    novaCarga.destinoFrete,
    novaCarga.pesoBruto,
    novaCarga.valorMercadoria,
    novaCarga.categoriaSeguro,
    novaCarga.abrangenciaSeguro,
  ]);

  const validarCampo = (nome: string, valor: any): string | null => {
    const campo = todasCampos.find((c) => c.nome === nome);
    if (campo?.required && (!valor || valor === "")) {
      return "Campo obrigatório";
    }

    if (campo?.validacao) {
      return campo.validacao(valor);
    }

    if (validacoes[nome as keyof typeof validacoes]) {
      return validacoes[nome as keyof typeof validacoes](valor);
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar todos os campos obrigatórios
    const novosErros: Record<string, string> = {};
    todasCampos.forEach((campo) => {
      if (campo.required) return;

      const valor = obterValorPorCaminho(novaCarga, campo.nome);
      const erro = validarCampo(campo.nome, valor);
      if (erro) {
        novosErros[campo.nome] = erro;
      }
    });

    // Verificar se o seguro foi recusado e mostrar alerta
    if (novaCarga.contratarSeguro === false && !seguroAceito) {
      setMostrarAlertaSeguro(true);
      return;
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    try {
      await onSubmit();
    } catch (error) {
      console.error("Erro ao criar carga:", error);
    }
  };

  const handleInputChange = (path: string, value: any) => {
    const erro = validarCampo(path, value);
    setErros((prev) => ({
      ...prev,
      [path]: erro || "",
    }));

    // Se o usuário mudar a opção de contratar seguro
    if (path === "contratarSeguro") {
      const contratarSeguro = value === "true";

      setNovaCarga((prev: any) => {
        const newState = { ...prev };

        if (contratarSeguro) {
          // Se está contratando seguro, manter ou inicializar os dados do seguro
          newState.contratarSeguro = true;
          newState.seguro = {
            ...prev.seguro,
            statusSeguro: "ativo",
            valorSegurado: prev.valorMercadoria || 0,
            premioFinal: calculos?.data?.seguroCarga || 0,
          };
        } else {
          // Se não está contratando seguro, limpar os dados do seguro
          newState.contratarSeguro = false;
          newState.seguro = {
            statusSeguro: "cancelado",
            valorSegurado: 0,
            premioFinal: 0,
            apolice: "",
            seguradora: "",
            dataInicio: "",
            dataFim: "",
          };
          // Mostrar alerta
          setMostrarAlertaSeguro(true);
        }

        return newState;
      });

      return;
    }

    const paths = path.split(".");
    setNovaCarga((prev: any) => {
      const newState = { ...prev };
      let current: any = newState;

      for (let i = 0; i < paths.length - 1; i++) {
        if (!current[paths[i]]) {
          current[paths[i]] = {};
        }
        current = current[paths[i]];
      }

      current[paths[paths.length - 1]] = value;
      return newState;
    });
  };

  const obterValorPorCaminho = (obj: any, path: string) => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  };

  const handleAceitarSemSeguro = () => {
    setSeguroAceito(true);
    setMostrarAlertaSeguro(false);
    // Garantir que os campos do seguro estejam desabilitados
    setNovaCarga((prev: any) => ({
      ...prev,
      contratarSeguro: false,
      seguro: {
        statusSeguro: "cancelado",
        valorSegurado: 0,
        premioFinal: 0,
        apolice: "",
        seguradora: "",
        dataInicio: "",
        dataFim: "",
      },
    }));
  };

  const handleCancelarSemSeguro = () => {
    setNovaCarga((prev: any) => ({
      ...prev,
      contratarSeguro: true,
      seguro: {
        ...prev.seguro,
        statusSeguro: "ativo",
        valorSegurado: prev.valorMercadoria || 0,
        premioFinal: calculos?.data?.seguroCarga || 0,
      },
    }));
    setMostrarAlertaSeguro(false);
  };

  const secoes: Secao[] = [
    {
      id: "identificacao",
      titulo: "Identificação da Carga",
      icone: FiPackage,
      descricao: "Informações básicas e classificação da carga",
      campos: [
        {
          tipo: "select",
          nome: "tipoCarga",
          label: "Tipo de Carga *",
          valor: novaCarga.tipoCarga,
          required: true,
          opcoes: [
            { valor: "Contentorizada", label: "Contentorizada" },
            { valor: "Solta", label: "Solta" },
            { valor: "Granel", label: "Granel" },
            { valor: "Frigorífica", label: "Frigorífica" },
            { valor: "Perigosa", label: "Perigosa" },
          ],
        },
        {
          tipo: "select",
          nome: "naturezaCarga",
          label: "Natureza da Carga *",
          valor: novaCarga.naturezaCarga,
          required: true,
          opcoes: [
            { valor: "não perigosa", label: "Não Perigosa" },
            { valor: "perigosa", label: "Perigosa" },
            { valor: "sensível", label: "Sensível" },
            { valor: "fragil", label: "Frágil" },
          ],
        },
        {
          tipo: "select",
          nome: "categoriaSeguro",
          label: "Categoria para Seguro *",
          valor: novaCarga.categoriaSeguro,
          required: true,
          opcoes: [
            { valor: "Produtos Alimentares", label: "Produtos Alimentares" },
            { valor: "Eletrónicos", label: "Eletrónicos" },
            { valor: "Materiais Perigosos", label: "Materiais Perigosos" },
            { valor: "Carga Geral", label: "Carga Geral" },
            { valor: "Carga Consolidada", label: "Carga Consolidada" },
          ],
        },
        {
          tipo: "select",
          nome: "abrangenciaSeguro",
          label: "Abrangência do Seguro *",
          valor: novaCarga.abrangenciaSeguro,
          required: true,
          opcoes: [
            { valor: "Nacional", label: "Nacional" },
            { valor: "Regional SADC", label: "Regional SADC" },
            { valor: "Internacional", label: "Internacional" },
          ],
        },
        {
          tipo: "select",
          nome: "tipoPercurso",
          label: "Tipo de Percurso *",
          valor: novaCarga.tipoPercurso,
          required: true,
          opcoes: [
            { valor: "Beira-Interland", label: "Beira-Interland (USD)" },
            { valor: "Local", label: "Local (MZN)" },
            { valor: "Nacional", label: "Nacional (MZN)" },
          ],
        },
        {
          tipo: "text",
          nome: "destinoFrete",
          label: "Destino do Frete *",
          valor: novaCarga.destinoFrete,
          required: true,
          placeholder: "Ex: Maputo, Malawi - Lidongwe, etc.",
        },
        {
          tipo: "select",
          nome: "prioridade",
          label: "Prioridade",
          valor: novaCarga.prioridade,
          opcoes: [
            { valor: "baixa", label: "Baixa" },
            { valor: "média", label: "Média" },
            { valor: "alta", label: "Alta" },
            { valor: "urgente", label: "Urgente" },
          ],
        },
        {
          tipo: "textarea",
          nome: "descricao",
          label: "Descrição *",
          valor: novaCarga.descricao,
          required: true,
          placeholder: "Descreva a carga em detalhes...",
        },
      ],
    },
    {
      id: "pesos",
      titulo: "Pesos e Dimensões",
      icone: FiPackage,
      descricao: "Informações sobre peso, volume e dimensões da carga",
      campos: [
        {
          tipo: "number",
          nome: "pesoBruto",
          label: "Peso Bruto (kg) *",
          valor: novaCarga.pesoBruto,
          required: true,
          min: 0.1,
          step: "0.1",
          validacao: validacoes.pesoBruto,
        },
        {
          tipo: "number",
          nome: "pesoLiquido",
          label: "Peso Líquido (kg)",
          valor: novaCarga.pesoLiquido,
          min: 0,
          step: "0.1",
        },
        {
          tipo: "number",
          nome: "volume",
          label: "Volume (m³)",
          valor: novaCarga.volume,
          min: 0,
          step: "0.01",
        },
        {
          tipo: "number",
          nome: "quantidadeVolumes",
          label: "Quantidade de Volumes",
          valor: novaCarga.quantidadeVolumes,
          min: 1,
          validacao: validacoes.quantidadeVolumes,
        },
        {
          tipo: "text",
          nome: "embalagem",
          label: "Tipo de Embalagem",
          valor: novaCarga.embalagem,
          placeholder: "Ex: Caixas, Paletes, etc.",
        },
        {
          tipo: "section",
          titulo: "Dimensões (cm)",
          campos: [
            {
              tipo: "number",
              nome: "dimensoes.largura",
              label: "Largura",
              valor: novaCarga.dimensoes?.largura,
              min: 0,
            },
            {
              tipo: "number",
              nome: "dimensoes.altura",
              label: "Altura",
              valor: novaCarga.dimensoes?.altura,
              min: 0,
            },
            {
              tipo: "number",
              nome: "dimensoes.comprimento",
              label: "Comprimento",
              valor: novaCarga.dimensoes?.comprimento,
              min: 0,
            },
          ],
        },
      ],
    },
    {
      id: "cliente",
      titulo: "Cliente e Documentação",
      icone: FiUser,
      descricao: "Informações do cliente e documentação relacionada",
      campos: [
        {
          tipo: "text",
          nome: "clienteId",
          label: "ID do Cliente *",
          valor: novaCarga.clienteId,
          required: true,
          disabled: true, // Campo desabilitado
        },
        {
          tipo: "text",
          nome: "cliente",
          label: "Nome do Cliente *",
          valor: novaCarga.cliente,
          required: true,
          disabled: true, // Campo desabilitado
        },
        {
          tipo: "text",
          nome: "exportador",
          label: "Exportador",
          valor: novaCarga.exportador,
        },
        {
          tipo: "text",
          nome: "importador",
          label: "Importador",
          valor: novaCarga.importador,
        },
        {
          tipo: "text",
          nome: "contatoCliente",
          label: "Contato do Cliente",
          valor: novaCarga.contatoCliente,
          placeholder: "Telefone ou email de contato",
        },
        {
          tipo: "textarea",
          nome: "instrucaoEspecial",
          label: "Instruções Especiais",
          valor: novaCarga.instrucaoEspecial,
          placeholder: "Instruções especiais para o transporte...",
        },
      ],
    },
    {
      id: "rota",
      titulo: "Rota e Localização",
      icone: FiMapPin,
      descricao: "Informações sobre origem, destino e datas",
      campos: [
        {
          tipo: "section",
          titulo: "Origem",
          campos: [
            {
              tipo: "text",
              nome: "origem.pais",
              label: "País *",
              valor: novaCarga.origem?.pais,
              required: true,
            },
            {
              tipo: "text",
              nome: "origem.cidade",
              label: "Cidade *",
              valor: novaCarga.origem?.cidade,
              required: true,
            },
            {
              tipo: "text",
              nome: "origem.local",
              label: "Local *",
              valor: novaCarga.origem?.local,
              required: true,
              placeholder: "Endereço específico",
            },
          ],
        },
        {
          tipo: "section",
          titulo: "Destino",
          campos: [
            {
              tipo: "text",
              nome: "destino.pais",
              label: "País *",
              valor: novaCarga.destino?.pais,
              required: true,
            },
            {
              tipo: "text",
              nome: "destino.cidade",
              label: "Cidade *",
              valor: novaCarga.destino?.cidade,
              required: true,
            },
            {
              tipo: "text",
              nome: "destino.local",
              label: "Local *",
              valor: novaCarga.destino?.local,
              required: true,
              placeholder: "Endereço específico",
            },
          ],
        },
        {
          tipo: "datetime-local",
          nome: "dataColeta",
          label: "Data de Coleta Prevista",
          valor: novaCarga.dataColeta,
        },
        {
          tipo: "datetime-local",
          nome: "dataEntregaPrevista",
          label: "Data de Entrega Prevista",
          valor: novaCarga.dataEntregaPrevista,
        },
      ],
    },
    {
      id: "financeiro",
      titulo: "Informações Financeiras",
      icone: FiDollarSign,
      descricao: "Valores financeiros e cálculos automáticos",
      campos: [
        {
          tipo: "number",
          nome: "valorMercadoria",
          label: "Valor da Mercadoria (MZN) *",
          valor: novaCarga.valorMercadoria,
          required: true,
          step: "0.01",
          min: 0.01,
          validacao: validacoes.valorMercadoria,
        },
        {
          tipo: "number",
          nome: "valorFrete",
          label: "Valor do Frete (MZN)",
          valor: novaCarga.valorFrete,
          step: "0.01",
          disabled: true, // Calculado automaticamente
        },
        {
          tipo: "number",
          nome: "taxasPortuarias",
          label: "Taxas Portuárias (MZN)",
          valor: novaCarga.taxasPortuarias,
          step: "0.01",
        },
        {
          tipo: "number",
          nome: "despesasOperacionais",
          label: "Despesas Operacionais (MZN)",
          valor: novaCarga.despesasOperacionais,
          step: "0.01",
        },
      ],
    },
    {
      id: "seguro",
      titulo: "Seguro da Carga",
      icone: FiShield,
      descricao:
        novaCarga.contratarSeguro === false
          ? "⚠️ Seguro não contratado - Risco assumido pelo cliente"
          : "Proteção e cobertura para sua carga",
      campos: (() => {
        const camposBase: Campo[] = [
          {
            tipo: "select",
            nome: "contratarSeguro",
            label: "Contratar Seguro *",
            valor: novaCarga.contratarSeguro ?? true,
            required: true,
            opcoes: [
              { valor: "true", label: "✅ Sim, quero proteger minha carga" },
              { valor: "false", label: "❌ Não, assumo os riscos" },
            ],
          } as CampoSelect,
        ];

        if (novaCarga.contratarSeguro === false) {
          // Mostra apenas um campo de alerta quando seguro não é contratado
          camposBase.push({
            tipo: "text",
            nome: "alertaSeguro",
            label: " ",
            valor: "",
            disabled: true,
            placeholder:
              "⚠️ ATENÇÃO: Mega Centro de Logística não se responsabiliza por danos à carga",
          } as CampoText);
        } else {
          // Mostra todos os campos do seguro quando seguro é contratado
          const camposSeguro: Campo[] = [
            {
              tipo: "select",
              nome: "seguro.statusSeguro",
              label: "Status do Seguro *",
              valor: novaCarga.seguro?.statusSeguro || "ativo",
              required: true,
              opcoes: [
                { valor: "ativo", label: "Ativo" },
                { valor: "pendente", label: "Pendente" },
              ],
            } as CampoSelect,
            {
              tipo: "number",
              nome: "seguro.premioFinal",
              label: "Prêmio do Seguro (MZN) *",
              valor:
                novaCarga.seguro?.premioFinal ||
                calculos?.data?.seguroCarga ||
                0,
              step: "0.01",
              required: true,
            } as CampoText,
            {
              tipo: "number",
              nome: "seguro.valorSegurado",
              label: "Valor Segurado (MZN) *",
              valor:
                novaCarga.seguro?.valorSegurado ||
                novaCarga.valorMercadoria ||
                0,
              step: "0.01",
              required: true,
            } as CampoText,
            {
              tipo: "text",
              nome: "seguro.apolice",
              label: "Número da Apólice",
              valor: novaCarga.seguro?.apolice || "",
              placeholder: "Número da apólice do seguro",
            } as CampoText,
            {
              tipo: "text",
              nome: "seguro.seguradora",
              label: "Seguradora",
              valor: novaCarga.seguro?.seguradora || "",
              placeholder: "Nome da seguradora",
            } as CampoText,
            {
              tipo: "datetime-local",
              nome: "seguro.dataInicio",
              label: "Data de Início da Cobertura",
              valor: novaCarga.seguro?.dataInicio || "",
            } as CampoText,
            {
              tipo: "datetime-local",
              nome: "seguro.dataFim",
              label: "Data de Fim da Cobertura",
              valor: novaCarga.seguro?.dataFim || "",
            } as CampoText,
          ];
          camposBase.push(...camposSeguro);
        }

        return camposBase;
      })(),
    },
    {
      id: "contentor",
      titulo: "Equipamento/Contentor",
      icone: FiTruck,
      descricao: "Informações do contentor ou equipamento utilizado",
      campos: [
         {
      tipo: "select", // Adicione este campo
      nome: "contentor.estadoAtual",
      label: "Estado do Contentor *",
      valor: novaCarga.contentor?.estadoAtual || "bom",
      required: true,
      opcoes: [
        { valor: "excelente", label: "Excelente" },
        { valor: "bom", label: "Bom" },
        { valor: "regular", label: "Regular" },
        { valor: "ruim", label: "Ruim" },
        { valor: "péssimo", label: "Péssimo" },
      ],
    },
        {
          tipo: "text",
          nome: "contentor.numero",
          label: "Número do Contentor",
          valor: novaCarga.contentor?.numero,
          placeholder: "Número único do contentor",
        },
        {
          tipo: "text",
          nome: "contentor.tipo",
          label: "Tipo do Contentor",
          valor: novaCarga.contentor?.tipo,
          placeholder: "Ex: 20ft, 40ft, etc.",
        },
        {
          tipo: "number",
          nome: "contentor.tara",
          label: "Tara (kg)",
          valor: novaCarga.contentor?.tara,
          step: "0.1",
        },
        {
          tipo: "number",
          nome: "contentor.capacidadeMaxima",
          label: "Capacidade Máxima (kg)",
          valor: novaCarga.contentor?.capacidadeMaxima,
          step: "0.1",
        },
        {
          tipo: "text",
          nome: "contentor.lacreOrigem",
          label: "Lacre de Origem",
          valor: novaCarga.contentor?.lacreOrigem,
        },
        {
          tipo: "text",
          nome: "contentor.lacreDestino",
          label: "Lacre de Destino",
          valor: novaCarga.contentor?.lacreDestino,
        },
      ],
    },
  ];
  // Extrair todas as camadas para validação
  const todasCampos = secoes.flatMap((secao) =>
    secao.campos.flatMap((campo) =>
      campo.tipo === "section" ? campo.campos : [campo]
    )
  );

  const renderCampo = (campo: Campo) => {
    if (campo.tipo === "section") {
      return (
        <div className="mb-6 md:col-span-2 lg:col-span-3">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            {campo.titulo}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campo.campos.map((subCampo, subIndex) => (
              <div key={subIndex}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {subCampo.label}
                  {subCampo.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {renderCampo(subCampo)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    const valor = obterValorPorCaminho(novaCarga, campo.nome);
    const erro = erros[campo.nome];

    const commonProps = {
      value: valor || "",
      onChange: (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => handleInputChange(campo.nome, e.target.value),
      className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
        campo.disabled
          ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed opacity-70"
          : erro
          ? "border-red-500"
          : "border-gray-300 dark:border-gray-600"
      }`,
      required: campo.required,
      placeholder: campo.placeholder,
      disabled: campo.disabled,
    };

    const campoComErro = (
      <div className="relative">
        {(() => {
          switch (campo.tipo) {
            case "select":
              return (
                <select {...commonProps}>
                  <option value="">Selecione...</option>
                  {campo.opcoes.map((opcao) => (
                    <option key={opcao.valor} value={opcao.valor}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
              );

            case "textarea":
              return <textarea {...commonProps} rows={3} />;

            case "datetime-local":
              return <input type="datetime-local" {...commonProps} />;

            case "number":
              return (
                <input
                  type="number"
                  min={campo.min}
                  max={campo.max}
                  step={campo.step || "1"}
                  {...commonProps}
                />
              );

            default:
              return <input type="text" {...commonProps} />;
          }
        })()}

        {erro && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FiAlertCircle className="w-4 h-4 text-red-500" />
          </div>
        )}

        {erro && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{erro}</p>
        )}
      </div>
    );

    return campoComErro;
  };

  // Retorno condicional deve ser o último no componente
  if (!show) return null;

  return (
    <>
      {/* Modal de Alerta do Seguro */}
      {mostrarAlertaSeguro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FiAlertTriangle className="w-8 h-8 text-yellow-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Atenção - Seguro Não Contratado
                </h3>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Você escolheu <strong>não contratar</strong> o seguro para
                  esta carga.
                </p>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                    ⚠️ <strong>AVISO IMPORTANTE:</strong> A Mega Centro de
                    Logística <strong>NÃO SE RESPONSABILIZA</strong> por
                    quaisquer danos, perdas, avarias ou extravios que venham a
                    ocorrer com sua carga durante o transporte.
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                  Todos os riscos serão de sua inteira responsabilidade.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancelarSemSeguro}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                >
                  Voltar e Contratar Seguro
                </button>
                <button
                  type="button"
                  onClick={handleAceitarSemSeguro}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Confirmar Sem Seguro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Principal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Nova Carga
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Preencha as informações da nova carga
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Navegação entre seções */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto p-4 space-x-2">
              {secoes.map((secao) => (
                <button
                  key={secao.id}
                  onClick={() => setSecaoAtiva(secao.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    secaoAtiva === secao.id
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  }`}
                >
                  <secao.icone />
                  <span>{secao.titulo}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Card de cálculos automáticos */}
            {calculos && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                  <FaCalculator className="w-5 h-5 mr-2" />
                  Cálculos Automáticos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700 dark:text-blue-300">
                      Frete Ida/Volta
                    </p>
                    <p className="font-semibold">
                      {calculos.data?.fretes?.freteIda?.toLocaleString() || 0} /{" "}
                      {calculos.data?.fretes?.freteVolta?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-700 dark:text-blue-300">Comissão</p>
                    <p className="font-semibold">
                      {calculos.data?.comissao?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-700 dark:text-blue-300">
                      Seguro Carga
                    </p>
                    <p className="font-semibold">
                      {calculos.data?.seguroCarga?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-700 dark:text-blue-300">
                      Valor Total
                    </p>
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      {calculos.data?.valorTotal?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {secoes
                .filter((secao) => secaoAtiva === secao.id)
                .map((secao) => (
                  <div
                    key={secao.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                        <secao.icone />
                        {secao.titulo}
                      </h3>
                      {secao.descricao && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {secao.descricao}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {secao.campos.map((campo, index) => (
                        <div
                          key={index}
                          className={
                            campo.tipo === "textarea" ||
                            campo.tipo === "section"
                              ? "md:col-span-2 lg:col-span-3"
                              : ""
                          }
                        >
                          {campo.tipo !== "section" && (
                            <>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {campo.label}
                                {campo.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              {renderCampo(campo)}
                            </>
                          )}
                          {campo.tipo === "section" && renderCampo(campo)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Footer com botões */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Campos marcados com * são obrigatórios
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{isSubmitting ? "Criando..." : "Criar Carga"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
