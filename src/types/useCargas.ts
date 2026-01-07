/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Carga, StatusCarga } from "@/app/dashboard/cliente/cargaService";
import { Metrics } from "@/app/dashboard/transportador/viagens";
import { useAuth } from "@/context/AuthContext"; // Importar o contexto de autenticação

// Interface para filtros avançados
export interface FiltrosAvancados {
  prioridade: string;
  valorMin: string;
  valorMax: string;
  dataInicio: string;
  dataFim: string;
  tipoCarga: string;
  naturezaCarga: string;
  motoristaEmpresa: boolean;
}

export function useCargas(nomeEmpresa?: string, transportadoraId?: string) {
  const { user } = useAuth(); // Obter usuário do contexto
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [filteredCargas, setFilteredCargas] = useState<Carga[]>([]);
  const [
    cargasFiltradasPorTransportadora,
    setCargasFiltradasPorTransportadora,
  ] = useState<Carga[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [metrics, setMetrics] = useState<Metrics>({
    totalCargas: 0,
    cargasEntregues: 0,
    cargasTransito: 0,
    cargasAtrasadas: 0,
    pesoTotal: 0,
    valorTotalFretes: 0,
  });

  // Obter nome da transportadora do usuário logado
  const transportadoraNome = useCallback(() => {
    // Se é uma transportadora, usar nomeEmpresa
    if (user?.tipo === "transportadora" && "nomeEmpresa" in user) {
      return user.nomeEmpresa;
    }
    
    // Se nomeEmpresa foi passado como parâmetro, usar
    if (nomeEmpresa) {
      return nomeEmpresa;
    }
    
    return "";
  }, [user, nomeEmpresa]);

  // Obter ID da transportadora do usuário logado
  const transportadoraIdLogado = useCallback(() => {
    // Se é uma transportadora, usar transportadoraId
    if (user?.tipo === "transportadora" && "transportadoraId" in user) {
      return user.transportadoraId?.toString();
    }
    
    // Se transportadoraId foi passado como parâmetro, usar
    if (transportadoraId) {
      return transportadoraId;
    }
    
    return "";
  }, [user, transportadoraId]);

  // Estado para filtros
  const [filtrosAtivos, setFiltrosAtivos] = useState<{
    searchTerm: string;
    statusFilter: string;
    tipoFilter: string;
    filtrosAvancados: FiltrosAvancados;
  }>({
    searchTerm: "",
    statusFilter: "todos",
    tipoFilter: "todos",
    filtrosAvancados: {
      prioridade: "todos",
      valorMin: "",
      valorMax: "",
      dataInicio: "",
      dataFim: "",
      tipoCarga: "todos",
      naturezaCarga: "todos",
      motoristaEmpresa: false,
    },
  });

  // Função para buscar cargas da API COM FILTRO POR EMPRESA
  const fetchCargas = useCallback(
    async (page = 1, pageSize = 100) => {
      try {
        setIsDataLoading(true);
        const nomeTransportadora = transportadoraNome();
        const idTransportadora = transportadoraIdLogado();

        // Preparar corpo da requisição
        const requestBody: any = {
          curPage: page,
          pageSize: pageSize,
        };

        // Se temos nome da transportadora, adicionar como filtro
        if (nomeTransportadora && nomeTransportadora !== "Mega Centro e Logistica") {
          requestBody.nomeEmpresa = nomeTransportadora;
        }

        console.log("Buscando cargas com filtro:", requestBody);
        console.log("Usuário logado:", user);
        console.log("Nome da transportadora:", nomeTransportadora);
        console.log("ID da transportadora:", idTransportadora);

        const response = await axios.post(
          "https://desktop-api-4f850b3f9733.herokuapp.com/getCargaList",
          requestBody
        );

        if (response.data.returnCode === 200) {
          const cargasData = response.data.data.list;

          console.log("Cargas recebidas da API:", cargasData.length, "itens");
          console.log(
            "Primeira carga:",
            cargasData[0]
              ? {
                  codigo: cargasData[0].codigo,
                  nomeEmpresa: cargasData[0].nomeEmpresa,
                  transportadora: cargasData[0].transportadora,
                  motorista: cargasData[0].motorista,
                }
              : "Nenhuma carga"
          );

          // Mapear os dados da API para o formato da interface Carga
          const cargasMapeadas = cargasData.map((cargaData: any) => ({
            _id: cargaData._id,
            codigo: cargaData.codigo,
            tipoCarga: cargaData.tipoCarga,
            descricao: cargaData.descricao,
            naturezaCarga: cargaData.naturezaCarga,
            pesoBruto: cargaData.pesoBruto,
            cliente: cargaData.cliente,
            clienteId: cargaData.clienteId,
            origem: {
              cidade: cargaData.origem?.cidade || "",
              local: cargaData.origem?.local || "",
              pais: cargaData.origem?.pais || "",
            },
            destino: {
              cidade: cargaData.destino?.cidade || "",
              local: cargaData.destino?.local || "",
              pais: cargaData.destino?.pais || "",
            },
            status: cargaData.status as StatusCarga,
            prioridade: cargaData.prioridade,
            valorTotal: cargaData.valorTotal || 0,
            dataColeta: cargaData.dataColeta
              ? new Date(cargaData.dataColeta).toISOString()
              : undefined,
            dataEntregaPrevista: cargaData.dataEntregaPrevista
              ? new Date(cargaData.dataEntregaPrevista).toISOString()
              : undefined,
            dataEntregaReal: cargaData.dataEntregaReal
              ? new Date(cargaData.dataEntregaReal).toISOString()
              : undefined,
            // NOVO: Campo transportadora
            transportadora: cargaData.transportadora || "",
            motorista: cargaData.motorista
              ? {
                  nome: cargaData.motorista.nome || "",
                  telefone: cargaData.motorista.telefone || "",
                  empresaMotorista:
                    cargaData.motorista.empresaMotorista ||
                    cargaData.nomeEmpresa,
                  empresaMotoristaId: cargaData.motorista.empresaMotoristaId,
                  id: cargaData.motorista.id,
                }
              : undefined,
            veiculo: cargaData.veiculo
              ? {
                  matricula: cargaData.veiculo.matricula || "",
                  modelo: cargaData.veiculo.modelo || "",
                }
              : undefined,
            dataCriacao: new Date(cargaData.dataCriacao).toISOString(),
            dataAtualizacao: new Date(cargaData.dataAtualizacao).toISOString(),
            volume: cargaData.volume,
            embalagem: cargaData.embalagem,
            pontoAtual: cargaData.pontoAtual,
            ocorrencias: cargaData.ocorrencias,
            documentos: cargaData.documentos,
            nomeEmpresa: cargaData.nomeEmpresa || "Mega Centro e Logistica",
            // Campos adicionais para cálculos
            categoriaSeguro: cargaData.categoriaSeguro || "Carga Geral",
            abrangenciaSeguro: cargaData.abrangenciaSeguro || "Nacional",
            valorMercadoria: cargaData.valorMercadoria || 0,
            tipoPercurso: cargaData.tipoPercurso || "Nacional",
            destinoFrete: cargaData.destinoFrete || "",
          }));

          // Filtrar localmente por empresa se necessário
          let cargasFiltradasPorEmpresa = cargasMapeadas;

          if (nomeTransportadora && nomeTransportadora !== "Mega Centro e Logistica") {
            cargasFiltradasPorEmpresa = cargasMapeadas.filter(
              (carga: {
                nomeEmpresa: any;
                transportadora: any;
                motorista: { empresaMotorista: any };
              }) => {
                // Verificar pelo campo transportadora primeiro
                if (carga.transportadora && carga.transportadora.trim() !== "") {
                  return (
                    carga.transportadora.trim().toLowerCase() === 
                    nomeTransportadora.trim().toLowerCase()
                  );
                }
                
                // Se não tiver transportadora, verificar por nomeEmpresa ou empresaMotorista
                const cargaEmpresa =
                  carga.nomeEmpresa || carga.motorista?.empresaMotorista;
                return (
                  cargaEmpresa &&
                  cargaEmpresa.toLowerCase() === nomeTransportadora.toLowerCase()
                );
              }
            );

            console.log(
              `Filtradas ${cargasFiltradasPorEmpresa.length} de ${cargasMapeadas.length} cargas para ${nomeTransportadora}`
            );
          }

          setCargas(cargasFiltradasPorEmpresa);
          aplicarTodosFiltros(cargasFiltradasPorEmpresa, filtrosAtivos);
        } else {
          console.error("Erro na API:", response.data.returnMsg);
          setCargas([]);
          setFilteredCargas([]);
        }
      } catch (error) {
        console.error("Erro ao buscar cargas:", error);
        setCargas([]);
        setFilteredCargas([]);
      } finally {
        setIsDataLoading(false);
      }
    },
    [user, transportadoraNome, transportadoraIdLogado, filtrosAtivos]
  );

  // Função para filtrar cargas por transportadora
  const filtrarPorTransportadora = useCallback(
    (cargasList: Carga[]): Carga[] => {
      const nomeTransportadora = transportadoraNome();
      const idTransportadora = transportadoraIdLogado();

      // Se não for uma transportadora, não aplicar este filtro
      if (!nomeTransportadora) {
        return cargasList;
      }

      console.log(
        `Aplicando filtro de transportadora para: ${nomeTransportadora}`
      );

      const cargasFiltradas = cargasList.filter((carga) => {
        // Verificar pelo campo transportadora
        if (carga.transportadora && carga.transportadora.trim() !== "") {
          const correspondeTransportadora = 
            carga.transportadora.trim().toLowerCase() === 
            nomeTransportadora.trim().toLowerCase();
          
          if (correspondeTransportadora) {
            console.log(`Carga ${carga.codigo} tem transportadora: ${carga.transportadora}`);
            return true;
          }
        }

        return false;
      });

      console.log(
        `Filtradas ${cargasFiltradas.length} cargas da transportadora ${nomeTransportadora}`
      );

      return cargasFiltradas;
    },
    [transportadoraNome, transportadoraIdLogado]
  );

  // Função para aplicar todos os filtros
  const aplicarTodosFiltros = useCallback(
    (cargasList: Carga[], filtros: typeof filtrosAtivos) => {
      let resultado = [...cargasList];
      const { searchTerm, statusFilter, tipoFilter, filtrosAvancados } =
        filtros;
      
      const nomeTransportadora = transportadoraNome();
      const idTransportadora = transportadoraIdLogado();

      // Aplicar filtro de transportadora se for uma transportadora
      if (nomeTransportadora) {
        resultado = filtrarPorTransportadora(resultado);
        console.log(
          `Após filtro de transportadora: ${resultado.length} cargas`
        );
      }

      // Filtro por termo de busca
      if (searchTerm) {
        const termo = searchTerm.toLowerCase().trim();
        const originalCount = resultado.length;
        resultado = resultado.filter(
          (carga) =>
            carga.codigo.toLowerCase().includes(termo) ||
            (carga.cliente && carga.cliente.toLowerCase().includes(termo)) ||
            (carga.origem.cidade &&
              carga.origem.cidade.toLowerCase().includes(termo)) ||
            (carga.destino.cidade &&
              carga.destino.cidade.toLowerCase().includes(termo)) ||
            (carga.descricao && carga.descricao.toLowerCase().includes(termo)) ||
            // NOVO: Incluir transportadora na busca
            (carga.transportadora && carga.transportadora.toLowerCase().includes(termo))
        );
        console.log(
          `Após busca "${searchTerm}": ${resultado.length} de ${originalCount} cargas`
        );
      }

      // Filtro por status
      if (statusFilter !== "todos") {
        const originalCount = resultado.length;
        resultado = resultado.filter((carga) => carga.status === statusFilter);
        console.log(
          `Após filtro de status "${statusFilter}": ${resultado.length} de ${originalCount} cargas`
        );
      }

      // Filtro por tipo
      if (tipoFilter !== "todos") {
        const originalCount = resultado.length;
        resultado = resultado.filter((carga) => carga.tipoCarga === tipoFilter);
        console.log(
          `Após filtro de tipo "${tipoFilter}": ${resultado.length} de ${originalCount} cargas`
        );
      }

      // Filtros avançados
      if (filtrosAvancados.prioridade !== "todos") {
        resultado = resultado.filter(
          (carga) => carga.prioridade === filtrosAvancados.prioridade
        );
      }

      if (filtrosAvancados.valorMin) {
        const valorMin = parseFloat(filtrosAvancados.valorMin);
        resultado = resultado.filter((carga) => carga.valorTotal >= valorMin);
      }

      if (filtrosAvancados.valorMax) {
        const valorMax = parseFloat(filtrosAvancados.valorMax);
        resultado = resultado.filter((carga) => carga.valorTotal <= valorMax);
      }

      if (filtrosAvancados.tipoCarga !== "todos") {
        resultado = resultado.filter(
          (carga) => carga.tipoCarga === filtrosAvancados.tipoCarga
        );
      }

      if (filtrosAvancados.naturezaCarga !== "todos") {
        resultado = resultado.filter(
          (carga) => carga.naturezaCarga === filtrosAvancados.naturezaCarga
        );
      }

      // Filtro por data
      if (filtrosAvancados.dataInicio) {
        const dataInicio = new Date(filtrosAvancados.dataInicio);
        resultado = resultado.filter(
          (carga) => new Date(carga.dataCriacao) >= dataInicio
        );
      }

      if (filtrosAvancados.dataFim) {
        const dataFim = new Date(filtrosAvancados.dataFim);
        dataFim.setHours(23, 59, 59, 999);
        resultado = resultado.filter(
          (carga) => new Date(carga.dataCriacao) <= dataFim
        );
      }

      // Separar as cargas filtradas por transportadora (se aplicável)
      const cargasComTransportadora = nomeTransportadora
        ? filtrarPorTransportadora(resultado)
        : [];

      setCargasFiltradasPorTransportadora(cargasComTransportadora);
      setFilteredCargas(resultado);
      calcularMetricas(resultado);

      console.log(`Total final: ${resultado.length} cargas após todos filtros`);
    },
    [transportadoraNome, transportadoraIdLogado, filtrarPorTransportadora]
  );

  // Função para calcular métricas
  const calcularMetricas = (cargasList: Carga[]) => {
    const totalCargas = cargasList.length;
    const cargasEntregues = cargasList.filter(
      (c) => c.status === "entregue"
    ).length;
    const cargasTransito = cargasList.filter(
      (c) => c.status === "em_transito"
    ).length;
    const cargasAtrasadas = cargasList.filter((c) => {
      if (!c.dataEntregaPrevista) return false;
      const dataPrevista = new Date(c.dataEntregaPrevista);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      return (
        dataPrevista < hoje &&
        c.status !== "entregue" &&
        c.status !== "encerrada"
      );
    }).length;

    const pesoTotal = cargasList.reduce(
      (acc, carga) => acc + (carga.pesoBruto || 0),
      0
    );
    const valorTotalFretes = cargasList.reduce(
      (acc, carga) => acc + (carga.valorTotal || 0),
      0
    );

    setMetrics({
      totalCargas,
      cargasEntregues,
      cargasTransito,
      cargasAtrasadas,
      pesoTotal,
      valorTotalFretes,
    });
  };

  // Função para atualizar filtros
  const atualizarFiltros = (novosFiltros: Partial<typeof filtrosAtivos>) => {
    setFiltrosAtivos((prev) => {
      const filtrosAtualizados = { ...prev, ...novosFiltros };
      aplicarTodosFiltros(cargas, filtrosAtualizados);
      return filtrosAtualizados;
    });
  };

  // Função para limpar filtros
  const limparFiltros = () => {
    const filtrosLimpos = {
      searchTerm: "",
      statusFilter: "todos",
      tipoFilter: "todos",
      filtrosAvancados: {
        prioridade: "todos",
        valorMin: "",
        valorMax: "",
        dataInicio: "",
        dataFim: "",
        tipoCarga: "todos",
        naturezaCarga: "todos",
        motoristaEmpresa: false,
      },
    };

    setFiltrosAtivos(filtrosLimpos);
    aplicarTodosFiltros(cargas, filtrosLimpos);
  };

  // Função para criar nova carga
  const criarNovaCarga = async (cargaData: Partial<Carga>) => {
    try {
      const nomeTransportadora = transportadoraNome();
      
      const dadosAPI = {
        ...cargaData,
        origem: cargaData.origem
          ? {
              cidade: cargaData.origem.cidade,
              local: cargaData.origem.local,
              pais: "Moçambique",
            }
          : undefined,
        destino: cargaData.destino
          ? {
              cidade: cargaData.destino.cidade,
              local: cargaData.destino.local,
              pais: "Moçambique",
            }
          : undefined,
        nomeEmpresa: nomeTransportadora || "Mega Centro e Logistica",
      };

      console.log("Criando carga para transportadora:", nomeTransportadora);

      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/createCarga",
        dadosAPI
      );
      if (response.data.returnCode === 201) {
        await fetchCargas();
        return { success: true, data: response.data.data };
      }
      return { success: false, error: response.data.returnMsg };
    } catch (error: any) {
      console.error("Erro ao criar carga:", error);
      return {
        success: false,
        error: error.response?.data?.returnMsg || "Erro ao criar carga",
      };
    }
  };

  // Função para atualizar status da carga COM CAMPO TRANSPORTADORA
  const atualizarStatus = async (
    codigo: string,
    status: StatusCarga,
    transportadoraInfo?: {
      nome?: string;
      id?: string;
    }
  ) => {
    try {
      const nomeTransportadora = transportadoraNome();
      const idTransportadora = transportadoraIdLogado();
      
      const payload: any = {
        codigo,
        status,
        observacao: `Status alterado para ${status}`,
        local: "Sistema",
      };

      // IMPORTANTE: Só enviamos transportadora se o status for "aguardando_coleta"
      // Usar o nome da transportadora do usuário logado
      if (status === "aguardando_coleta" && nomeTransportadora) {
        payload.transportadora = nomeTransportadora;
        payload.observacao = `Carga aceita pela transportadora: ${nomeTransportadora}`;
      }

      console.log("Enviando payload para updateCargaStatus:", payload);

      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/updateCargaStatus",
        payload
      );

      if (response.data.returnCode === 200) {
        // Atualizar localmente
        const updatedCargas = cargas.map((c) => {
          if (c.codigo === codigo) {
            const updatedCarga = {
              ...c,
              status,
              dataAtualizacao: new Date().toISOString(),
            };

            // Atualizar campo transportadora se fornecida
            if (status === "aguardando_coleta" && nomeTransportadora) {
              updatedCarga.transportadora = nomeTransportadora;
            }

            return updatedCarga;
          }
          return c;
        });

        setCargas(updatedCargas);
        aplicarTodosFiltros(updatedCargas, filtrosAtivos);
        return { success: true, data: response.data.data };
      }
      return { success: false, error: response.data.returnMsg };
    } catch (error: any) {
      console.error("Erro ao atualizar status:", error);
      return {
        success: false,
        error: error.response?.data?.returnMsg || "Erro ao atualizar status",
      };
    }
  };

  // Função simplificada para aceitar carga
  const aceitarCarga = async (codigo: string) => {
    const nomeTransportadora = transportadoraNome();
    const idTransportadora = transportadoraIdLogado();
    
    // Usar o nome da transportadora do usuário logado
    const transportadoraInfo = {
      nome: nomeTransportadora,
      id: idTransportadora,
    };

    console.log("Aceitando carga:", {
      codigo,
      transportadora: transportadoraInfo.nome,
      id: transportadoraInfo.id,
    });

    return await atualizarStatus(codigo, "aguardando_coleta", transportadoraInfo);
  };

  // NOVA FUNÇÃO: Atualizar motorista e veículo (separado da aceitação)
  const atualizarMotoristaVeiculo = async (
    codigo: string,
    motoristaData?: {
      id?: number;
      nome: string;
      empresaMotorista?: string;
      empresaMotoristaId?: number;
      cartaConducaoNumero?: string;
      telefone?: string;
      cartaConducaoCategoria?: string;
      validadeCartaConducao?: Date;
      documentos?: any[];
      certificados?: string[];
      avaliacao?: number;
      nacionalidade?: string;
    },
    veiculoData?: {
      id?: number;
      matricula: string;
      modelo?: string;
      ano?: number;
      quilometragemInicial?: number;
      proximaRevisaoKM?: number;
      estadoVeiculoAntes?: string;
      seguroVeiculo?: {
        tipo?: string;
        valorVeiculo?: number;
        apolice?: string;
        dataVencimento?: Date;
      };
    }
  ) => {
    try {
      // Aqui precisaríamos de uma nova rota específica para atualizar motorista e veículo
      // Por enquanto, vamos usar uma abordagem simplificada
      console.log("Atualização de motorista e veículo ainda não implementada para a carga:", codigo);
      console.log("Dados do motorista:", motoristaData);
      console.log("Dados do veículo:", veiculoData);
      
      return { 
        success: false, 
        error: "Funcionalidade de atualização de motorista e veículo ainda não implementada" 
      };
    } catch (error: any) {
      console.error("Erro ao atualizar motorista e veículo:", error);
      return {
        success: false,
        error: error.message || "Erro ao atualizar motorista e veículo",
      };
    }
  };

  const buscarDadosMotorista = async (motoristaId: number) => {
    try {
      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getMotoristaDetail",
        { id: motoristaId }
      );

      if (response.data.returnCode === 200) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar motorista:", error);
      return null;
    }
  };

  // Função para visualizar detalhes da carga
  const visualizarCarga = async (carga: Carga) => {
    try {
      const response = await axios.post(
        "https://desktop-api-4f850b3f9733.herokuapp.com/getCargaDetail",
        {
          codigo: carga.codigo,
        }
      );

      if (response.data.returnCode === 200) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar detalhes da carga:", error);
      return null;
    }
  };

  // Função para exportar dados
  const exportarDados = async (tipo: string) => {
    try {
      const dataToExport = filteredCargas.map((carga) => ({
        Código: carga.codigo,
        Tipo: carga.tipoCarga,
        Descrição: carga.descricao,
        Cliente: carga.cliente,
        Origem: `${carga.origem.cidade} - ${carga.origem.local}`,
        Destino: `${carga.destino.cidade} - ${carga.destino.local}`,
        Status: carga.status,
        Prioridade: carga.prioridade,
        "Peso Bruto (kg)": carga.pesoBruto,
        "Valor Total (MZN)": carga.valorTotal,
        "Data Coleta": carga.dataColeta
          ? new Date(carga.dataColeta).toLocaleDateString("pt-MZ")
          : "",
        "Entrega Prevista": carga.dataEntregaPrevista
          ? new Date(carga.dataEntregaPrevista).toLocaleDateString("pt-MZ")
          : "",
        Motorista: carga.motorista?.nome,
        "Empresa Motorista": carga.motorista?.empresaMotorista,
        "ID Empresa Motorista": carga.motorista?.empresaMotoristaId,
        Transportadora: carga.transportadora || "",
        "Empresa da Carga": carga.nomeEmpresa,
        Veículo: carga.veiculo?.matricula,
        "Criado em": new Date(carga.dataCriacao).toLocaleDateString("pt-MZ"),
      }));

      // Criar CSV
      const headers = Object.keys(dataToExport[0] || {});
      const csvContent = [
        headers.join(","),
        ...dataToExport.map((row) =>
          headers
            .map((header) => {
              const value = row[header as keyof typeof row];
              return value ? `"${value}"` : "";
            })
            .join(",")
        ),
      ].join("\n");

      // Criar blob e download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `cargas_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      alert("Erro ao exportar dados. Por favor, tente novamente.");
    }
  };

  // Carregar dados inicialmente
  useEffect(() => {
    fetchCargas();
  }, [fetchCargas]);

  // Atualizar quando o usuário ou dados mudarem
  useEffect(() => {
    if (cargas.length > 0) {
      const nomeTransportadora = transportadoraNome();
      const idTransportadora = transportadoraIdLogado();
      
      console.log(
        `Recarregando filtros para transportadora: ${nomeTransportadora}, ID: ${idTransportadora}`
      );
      aplicarTodosFiltros(cargas, filtrosAtivos);
    }
  }, [
    user,
    cargas,
    aplicarTodosFiltros,
    filtrosAtivos,
    transportadoraNome,
    transportadoraIdLogado,
  ]);

  return {
    cargas,
    filteredCargas,
    cargasFiltradasPorTransportadora,
    isDataLoading,
    metrics,
    filtrosAtivos,
    fetchCargas,
    atualizarFiltros,
    limparFiltros,
    criarNovaCarga,
    atualizarStatus,
    aceitarCarga,
    atualizarMotoristaVeiculo,
    buscarDadosMotorista,
    visualizarCarga,
    exportarDados,
    isTransportadora: user?.tipo === "transportadora",
    transportadoraNome: transportadoraNome(), // Exportar nome da transportadora
  };
}