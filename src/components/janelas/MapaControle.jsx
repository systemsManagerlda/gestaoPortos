import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

const API_BASE_URL = "https://desktop-api-4f850b3f9733.herokuapp.com";

function MapaControle() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dados, setDados] = useState([]);
  const [detalhes, setDetalhes] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [estatisticas, setEstatisticas] = useState({});
  const [filtros, setFiltros] = useState({
    curPage: 1,
    pageSize: 20,
    dataInicio: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    dataFim: new Date().toISOString().split('T')[0]
  });
  const [relatorioSelecionado, setRelatorioSelecionado] = useState(null);
  const [tabelaFretes, setTabelaFretes] = useState({});
  const [alarmes, setAlarmes] = useState([]);

  // Configuração completa das tabs
  const tabConfigs = {
    dashboard: {
      titulo: 'Dashboard Geral',
      icone: '📊',
      componentes: ['graficos', 'alarmes', 'resumo']
    },
    clientes: {
      titulo: 'Clientes',
      icone: '👥',
      endpoint: '/getClienteList',
      camposDetalhe: [
        { grupo: 'Identificação', campos: [
          { chave: 'codigo', label: 'Código', tipo: 'texto' },
          { chave: 'nome', label: 'Nome', tipo: 'texto' },
          { chave: 'categoria', label: 'Categoria', tipo: 'badge', cores: { 'Gestor': 'purple', 'Cliente': 'blue', 'Motorista': 'green' }},
          { chave: 'tipoPessoa', label: 'Tipo Pessoa', tipo: 'badge' },
          { chave: 'nuit', label: 'NUIT', tipo: 'texto' },
          { chave: 'classificacao', label: 'Classificação', tipo: 'badge', cores: { 'VIP': 'gold', 'A': 'green', 'B': 'blue', 'C': 'orange', 'Novo': 'gray' }},
          { chave: 'segmento', label: 'Segmento', tipo: 'texto' },
          { chave: 'status', label: 'Status', tipo: 'status', cores: { 'ativo': 'green', 'inativo': 'red', 'suspenso': 'yellow', 'potencial': 'blue' }}
        ]},
        { grupo: 'Contatos', campos: [
          { chave: 'contatoPrincipal', label: 'Contato Principal', tipo: 'virtual' },
          { chave: 'contatos', label: 'Lista de Contatos', tipo: 'array' }
        ]},
        { grupo: 'Financeiro', campos: [
          { chave: 'limiteCredito', label: 'Limite Crédito', tipo: 'moeda' },
          { chave: 'creditoDisponivel', label: 'Crédito Disponível', tipo: 'virtual' },
          { chave: 'formaPagamento', label: 'Forma Pagamento', tipo: 'texto' },
          { chave: 'prazoPagamento', label: 'Prazo (dias)', tipo: 'numero' }
        ]},
        { grupo: 'Métricas', campos: [
          { chave: 'metricas.totalViagens', label: 'Total Viagens', tipo: 'numero' },
          { chave: 'metricas.viagensConcluidas', label: 'Viagens Concluídas', tipo: 'numero' },
          { chave: 'metricas.valorTotalFretes', label: 'Valor Total Fretes', tipo: 'moeda' },
          { chave: 'metricas.mediaMensalFretes', label: 'Média Mensal', tipo: 'moeda' },
          { chave: 'chave: metricas.indiceSatisfacao', label: 'Índice Satisfação', tipo: 'estrelas' }
        ]},
        { grupo: 'Histórico', campos: [
          { chave: 'historicoViagens', label: 'Últimas Viagens', tipo: 'tabela', colunas: [
            { titulo: 'Viagem', chave: 'numeroViagem' },
            { titulo: 'Status', chave: 'status' },
            { titulo: 'Origem-Destino', chave: 'origem', formatar: (item) => `${item.origem} → ${item.destino}` },
            { titulo: 'Valor', chave: 'valorFrete', tipo: 'moeda' }
          ]},
          { chave: 'comportamento.pontualidadePagamentos', label: 'Pontualidade', tipo: 'rating', max: 5 }
        ]}
      ]
    },
    transportadoras: {
      titulo: 'Transportadoras',
      icone: '🚚',
      endpoint: '/getTransportadoraList',
      camposDetalhe: [
        { grupo: 'Identificação', campos: [
          { chave: 'transportadoraId', label: 'ID', tipo: 'texto' },
          { chave: 'nomeEmpresa', label: 'Nome', tipo: 'texto' },
          { chave: 'nif', label: 'NIF', tipo: 'texto' },
          { chave: 'email', label: 'Email', tipo: 'email' },
          { chave: 'status', label: 'Status', tipo: 'status', cores: { 'ativa': 'green', 'inativa': 'red', 'suspensa': 'yellow', 'pendente': 'blue' }}
        ]},
        { grupo: 'Capacidade', campos: [
          { chave: 'capacidadeTotal.totalCamioes', label: 'Total Camiões', tipo: 'numero' },
          { chave: 'capacidadeTotal.totalMotoristas', label: 'Total Motoristas', tipo: 'numero' },
          { chave: 'capacidadeTotal.tonelagemMaxima', label: 'Tonelagem Máxima', tipo: 'peso' },
          { chave: 'qualificadaTransito', label: 'Qualif. Trânsito', tipo: 'booleano' },
          { chave: 'servicosPermitidos', label: 'Serviços Permitidos', tipo: 'array' }
        ]},
        { grupo: 'Documentação', campos: [
          { chave: 'documentos.alvara.numero', label: 'Alvará', tipo: 'texto' },
          { chave: 'documentos.registoComercial.numero', label: 'Registo Comercial', tipo: 'texto' },
          { chave: 'documentos.certificadoRegisto.numero', label: 'Certificado', tipo: 'texto' }
        ]},
        { grupo: 'Camiões Associados', tipo: 'relacionado', endpoint: '/getCamioesPorTransportadora', param: 'transportadoraId' }
      ]
    },
    motoristas: {
      titulo: 'Motoristas',
      icone: '👨‍✈️',
      endpoint: '/getMotoristaList',
      camposDetalhe: [
        { grupo: 'Identificação', campos: [
          { chave: 'motoristaId', label: 'ID', tipo: 'texto' },
          { chave: 'nomeCompleto', label: 'Nome', tipo: 'texto' },
          { chave: 'idade', label: 'Idade', tipo: 'virtual' },
          { chave: 'numeroBI', label: 'BI', tipo: 'texto' },
          { chave: 'passaporte.numero', label: 'Passaporte', tipo: 'texto' },
          { chave: 'passaporteValido', label: 'Passaporte Válido', tipo: 'booleano' },
          { chave: 'cartaConducao.numero', label: 'Carta Condução', tipo: 'texto' },
          { chave: 'cartaValida', label: 'Carta Válida', tipo: 'booleano' },
          { chave: 'status', label: 'Status', tipo: 'status', cores: { 'disponivel': 'green', 'em_viagem': 'blue', 'ferias': 'yellow', 'indisponivel': 'red' }}
        ]},
        { grupo: 'Empresa', campos: [
          { chave: 'empresaMotorista', label: 'Transportadora', tipo: 'texto' },
          { chave: 'infoTransportador.qualificadoTransito', label: 'Qualif. Trânsito', tipo: 'booleano' },
          { chave: 'infoTransportador.totalCamioes', label: 'Camiões da Empresa', tipo: 'numero' }
        ]},
        { grupo: 'Avaliação', campos: [
          { chave: 'avaliacaoGeral', label: 'Avaliação Geral', tipo: 'estrelas' },
          { chave: 'avaliacaoDetalhada.seguranca', label: 'Segurança', tipo: 'rating', max: 5 },
          { chave: 'avaliacaoDetalhada.pontualidade', label: 'Pontualidade', tipo: 'rating', max: 5 },
          { chave: 'avaliacaoDetalhada.cumprimentoRota', label: 'Cumprimento Rota', tipo: 'rating', max: 5 },
          { chave: 'totalViagensRealizadas', label: 'Total Viagens', tipo: 'numero' },
          { chave: 'totalKmPercorridos', label: 'KM Percorridos', tipo: 'distancia' }
        ]},
        { grupo: 'Veículos Habilitados', tipo: 'array', campos: [
          { chave: 'tipo', label: 'Tipo' },
          { chave: 'marca', label: 'Marca' },
          { chave: 'matricula', label: 'Matrícula' },
          { chave: 'nivelInspecao.categoria', label: 'Categoria' },
          { chave: 'viabilidade.podeNacional', label: 'Pode Nacional', tipo: 'booleano' }
        ]},
        { grupo: 'Documentos', campos: [
          { chave: 'examesMedicos', label: 'Exames Médicos', tipo: 'array' },
          { chave: 'certificados', label: 'Certificados', tipo: 'array' },
          { chave: 'treinamentos', label: 'Treinamentos', tipo: 'array' }
        ]}
      ]
    },
    camioes: {
      titulo: 'Camiões',
      icone: '🚛',
      endpoint: '/getCamiaoList',
      camposDetalhe: [
        { grupo: 'Identificação', campos: [
          { chave: 'camiaoId', label: 'ID', tipo: 'texto' },
          { chave: 'matricula', label: 'Matrícula', tipo: 'texto' },
          { chave: 'marca', label: 'Marca', tipo: 'texto' },
          { chave: 'modelo', label: 'Modelo', tipo: 'texto' },
          { chave: 'anoFabricacao', label: 'Ano', tipo: 'numero' },
          { chave: 'idade', label: 'Idade', tipo: 'virtual' },
          { chave: 'status', label: 'Status', tipo: 'status', cores: { 'disponivel': 'green', 'em_viagem': 'blue', 'manutencao': 'yellow', 'inativo': 'red' }}
        ]},
        { grupo: 'Especificações', campos: [
          { chave: 'especificacoes.tipo', label: 'Tipo', tipo: 'texto' },
          { chave: 'especificacoes.pesoBruto', label: 'Peso Bruto (PBT)', tipo: 'peso' },
          { chave: 'especificacoes.cargaUtil', label: 'Carga Útil', tipo: 'peso' },
          { chave: 'especificacoes.numEixos', label: 'Número Eixos', tipo: 'numero' },
          { chave: 'especificacoes.volumeUtil', label: 'Volume Útil', tipo: 'volume' }
        ]},
        { grupo: 'GPS', campos: [
          { chave: 'tipoGPS.tipo', label: 'Tipo GPS', tipo: 'badge', cores: { 'normal': 'blue', 'vip': 'purple' }},
          { chave: 'tipoGPS.valorRegistro', label: 'Valor Registro', tipo: 'moeda' },
          { chave: 'tipoGPS.dataExpiracao', label: 'Expiração', tipo: 'data' },
          { chave: 'diasExpiracaoGPS', label: 'Dias Restantes', tipo: 'virtual' },
          { chave: 'gpsVipAtivo', label: 'GPS VIP Ativo', tipo: 'booleano' },
          { chave: 'gpsVip.camera.possui', label: 'Tem Câmera', tipo: 'booleano' }
        ]},
        { grupo: 'Inspeção', campos: [
          { chave: 'nivelInspecao.categoria', label: 'Categoria', tipo: 'badge', cores: { 'A': 'red', 'B': 'orange', 'C': 'green' }},
          { chave: 'nivelInspecao.descricao', label: 'Descrição', tipo: 'texto' },
          { chave: 'nivelInspecao.dataUltimaInspecao', label: 'Última Inspeção', tipo: 'data' },
          { chave: 'nivelInspecao.dataProximaInspecao', label: 'Próxima Inspeção', tipo: 'data' },
          { chave: 'inspecaoValida', label: 'Inspeção Válida', tipo: 'booleano' }
        ]},
        { grupo: 'Viabilidade', campos: [
          { chave: 'viabilidade.podeChante', label: 'Pode Chanté', tipo: 'booleano' },
          { chave: 'viabilidade.podeNacional', label: 'Pode Nacional', tipo: 'booleano' },
          { chave: 'viabilidade.podeTransito', label: 'Pode Trânsito', tipo: 'booleano' },
          { chave: 'viabilidade.motivos', label: 'Motivos', tipo: 'array' }
        ]},
        { grupo: 'Associações', campos: [
          { chave: 'transportadoraId', label: 'Transportadora ID', tipo: 'link', acao: (id) => buscarTransportadora(id) },
          { chave: 'motoristaId', label: 'Motorista ID', tipo: 'link', acao: (id) => buscarMotorista(id) }
        ]},
        { grupo: 'Histórico', campos: [
          { chave: 'historicoUtilizacao.totalKmPercorridos', label: 'KM Percorridos', tipo: 'distancia' },
          { chave: 'historicoUtilizacao.totalViagens', label: 'Total Viagens', tipo: 'numero' },
          { chave: 'historicoUtilizacao.viagensComGPSVip', label: 'Viagens GPS VIP', tipo: 'numero' }
        ]}
      ]
    },
    cargas: {
      titulo: 'Cargas',
      icone: '📦',
      endpoint: '/getCargaList',
      subTabs: ['disponiveis', 'carregadas', 'descarregadas', 'transito'],
      camposDetalhe: [
        { grupo: 'Identificação', campos: [
          { chave: 'codigo', label: 'Código', tipo: 'texto' },
          { chave: 'tipoCarga', label: 'Tipo Carga', tipo: 'badge' },
          { chave: 'naturezaCarga', label: 'Natureza', tipo: 'badge', cores: { 'perigosa': 'red', 'não perigosa': 'green', 'sensível': 'orange', 'fragil': 'yellow' }},
          { chave: 'categoriaSeguro', label: 'Categoria Seguro', tipo: 'texto' },
          { chave: 'descricao', label: 'Descrição', tipo: 'texto' },
          { chave: 'status', label: 'Status', tipo: 'status', cores: {
            'planeada': 'gray', 'aguardando_coleta': 'blue', 'coletada': 'orange',
            'em_transito': 'purple', 'entregue': 'green', 'encerrada': 'black'
          }}
        ]},
        { grupo: 'Especificações', campos: [
          { chave: 'pesoBruto', label: 'Peso Bruto', tipo: 'peso' },
          { chave: 'pesoLiquido', label: 'Peso Líquido', tipo: 'peso' },
          { chave: 'volume', label: 'Volume', tipo: 'volume' },
          { chave: 'valorMercadoria', label: 'Valor Mercadoria', tipo: 'moeda' },
          { chave: 'abrangenciaSeguro', label: 'Abrangência', tipo: 'badge' }
        ]},
        { grupo: 'Rota', campos: [
          { chave: 'origem.local', label: 'Origem', tipo: 'texto' },
          { chave: 'destino.local', label: 'Destino', tipo: 'texto' },
          { chave: 'distanciaKm', label: 'Distância', tipo: 'distancia' },
          { chave: 'tipoPercurso', label: 'Tipo Percurso', tipo: 'badge' },
          { chave: 'destinoFrete', label: 'Destino Frete', tipo: 'texto' },
          { chave: 'pontoAtual', label: 'Localização Atual', tipo: 'mapa' }
        ]},
        { grupo: 'Financeiro', campos: [
          { chave: 'valorFrete', label: 'Valor Frete', tipo: 'moeda' },
          { chave: 'freteIda', label: 'Frete Ida', tipo: 'moeda' },
          { chave: 'freteVolta', label: 'Frete Volta', tipo: 'moeda' },
          { chave: 'comissaoCalculada', label: 'Comissão', tipo: 'moeda' },
          { chave: 'valorTotal', label: 'Valor Total', tipo: 'moeda' },
          { chave: 'margemLucro', label: 'Margem Lucro', tipo: 'moeda' }
        ]},
        { grupo: 'Seguro', campos: [
          { chave: 'seguro.valorSegurado', label: 'Valor Segurado', tipo: 'moeda' },
          { chave: 'seguro.premioFinal', label: 'Prêmio', tipo: 'moeda' },
          { chave: 'seguro.taxaPercentual', label: 'Taxa %', tipo: 'percentual' },
          { chave: 'seguro.statusSeguro', label: 'Status Seguro', tipo: 'status' }
        ]},
        { grupo: 'Equipe', campos: [
          { chave: 'motorista.nome', label: 'Motorista', tipo: 'texto' },
          { chave: 'motorista.telefone', label: 'Telefone Motorista', tipo: 'telefone' },
          { chave: 'veiculo.matricula', label: 'Matrícula', tipo: 'texto' },
          { chave: 'veiculo.modelo', label: 'Modelo Veículo', tipo: 'texto' },
          { chave: 'cliente', label: 'Cliente', tipo: 'texto' }
        ]},
        { grupo: 'Datas', campos: [
          { chave: 'dataColeta', label: 'Data Coleta', tipo: 'data' },
          { chave: 'dataEntregaPrevista', label: 'Entrega Prevista', tipo: 'data' },
          { chave: 'dataEntregaReal', label: 'Entrega Real', tipo: 'data' },
          { chave: 'tempoTotalHoras', label: 'Tempo Total', tipo: 'tempo' }
        ]},
        { grupo: 'GPS e Sensores', campos: [
          { chave: 'gps.bateriaPercentual', label: 'Bateria GPS', tipo: 'bateria' },
          { chave: 'gps.ultimaComunicacao', label: 'Última Comunicação', tipo: 'data' },
          { chave: 'sensoresIOT.temperatura', label: 'Temperatura', tipo: 'temperatura' },
          { chave: 'sensoresIOT.umidade', label: 'Umidade', tipo: 'percentual' },
          { chave: 'rotaRealizada', label: 'Trajeto Realizado', tipo: 'rota' }
        ]},
        { grupo: 'Checkpoints', tipo: 'array', campos: [
          { chave: 'status', label: 'Status' },
          { chave: 'data', label: 'Data', tipo: 'data' },
          { chave: 'local', label: 'Local' }
        ]},
        { grupo: 'Ocorrências', tipo: 'array', campos: [
          { chave: 'tipo', label: 'Tipo' },
          { chave: 'descricao', label: 'Descrição' },
          { chave: 'severidade', label: 'Severidade' },
          { chave: 'dataRegistro', label: 'Data', tipo: 'data' }
        ]}
      ]
    },
    despachantes: {
      titulo: 'Despachantes',
      icone: '👨‍💼',
      endpoint: '/getDespachanteList',
      subTabs: ['todos', 'ativos', 'disponiveis', 'documentacao_expirando'],
      camposDetalhe: [
        { grupo: 'Identificação', campos: [
          { chave: 'codigoDespachante', label: 'Código', tipo: 'texto' },
          { chave: 'matriculaAlfandega', label: 'Matrícula Alfândega', tipo: 'texto' },
          { chave: 'dadosPessoais.nomeCompleto', label: 'Nome Completo', tipo: 'texto' },
          { chave: 'nomeFormatado', label: 'Nome de Apresentação', tipo: 'texto' },
          { chave: 'dadosPessoais.numeroIdentificacao', label: 'Nº Identificação', tipo: 'texto' },
          { chave: 'dadosPessoais.tipoIdentificacao', label: 'Tipo Identificação', tipo: 'badge' },
          { chave: 'tipoUsuario', label: 'Tipo Usuário', tipo: 'badge', cores: { 
            'despachante': 'blue', 
            'analista': 'green', 
            'supervisor': 'orange', 
            'gerente': 'purple', 
            'admin': 'red',
            'auditor': 'yellow',
            'consultor': 'teal'
          }},
          { chave: 'status.statusAtual', label: 'Status', tipo: 'status', cores: {
            'ativo': 'green',
            'inativo': 'red',
            'ferias': 'yellow',
            'licenca': 'blue',
            'afastado': 'orange',
            'treinamento': 'purple',
            'desligado': 'gray',
            'suspenso': 'red'
          }}
        ]},
        { grupo: 'Informações Pessoais', campos: [
          { chave: 'idade', label: 'Idade', tipo: 'numero' },
          { chave: 'dadosPessoais.genero', label: 'Gênero', tipo: 'badge' },
          { chave: 'dadosPessoais.dataNascimento', label: 'Data Nascimento', tipo: 'data' },
          { chave: 'dadosPessoais.estadoCivil', label: 'Estado Civil', tipo: 'badge' },
          { chave: 'dadosPessoais.nacionalidade', label: 'Nacionalidade', tipo: 'texto' },
          { chave: 'dadosPessoais.naturalidade.cidade', label: 'Cidade Natural', tipo: 'texto' },
          { chave: 'dadosPessoais.naturalidade.provincia', label: 'Província Natural', tipo: 'texto' }
        ]},
        { grupo: 'Contatos', campos: [
          { chave: 'contatos.emailPrincipal', label: 'Email Principal', tipo: 'email' },
          { chave: 'contatos.emailAlternativo', label: 'Email Alternativo', tipo: 'email' },
          { chave: 'contatos.telefonePrincipal', label: 'Telefone Principal', tipo: 'telefone' },
          { chave: 'contatos.telefoneAlternativo', label: 'Telefone Alternativo', tipo: 'telefone' },
          { chave: 'contatos.whatsapp.numero', label: 'WhatsApp', tipo: 'telefone' },
          { chave: 'contatos.whatsapp.disponivel', label: 'WhatsApp Ativo', tipo: 'booleano' }
        ]},
        { grupo: 'Endereços', campos: [
          { chave: 'enderecos.residencial.rua', label: 'Rua (Residencial)', tipo: 'texto' },
          { chave: 'enderecos.residencial.bairro', label: 'Bairro (Residencial)', tipo: 'texto' },
          { chave: 'enderecos.residencial.cidade', label: 'Cidade (Residencial)', tipo: 'texto' },
          { chave: 'enderecos.residencial.provincia', label: 'Província (Residencial)', tipo: 'texto' },
          { chave: 'enderecos.comercial.rua', label: 'Rua (Comercial)', tipo: 'texto' },
          { chave: 'enderecos.comercial.bairro', label: 'Bairro (Comercial)', tipo: 'texto' },
          { chave: 'enderecos.comercial.cidade', label: 'Cidade (Comercial)', tipo: 'texto' }
        ]},
        { grupo: 'Carreira', campos: [
          { chave: 'carreira.dataAdmissao', label: 'Data Admissão', tipo: 'data' },
          { chave: 'tempoEmpresaMeses', label: 'Tempo na Empresa (meses)', tipo: 'numero' },
          { chave: 'carreira.cargoAtual', label: 'Cargo Atual', tipo: 'texto' },
          { chave: 'carreira.departamento', label: 'Departamento', tipo: 'texto' },
          { chave: 'carreira.anosExperiencia', label: 'Anos Experiência', tipo: 'numero' },
          { chave: 'carreira.tipoContrato', label: 'Tipo Contrato', tipo: 'badge' },
          { chave: 'carreira.regimeTrabalho', label: 'Regime Trabalho', tipo: 'badge' },
          { chave: 'carreira.supervisor.nome', label: 'Supervisor', tipo: 'texto' }
        ]},
        { grupo: 'Qualificação', campos: [
          { chave: 'qualificacao.nivelAcademico', label: 'Nível Acadêmico', tipo: 'badge' },
          { chave: 'qualificacao.cursoFormacao', label: 'Curso Formação', tipo: 'texto' },
          { chave: 'qualificacao.instituicaoFormacao', label: 'Instituição', tipo: 'texto' },
          { chave: 'qualificacao.anoConclusao', label: 'Ano Conclusão', tipo: 'numero' },
          { chave: 'qualificacao.especializacoes', label: 'Especializações', tipo: 'array' },
          { chave: 'qualificacao.idiomas', label: 'Idiomas', tipo: 'array' }
        ]},
        { grupo: 'Desempenho', campos: [
          { chave: 'desempenho.processosAtribuidos.total', label: 'Total Processos', tipo: 'numero' },
          { chave: 'desempenho.processosAtribuidos.ativos', label: 'Processos Ativos', tipo: 'numero' },
          { chave: 'desempenho.processosAtribuidos.concluidos', label: 'Processos Concluídos', tipo: 'numero' },
          { chave: 'desempenho.taxaSucesso', label: 'Taxa Sucesso (%)', tipo: 'percentual' },
          { chave: 'desempenho.avaliacaoMedia', label: 'Avaliação Média', tipo: 'estrelas' },
          { chave: 'desempenho.tempoMedioProcesso', label: 'Tempo Médio Processo (dias)', tipo: 'numero' },
          { chave: 'desempenho.pontualidade', label: 'Pontualidade (%)', tipo: 'percentual' },
          { chave: 'cargaTrabalhoAtual', label: 'Carga Trabalho', tipo: 'badge', cores: { 
            'baixa': 'green', 
            'normal': 'blue', 
            'moderada': 'orange', 
            'alta': 'red' 
          }}
        ]},
        { grupo: 'Áreas de Atuação', campos: [
          { chave: 'areasAtuacao.tiposProcesso', label: 'Tipos de Processo', tipo: 'array' },
          { chave: 'areasAtuacao.mercadoriasEspecializadas', label: 'Mercadorias Especializadas', tipo: 'array' },
          { chave: 'areasAtuacao.portosAtuacao', label: 'Portos de Atuação', tipo: 'array' },
          { chave: 'areasAtuacao.alfandegasAtuacao', label: 'Alfândegas de Atuação', tipo: 'array' }
        ]},
        { grupo: 'Documentação', campos: [
          { chave: 'documentacao.registroProfissional.numero', label: 'Registro Profissional', tipo: 'texto' },
          { chave: 'documentacao.registroProfissional.dataValidade', label: 'Validade Registro', tipo: 'data' },
          { chave: 'documentacao.autorizacaoAlfandega.numero', label: 'Autorização Alfândega', tipo: 'texto' },
          { chave: 'documentacao.autorizacaoAlfandega.dataValidade', label: 'Validade Autorização', tipo: 'data' },
          { chave: 'diasAteExpiracaoRegistro', label: 'Dias até Expirar', tipo: 'virtual' },
          { chave: 'documentacao.documentacaoCompleta', label: 'Documentação Completa', tipo: 'booleano' }
        ]},
        { grupo: 'Status e Disponibilidade', campos: [
          { chave: 'estaAtivo', label: 'Está Ativo', tipo: 'booleano' },
          { chave: 'status.disponivel', label: 'Disponível', tipo: 'booleano' },
          { chave: 'status.online', label: 'Online', tipo: 'booleano' },
          { chave: 'tempoOnlineMinutos', label: 'Tempo Online (minutos)', tipo: 'numero' },
          { chave: 'status.ultimoCheckin', label: 'Último Check-in', tipo: 'data' },
          { chave: 'status.dispositivoAtual.tipo', label: 'Dispositivo Atual', tipo: 'badge' }
        ]},
        { grupo: 'Remuneração', campos: [
          { chave: 'remuneracao.salarioBase', label: 'Salário Base', tipo: 'moeda' },
          { chave: 'remuneracao.tipoRemuneracao', label: 'Tipo Remuneração', tipo: 'badge' },
          { chave: 'remuneracao.comissaoPercentual', label: 'Comissão (%)', tipo: 'percentual' },
          { chave: 'remuneracao.beneficios', label: 'Benefícios', tipo: 'array' }
        ]},
        { grupo: 'Clientes Atendidos', tipo: 'array', campos: [
          { chave: 'clienteId', label: 'ID Cliente' },
          { chave: 'nomeCliente', label: 'Nome Cliente' },
          { chave: 'statusAtendimento', label: 'Status Atendimento', tipo: 'badge' },
          { chave: 'processosConcluidos', label: 'Processos Concluídos', tipo: 'numero' },
          { chave: 'avaliacaoCliente.nota', label: 'Avaliação', tipo: 'estrelas' }
        ]},
        { grupo: 'Treinamentos', tipo: 'array', campos: [
          { chave: 'titulo', label: 'Título' },
          { chave: 'tipo', label: 'Tipo', tipo: 'badge' },
          { chave: 'dataRealizacao', label: 'Data Realização', tipo: 'data' },
          { chave: 'dataValidade', label: 'Data Validade', tipo: 'data' },
          { chave: 'status', label: 'Status', tipo: 'badge' },
          { chave: 'nota', label: 'Nota', tipo: 'numero' }
        ]},
        { grupo: 'Permissões', campos: [
          { chave: 'permissoes.nivelAcesso', label: 'Nível Acesso', tipo: 'numero' },
          { chave: 'permissoes.processos.criar', label: 'Criar Processos', tipo: 'booleano' },
          { chave: 'permissoes.processos.editar', label: 'Editar Processos', tipo: 'booleano' },
          { chave: 'permissoes.processos.aprovar', label: 'Aprovar Processos', tipo: 'booleano' },
          { chave: 'permissoes.relatorios.acessar', label: 'Acessar Relatórios', tipo: 'booleano' }
        ]}
      ]
    },
    fretes: {
      titulo: 'Tabelas de Fretes',
      icone: '💰',
      tipo: 'tabelaFretes'
    },
    relatorios: {
      titulo: 'Relatórios',
      icone: '📄',
      tipo: 'relatorios'
    }
  };

  // Efeito para carregar dados iniciais
  useEffect(() => {
    if (activeTab === 'dashboard') {
      carregarDashboard();
      buscarAlarmes();
    } else if (activeTab === 'fretes') {
      carregarTabelasFretes();
    } else if (tabConfigs[activeTab]?.endpoint) {
      buscarDados();
    }
  }, [activeTab, filtros.curPage, filtros.dataInicio, filtros.dataFim]);

  // Funções de busca
  const buscarDados = async () => {
    setCarregando(true);
    try {
      const config = tabConfigs[activeTab];
      let payload = { ...filtros };
      
      // Aplicar filtros específicos para sub-tabs
      if (activeTab === 'cargas') {
        if (relatorioSelecionado === 'disponiveis') payload.status = 'planeada';
        else if (relatorioSelecionado === 'carregadas') payload.status = 'coletada';
        else if (relatorioSelecionado === 'descarregadas') payload.status = 'entregue';
        else if (relatorioSelecionado === 'transito') payload.status = 'em_transito';
      } else if (activeTab === 'despachantes') {
        if (relatorioSelecionado === 'ativos') payload.statusAtual = 'ativo';
        else if (relatorioSelecionado === 'disponiveis') {
          payload.statusAtual = 'ativo';
          payload.disponivel = true;
          payload.online = true;
        } else if (relatorioSelecionado === 'documentacao_expirando') {
          // Esta lógica seria implementada no backend
        }
      }
      
      const response = await axios.post(`${API_BASE_URL}${config.endpoint}`, payload);
      
      if (response.data.returnCode === 200) {
        setDados(response.data.data.list || []);
        
        // Buscar estatísticas se disponível
        if (activeTab === 'cargas') {
          buscarEstatisticasCargas();
        } else if (activeTab === 'despachantes') {
          buscarEstatisticasDespachantes();
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const carregarDashboard = async () => {
    try {
      // Carregar múltiplas estatísticas simultaneamente
      const [cargasRes, clientesRes, transportadorasRes, motoristasRes, despachantesRes] = await Promise.all([
        axios.post(`${API_BASE_URL}/getCargaStats`, { dataInicio: filtros.dataInicio, dataFim: filtros.dataFim }),
        axios.post(`${API_BASE_URL}/getClienteList`, { curPage: 1, pageSize: 100 }),
        axios.post(`${API_BASE_URL}/getTransportadoraList`, { curPage: 1, pageSize: 100 }),
        axios.post(`${API_BASE_URL}/getMotoristaStats`),
        axios.post(`${API_BASE_URL}/getDespachanteStats`)
      ]);

      setEstatisticas({
        cargas: cargasRes.data.returnCode === 200 ? cargasRes.data.data : {},
        clientes: clientesRes.data.returnCode === 200 ? clientesRes.data.data : {},
        transportadoras: transportadorasRes.data.returnCode === 200 ? transportadorasRes.data.data : {},
        motoristas: motoristasRes.data.returnCode === 200 ? motoristasRes.data.data : {},
        despachantes: despachantesRes.data.returnCode === 200 ? despachantesRes.data.data : {}
      });
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    }
  };

  const buscarEstatisticasCargas = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getCargaStats`, {
        dataInicio: filtros.dataInicio,
        dataFim: filtros.dataFim
      });
      if (response.data.returnCode === 200) {
        setEstatisticas(prev => ({ ...prev, cargas: response.data.data }));
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const buscarEstatisticasDespachantes = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getDespachanteStats`, {
        dataInicio: filtros.dataInicio,
        dataFim: filtros.dataFim
      });
      if (response.data.returnCode === 200) {
        setEstatisticas(prev => ({ ...prev, despachantes: response.data.data }));
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas despachantes:', error);
    }
  };

  const carregarTabelasFretes = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getTabelasFretes`);
      if (response.data.returnCode === 200) {
        setTabelaFretes(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao carregar tabelas de fretes:', error);
    }
  };

  const buscarAlarmes = async () => {
    try {
      // Buscar documentos vencidos
      const documentosRes = await axios.post(`${API_BASE_URL}/getDocumentosVencidos`, {
        curPage: 1,
        pageSize: 10
      });
      
      // Buscar GPS próximos a expirar
      const gpsRes = await axios.post(`${API_BASE_URL}/getCamioesComGPSExpirado`, {
        diasParaExpiracao: 30
      });
      
      // Buscar despachantes com documentação expirando
      const despachantesRes = await axios.post(`${API_BASE_URL}/getDespachantesDocumentacaoExpirando`, {
        dias: 30
      });
      
      const alarmesList = [];
      
      if (documentosRes.data.returnCode === 200) {
        documentosRes.data.data.list?.forEach(item => {
          alarmesList.push({
            tipo: 'documento',
            titulo: 'Documento Vencido',
            descricao: `${item.nomeCompleto} tem documentos vencidos`,
            severidade: 'alta',
            data: new Date()
          });
        });
      }
      
      if (gpsRes.data.returnCode === 200) {
        gpsRes.data.data.camioes?.forEach(camiao => {
          alarmesList.push({
            tipo: 'gps',
            titulo: 'GPS Próximo de Expirar',
            descricao: `Camião ${camiao.matricula} tem GPS expirando em ${camiao.diasParaExpiracao} dias`,
            severidade: camiao.diasParaExpiracao < 7 ? 'alta' : 'media',
            data: new Date()
          });
        });
      }
      
      if (despachantesRes.data.returnCode === 200) {
        despachantesRes.data.data.despachantes?.forEach(despachante => {
          const diasExpirando = despachante.calculos?.diasProximoExpirar || 30;
          alarmesList.push({
            tipo: 'despachante',
            titulo: 'Documentação Despachante Expirando',
            descricao: `Despachante ${despachante.dadosPessoais?.nomeCompleto} tem documentação expirando em ${diasExpirando} dias`,
            severidade: diasExpirando < 15 ? 'alta' : diasExpirando < 30 ? 'media' : 'baixa',
            data: new Date()
          });
        });
      }
      
      setAlarmes(alarmesList);
    } catch (error) {
      console.error('Erro ao buscar alarmes:', error);
    }
  };

  const buscarDetalhes = async (id, tipo = null) => {
    setCarregando(true);
    try {
      let endpoint, payload;
      const config = tabConfigs[tipo || activeTab];
      
      switch (tipo || activeTab) {
        case 'clientes':
          endpoint = '/getClienteList';
          payload = { codigo: id };
          break;
        case 'transportadoras':
          endpoint = '/getTransportadoraDetail';
          payload = { transportadoraId: id };
          break;
        case 'motoristas':
          endpoint = '/getMotoristaDetail';
          payload = { motoristaId: id };
          break;
        case 'camioes':
          endpoint = '/getCamiaoDetail';
          payload = { camiaoId: id };
          break;
        case 'cargas':
          endpoint = '/getCargaDetail';
          payload = { codigo: id };
          break;
        case 'despachantes':
          endpoint = '/getDespachanteDetail';
          payload = { codigoDespachante: id };
          break;
        default:
          return;
      }
      
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload);
      if (response.data.returnCode === 200) {
        setDetalhes(response.data.data);
        
        // Buscar dados relacionados se necessário
        if (tipo === 'transportadoras' && config.camposDetalhe?.some(c => c.tipo === 'relacionado')) {
          const relacionado = config.camposDetalhe.find(c => c.tipo === 'relacionado');
          const relacionadoRes = await axios.post(
            `${API_BASE_URL}${relacionado.endpoint}`,
            { [relacionado.param]: id }
          );
          if (relacionadoRes.data.returnCode === 200) {
            setDetalhes(prev => ({
              ...prev,
              [relacionado.grupo.toLowerCase()]: relacionadoRes.data.data
            }));
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Funções auxiliares
  const formatarValor = (valor, tipo, config = {}) => {
    if (valor === undefined || valor === null || valor === '') return '-';
    
    switch (tipo) {
      case 'moeda':
        const moeda = config.moeda || 'MZN';
        return new Intl.NumberFormat('pt-MZ', {
          style: 'currency',
          currency: moeda
        }).format(valor);
      
      case 'numero':
        return new Intl.NumberFormat('pt-MZ').format(valor);
      
      case 'percentual':
        return `${parseFloat(valor).toFixed(1)}%`;
      
      case 'peso':
        return `${new Intl.NumberFormat('pt-MZ').format(valor)} kg`;
      
      case 'distancia':
        return `${new Intl.NumberFormat('pt-MZ').format(valor)} km`;
      
      case 'volume':
        return `${new Intl.NumberFormat('pt-MZ').format(valor)} m³`;
      
      case 'tempo':
        const horas = Math.floor(valor);
        const minutos = Math.round((valor - horas) * 60);
        return `${horas}h ${minutos}m`;
      
      case 'data':
        return new Date(valor).toLocaleDateString('pt-MZ', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      
      case 'bateria':
        const porcentagem = parseInt(valor);
        let cor = 'red';
        if (porcentagem > 50) cor = 'green';
        else if (porcentagem > 20) cor = 'orange';
        return (
          <div className="flex items-center">
            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
              <div 
                className={`h-2 rounded-full ${cor === 'green' ? 'bg-green-500' : cor === 'orange' ? 'bg-orange-500' : 'bg-red-500'}`}
                style={{ width: `${porcentagem}%` }}
              ></div>
            </div>
            <span>{porcentagem}%</span>
          </div>
        );
      
      case 'temperatura':
        return `${valor}°C`;
      
      case 'telefone':
        return <a href={`tel:${valor}`} className="text-blue-600 hover:underline">{valor}</a>;
      
      case 'email':
        return <a href={`mailto:${valor}`} className="text-blue-600 hover:underline">{valor}</a>;
      
      case 'badge':
        const corBadge = config.cores?.[valor] || 'gray';
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${corBadge}-100 text-${corBadge}-800`}>
            {valor}
          </span>
        );
      
      case 'status':
        const corStatus = config.cores?.[valor] || 'gray';
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${corStatus}-100 text-${corStatus}-800`}>
            {valor}
          </span>
        );
      
      case 'booleano':
        return valor ? (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Sim</span>
        ) : (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Não</span>
        );
      
      case 'estrelas':
        const estrelas = Math.round(valor);
        return (
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < estrelas ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            ))}
          </div>
        );
      
      case 'rating':
        return (
          <div className="flex items-center">
            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
              <div 
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${(valor / config.max) * 100}%` }}
              ></div>
            </div>
            <span>{valor}/{config.max}</span>
          </div>
        );
      
      case 'virtual':
        // Campos virtuais já calculados no backend
        return String(valor);
      
      default:
        return String(valor);
    }
  };

  const obterValorCampo = (item, caminho) => {
    const partes = caminho.split('.');
    let valor = item;
    
    for (const parte of partes) {
      if (valor && typeof valor === 'object' && parte in valor) {
        valor = valor[parte];
      } else {
        return null;
      }
    }
    
    return valor;
  };

  // Componentes de renderização
  const renderizarDashboard = () => {
    const stats = estatisticas;
    
    return (
      <div className="space-y-6">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-gray-700">Cargas</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.cargas?.totalCargas || 0}
            </p>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Em trânsito: {stats.cargas?.cargasTransito || 0}</span>
              <span>Entregues: {stats.cargas?.cargasEntregues || 0}</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-700">Faturamento</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {formatarValor(stats.cargas?.valorTotalFretes || 0, 'moeda')}
            </p>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Comissões: {formatarValor(stats.cargas?.comissaoTotal || 0, 'moeda')}</span>
              <span>Margem: {formatarValor(stats.cargas?.margemLucroTotal || 0, 'moeda')}</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-gray-700">Clientes</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.clientes?.totalCount || 0}
            </p>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Ativos: {stats.clientes?.list?.filter(c => c.status === 'ativo').length || 0}</span>
              <span>VIP: {stats.clientes?.list?.filter(c => c.classificacao === 'VIP').length || 0}</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-gray-700">Despachantes</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {stats.despachantes?.geral?.total || 0}
            </p>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Ativos: {stats.despachantes?.geral?.ativos || 0}</span>
              <span>Online: {stats.despachantes?.geral?.online || 0}</span>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Status das Cargas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Planejadas', value: stats.cargas?.totalCargas - (stats.cargas?.cargasEntregues || 0) - (stats.cargas?.cargasTransito || 0) },
                    { name: 'Em Trânsito', value: stats.cargas?.cargasTransito || 0 },
                    { name: 'Entregues', value: stats.cargas?.cargasEntregues || 0 }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#0088FE" />
                  <Cell fill="#00C49F" />
                  <Cell fill="#FFBB28" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Despachantes por Tipo</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.despachantes?.porTipo || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Quantidade" />
                <Bar dataKey="mediaAvaliacao" fill="#82ca9d" name="Avaliação Média" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alarmes */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Alertas e Notificações</h3>
          <div className="space-y-3">
            {alarmes.slice(0, 5).map((alarme, idx) => (
              <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                alarme.severidade === 'alta' ? 'border-red-500 bg-red-50' :
                alarme.severidade === 'media' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{alarme.titulo}</h4>
                    <p className="text-sm text-gray-600">{alarme.descricao}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatarValor(alarme.data, 'data')}
                  </span>
                </div>
              </div>
            ))}
            {alarmes.length === 0 && (
              <p className="text-center text-gray-500 py-4">Nenhum alerta no momento</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderizarTabelaFretes = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(tabelaFretes).map(([tipo, tabela]) => (
            <div key={tipo} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">{tipo}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Destino</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Distância</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Frete Ida</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Frete Volta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(tabela).map(([destino, dados]) => (
                      <tr key={destino}>
                        <td className="px-4 py-2">{destino}</td>
                        <td className="px-4 py-2">{dados.distancia} km</td>
                        <td className="px-4 py-2">{formatarValor(dados.freteIda, tipo === 'Beira-Interland' ? 'moeda' : 'moeda', { moeda: tipo === 'Beira-Interland' ? 'USD' : 'MZN' })}</td>
                        <td className="px-4 py-2">{formatarValor(dados.freteVolta, tipo === 'Beira-Interland' ? 'moeda' : 'moeda', { moeda: tipo === 'Beira-Interland' ? 'USD' : 'MZN' })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderizarDetalhes = () => {
    if (!detalhes) return null;
    
    const config = tabConfigs[activeTab];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">Detalhes</h2>
            <button
              onClick={() => setDetalhes(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            {config.camposDetalhe?.map((grupo, idx) => (
              <div key={idx} className="mb-8 last:mb-0">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">{grupo.grupo}</h3>
                
                {grupo.tipo === 'array' ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          {grupo.campos.map((campo, i) => (
                            <th key={i} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              {campo.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(detalhes[grupo.grupo.toLowerCase()] || []).map((item, i) => (
                          <tr key={i}>
                            {grupo.campos.map((campo, j) => (
                              <td key={j} className="px-4 py-2">
                                {formatarValor(item[campo.chave], campo.tipo, campo)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {grupo.campos.map((campo, i) => {
                      const valor = campo.chave.includes('.') 
                        ? obterValorCampo(detalhes, campo.chave)
                        : detalhes[campo.chave];
                      
                      return (
                        <div key={i} className="border rounded-lg p-4">
                          <div className="text-sm text-gray-500 mb-1">{campo.label}</div>
                          <div className="font-medium">
                            {formatarValor(valor, campo.tipo, campo)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-6 border-t flex justify-end space-x-4">
            <button
              onClick={() => setDetalhes(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Fechar
            </button>
            {activeTab === 'cargas' && (
              <button
                onClick={() => window.open(`/carga/${detalhes.codigo}/tracking`, '_blank')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ver Tracking
              </button>
            )}
            {activeTab === 'despachantes' && (
              <button
                onClick={() => window.open(`/despachante/${detalhes.codigoDespachante}/relatorio`, '_blank')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Gerar Relatório
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderizarConteudo = () => {
    const config = tabConfigs[activeTab];
    
    if (activeTab === 'dashboard') return renderizarDashboard();
    if (activeTab === 'fretes') return renderizarTabelaFretes();
    
    return (
      <div className="space-y-6">
        {/* Filtros */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
              <input
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value, curPage: 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">até</label>
              <input
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value, curPage: 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Itens por página</label>
              <select
                value={filtros.pageSize}
                onChange={(e) => setFiltros({ ...filtros, pageSize: parseInt(e.target.value), curPage: 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={buscarDados}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
          
          {/* Sub-tabs para cargas e despachantes */}
          {(activeTab === 'cargas' || activeTab === 'despachantes') && (
            <div className="mt-4 flex space-x-2">
              {config.subTabs.map((subTab) => (
                <button
                  key={subTab}
                  onClick={() => {
                    setRelatorioSelecionado(subTab);
                    buscarDados();
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    relatorioSelecionado === subTab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subTab === 'disponiveis' && 'Disponíveis'}
                  {subTab === 'carregadas' && 'Carregadas'}
                  {subTab === 'descarregadas' && 'Descarregadas'}
                  {subTab === 'transito' && 'Em Trânsito'}
                  {subTab === 'todos' && 'Todos'}
                  {subTab === 'ativos' && 'Ativos'}
                  {subTab === 'documentacao_expirando' && 'Doc. Expirando'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tabela de Dados */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {carregando ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Carregando dados...</p>
            </div>
          ) : dados.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">Nenhum dado encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Cabeçalhos dinâmicos baseados no tipo de dados */}
                    {activeTab === 'despachantes' ? (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Código
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nome
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Departamento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Disponibilidade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </>
                    ) : (
                      Object.keys(dados[0]).slice(0, 6).map((key) => (
                        <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {key}
                        </th>
                      ))
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dados.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {activeTab === 'despachantes' ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.codigoDespachante}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.dadosPessoais?.nomeCompleto || item.nomeFormatado}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatarValor(item.tipoUsuario, 'badge', { 
                              cores: { 
                                'despachante': 'blue', 
                                'analista': 'green', 
                                'supervisor': 'orange', 
                                'gerente': 'purple', 
                                'admin': 'red',
                                'auditor': 'yellow',
                                'consultor': 'teal'
                              }
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.carreira?.departamento || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatarValor(item.status?.statusAtual, 'status', {
                              cores: {
                                'ativo': 'green',
                                'inativo': 'red',
                                'ferias': 'yellow',
                                'licenca': 'blue',
                                'afastado': 'orange',
                                'treinamento': 'purple',
                                'desligado': 'gray',
                                'suspenso': 'red'
                              }
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatarValor(item.status?.disponivel, 'booleano')}
                          </td>
                        </>
                      ) : (
                        Object.entries(item).slice(0, 6).map(([key, value]) => (
                          <td key={key} className="px-6 py-4 whitespace-nowrap">
                            {typeof value === 'object' 
                              ? JSON.stringify(value).substring(0, 50) + '...'
                              : String(value).substring(0, 100)}
                          </td>
                        ))
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => buscarDetalhes(
                            item.codigo || item.transportadoraId || item.motoristaId || item.camiaoId || item.codigoDespachante,
                            activeTab
                          )}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Detalhes
                        </button>
                        {activeTab === 'cargas' && (
                          <button
                            onClick={() => window.open(`/carga/${item.codigo}/tracking`, '_blank')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Tracking
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Paginação */}
          {dados.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-700">
                  Página {filtros.curPage}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFiltros({ ...filtros, curPage: Math.max(1, filtros.curPage - 1) })}
                  disabled={filtros.curPage === 1}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setFiltros({ ...filtros, curPage: filtros.curPage + 1 })}
                  className="px-3 py-1 border rounded-lg"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Mega Centro e Logística
              </h1>
              <p className="text-gray-600">Sistema de Controle de Transportes</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString('pt-MZ', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Principais */}
        <div className="mb-8">
          <nav className="flex space-x-2 overflow-x-auto pb-2">
            {Object.entries(tabConfigs).map(([key, config]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setDetalhes(null);
                  setRelatorioSelecionado(null);
                }}
                className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{config.icone}</span>
                {config.titulo}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo Principal */}
        <main>
          {renderizarConteudo()}
        </main>
      </div>

      {/* Modal de Detalhes */}
      {detalhes && renderizarDetalhes()}
    </div>
  );
}

export default MapaControle;