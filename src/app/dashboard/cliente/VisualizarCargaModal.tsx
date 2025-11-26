import React, { useMemo } from "react";
import {
  FiPackage,
  FiMapPin,
  FiAlertTriangle,
  FiAlertCircle,
  FiX,
  FiUser,
  FiTruck,
  FiDollarSign,
  FiFlag,
  FiBox,
  FiNavigation,
  FiFileText,
  FiArchive,
  FiLayers,
  FiTrendingUp,
  FiPhone,
  FiShield,
  FiWifi,
  FiThermometer,
  FiDroplet,
  FiClock,
  FiBarChart2,
} from "react-icons/fi";
import { 
  formatarData, 
  formatarMoeda, 
  getPrioridadeColor, 
  getStatusColor, 
  getStatusText 
} from "./cargaUtils";
import { Carga } from "./cargaService";

interface VisualizarCargaModalProps {
  show: boolean;
  onClose: () => void;
  carga: Carga | null;
}

// Componente Modal para Visualização de Carga
export const VisualizarCargaModal: React.FC<VisualizarCargaModalProps> = ({
  show,
  onClose,
  carga,
}) => {
  // Mover todos os hooks para o topo, antes de qualquer condicional
  const formatarDetalhesFinanceiros = useMemo(() => {
    if (!carga) return [];
    
    const detalhes = [
      { label: 'Valor do Frete', valor: carga.valorFrete, icon: FiTruck },
      { label: 'Taxas Portuárias', valor: carga.taxasPortuarias, icon: FiArchive },
      { label: 'Despesas Operacionais', valor: carga.despesasOperacionais, icon: FiDollarSign },
      { label: 'Valor da Mercadoria', valor: carga.valorMercadoria, icon: FiPackage },
      { label: 'Comissão Calculada', valor: carga.comissaoCalculada, icon: FiTrendingUp },
    ].filter(item => item.valor !== undefined && item.valor !== null);

    return detalhes;
  }, [carga]);

  const temDadosSensores = useMemo(() => {
    if (!carga?.sensoresIOT) return false;
    
    return (
      carga.sensoresIOT.temperatura !== undefined ||
      carga.sensoresIOT.umidade !== undefined ||
      carga.sensoresIOT.aberturaPorta ||
      carga.sensoresIOT.movimentoBruscoDetectado ||
      carga.sensoresIOT.tombamentoDetectado
    );
  }, [carga?.sensoresIOT]);

  // Funções regulares (não hooks) podem vir depois
  const getSensorColor = (valor: boolean | number | undefined, tipo: string) => {
    if (typeof valor === 'boolean') {
      return valor ? 'text-red-600' : 'text-green-600';
    }
    
    if (typeof valor === 'number') {
      switch (tipo) {
        case 'temperatura':
          return valor > 30 ? 'text-red-600' : valor < 5 ? 'text-blue-600' : 'text-green-600';
        case 'umidade':
          return valor > 80 ? 'text-red-600' : valor < 30 ? 'text-orange-600' : 'text-green-600';
        default:
          return 'text-gray-600';
      }
    }
    
    return 'text-gray-600';
  };

  const getGPSValue = (value: number | undefined, suffix: string = ''): string | undefined => {
    return value !== undefined ? `${value}${suffix}` : undefined;
  };

  const getBatteryColor = (battery: number | undefined): 'red' | 'green' | 'yellow' | 'gray' => {
    if (battery === undefined) return 'gray';
    if (battery < 20) return 'red';
    if (battery < 50) return 'yellow';
    return 'green';
  };

  const getSatelliteColor = (satellites: number | undefined): 'red' | 'green' | 'yellow' | 'gray' => {
    if (satellites === undefined) return 'gray';
    if (satellites < 3) return 'red';
    if (satellites < 5) return 'yellow';
    return 'green';
  };

  // Função auxiliar para formatar coordenadas
  const formatarCoordenadas = (coordenadas: { lat: number; lng: number } | undefined | null): string | undefined => {
    if (!coordenadas) return undefined;
    
    try {
      return `${coordenadas.lat?.toFixed(6) || '0.000000'}, ${coordenadas.lng?.toFixed(6) || '0.000000'}`;
    } catch (error) {
      console.error('Erro ao formatar coordenadas:', error);
      return undefined;
    }
  };

  // Agora sim, o return condicional pode vir depois de todos os hooks
  if (!show || !carga) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {carga.codigo}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {carga.cliente} • {carga.descricao}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(carga.status)}`}>
                {getStatusText(carga.status)}
              </span>
              {carga.atrasada && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  <FiAlertTriangle className="w-3 h-3 mr-1" />
                  Atrasada
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Seção 1: Informações Principais */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Identificação */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiFileText className="w-5 h-5 mr-2" />
                Identificação
              </h3>
              
              <div className="space-y-3">
                <InfoItem label="Código" value={carga.codigo} monospace />
                <InfoItem label="Cliente" value={carga.cliente} />
                <InfoItem label="Tipo" value={carga.tipoCarga} />
                <InfoItem label="Natureza" value={carga.naturezaCarga} capitalize />
                <InfoItem label="Categoria Seguro" value={carga.categoriaSeguro} />
                <InfoItem label="Abrangência" value={carga.abrangenciaSeguro} />
                <InfoItem label="Tipo Percurso" value={carga.tipoPercurso} />
                <InfoItem label="Destino Frete" value={carga.destinoFrete} />
                <InfoItem label="Data Criação" value={formatarData(carga.dataCriacao)} />
              </div>
            </div>

            {/* Status e Datas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiFlag className="w-5 h-5 mr-2" />
                Status e Datas
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(carga.status)}`}>
                    {getStatusText(carga.status)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Prioridade:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPrioridadeColor(carga.prioridade)}`}>
                    {carga.prioridade?.charAt(0).toUpperCase() + carga.prioridade?.slice(1)}
                  </span>
                </div>

                <InfoItem label="Data Coleta" value={carga.dataColeta} formatDate />
                <InfoItem label="Previsão Entrega" value={carga.dataEntregaPrevista} formatDate />
                <InfoItem label="Data Entrega Real" value={carga.dataEntregaReal} formatDate />

                {carga.distanciaKm && (
                  <InfoItem label="Distância" value={`${carga.distanciaKm} km`} />
                )}
              </div>
            </div>

            {/* Especificações */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiBox className="w-5 h-5 mr-2" />
                Especificações
              </h3>
              
              <div className="space-y-3">
                <InfoItem label="Peso Bruto" value={carga.pesoBruto} suffix="kg" />
                <InfoItem label="Peso Líquido" value={carga.pesoLiquido} suffix="kg" />
                <InfoItem label="Volume" value={carga.volume} suffix="m³" />
                <InfoItem label="Volumes" value={carga.quantidadeVolumes} />
                <InfoItem label="Embalagem" value={carga.embalagem} />
                <InfoItem label="Descrição" value={carga.descricao} />
              </div>
            </div>
          </div>

          {/* Seção 2: Dimensões */}
          {carga.dimensoes && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiLayers className="w-5 h-5 mr-2" />
                Dimensões
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard 
                  label="Largura" 
                  value={carga.dimensoes.largura ? `${carga.dimensoes.largura} cm` : undefined}
                  icon={FiBarChart2}
                  color="blue"
                />
                <MetricCard 
                  label="Altura" 
                  value={carga.dimensoes.altura ? `${carga.dimensoes.altura} cm` : undefined}
                  icon={FiBarChart2}
                  color="green"
                />
                <MetricCard 
                  label="Comprimento" 
                  value={carga.dimensoes.comprimento ? `${carga.dimensoes.comprimento} cm` : undefined}
                  icon={FiBarChart2}
                  color="purple"
                />
              </div>
            </div>
          )}

          {/* Seção 3: Rota e Localização */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <FiNavigation className="w-5 h-5 mr-2" />
              Rota e Localização
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LocationCard 
                title="Origem"
                location={carga.origem}
                icon={FiMapPin}
                color="blue"
                formatarCoordenadas={formatarCoordenadas}
              />
              
              <LocationCard 
                title="Destino"
                location={carga.destino}
                icon={FiMapPin}
                color="green"
                formatarCoordenadas={formatarCoordenadas}
              />
            </div>

            {carga.pontoAtual && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center mb-2">
                  <FiMapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h4 className="font-medium text-gray-900 dark:text-white">Localização Atual</h4>
                </div>
                <p className="text-sm text-gray-900 dark:text-white">{carga.pontoAtual.descricao}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Atualizado em {formatarData(carga.pontoAtual.data)}
                </p>
                {carga.pontoAtual.lat && carga.pontoAtual.lng && (
                  <p className="text-xs text-gray-400 mt-1">
                    {formatarCoordenadas({ lat: carga.pontoAtual.lat, lng: carga.pontoAtual.lng })}
                  </p>
                )}
              </div>
            )}

            {carga.desvioRotaPercentual && carga.desvioRotaPercentual > 0 && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiAlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                    <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Desvio de Rota Detectado
                    </span>
                  </div>
                  <span className="text-sm text-yellow-700 dark:text-yellow-300">
                    {carga.desvioRotaPercentual}% de desvio
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Resto do código permanece igual... */}
          {/* Seção 4: Contentor */}
          {carga.contentor && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiArchive className="w-5 h-5 mr-2" />
                Contentor
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                  label="Número" 
                  value={carga.contentor.numero}
                  icon={FiArchive}
                  color="gray"
                />
                <MetricCard 
                  label="Tipo" 
                  value={carga.contentor.tipo}
                  icon={FiArchive}
                  color="gray"
                />
                <MetricCard 
                  label="Tara" 
                  value={carga.contentor.tara ? `${carga.contentor.tara} kg` : undefined}
                  icon={FiArchive}
                  color="gray"
                />
                <MetricCard 
                  label="Capacidade Máxima" 
                  value={carga.contentor.capacidadeMaxima ? `${carga.contentor.capacidadeMaxima} kg` : undefined}
                  icon={FiArchive}
                  color="gray"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {carga.contentor.lacreOrigem && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Lacre de Origem</span>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-300 mt-1">{carga.contentor.lacreOrigem}</p>
                  </div>
                )}
                
                {carga.contentor.lacreDestino && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Lacre de Destino</span>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-300 mt-1">{carga.contentor.lacreDestino}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Seção 5: Dispositivos e Sensores */}
          {(carga.gps || temDadosSensores) && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiWifi className="w-5 h-5 mr-2" />
                Dispositivos e Sensores
              </h3>

              {carga.gps && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <MetricCard 
                    label="Código GPS" 
                    value={carga.gps.codigo}
                    icon={FiWifi}
                    color="blue"
                  />
                  <MetricCard 
                    label="Bateria" 
                    value={getGPSValue(carga.gps.bateriaPercentual, '%')}
                    icon={FiWifi}
                    color={getBatteryColor(carga.gps.bateriaPercentual)}
                  />
                  <MetricCard 
                    label="Satélites" 
                    value={getGPSValue(carga.gps.satelites)}
                    icon={FiWifi}
                    color={getSatelliteColor(carga.gps.satelites)}
                  />
                  <MetricCard 
                    label="Última Comunicação" 
                    value={carga.gps.ultimaComunicacao ? formatarData(carga.gps.ultimaComunicacao) : undefined}
                    icon={FiClock}
                    color="gray"
                  />
                </div>
              )}

              {temDadosSensores && carga.sensoresIOT && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {carga.sensoresIOT.temperatura !== undefined && (
                    <SensorCard 
                      label="Temperatura"
                      value={`${carga.sensoresIOT.temperatura}°C`}
                      icon={FiThermometer}
                      color={getSensorColor(carga.sensoresIOT.temperatura, 'temperatura')}
                    />
                  )}
                  
                  {carga.sensoresIOT.umidade !== undefined && (
                    <SensorCard 
                      label="Umidade"
                      value={`${carga.sensoresIOT.umidade}%`}
                      icon={FiDroplet}
                      color={getSensorColor(carga.sensoresIOT.umidade, 'umidade')}
                    />
                  )}
                  
                  <SensorCard 
                    label="Porta Aberta"
                    value={carga.sensoresIOT.aberturaPorta ? "Sim" : "Não"}
                    icon={carga.sensoresIOT.aberturaPorta ? FiAlertCircle : undefined}
                    color={getSensorColor(carga.sensoresIOT.aberturaPorta, 'boolean')}
                  />
                  
                  <SensorCard 
                    label="Movimento Brusco"
                    value={carga.sensoresIOT.movimentoBruscoDetectado ? "Detectado" : "Normal"}
                    icon={carga.sensoresIOT.movimentoBruscoDetectado ? FiAlertCircle : undefined}
                    color={getSensorColor(carga.sensoresIOT.movimentoBruscoDetectado, 'boolean')}
                  />
                  
                  <SensorCard 
                    label="Tombamento"
                    value={carga.sensoresIOT.tombamentoDetectado ? "Detectado" : "Normal"}
                    icon={carga.sensoresIOT.tombamentoDetectado ? FiAlertCircle : undefined}
                    color={getSensorColor(carga.sensoresIOT.tombamentoDetectado, 'boolean')}
                  />
                </div>
              )}
            </div>
          )}

          {/* Seção 6: Informações Financeiras */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <FiDollarSign className="w-5 h-5 mr-2" />
              Informações Financeiras
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard 
                label="Valor Total"
                value={formatarMoeda(carga.valorTotal)}
                icon={FiDollarSign}
                color="green"
                large
              />
              
              <MetricCard 
                label="Margem de Lucro"
                value={carga.margemLucro ? formatarMoeda(carga.margemLucro) : undefined}
                icon={FiTrendingUp}
                color="blue"
              />
              
              <MetricCard 
                label="Valor Mercadoria"
                value={formatarMoeda(carga.valorMercadoria)}
                icon={FiPackage}
                color="purple"
              />
              
              <MetricCard 
                label="Comissão"
                value={carga.comissaoCalculada ? formatarMoeda(carga.comissaoCalculada) : undefined}
                icon={FiTrendingUp}
                color="orange"
              />
            </div>

            {/* Detalhes Financeiros */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {formatarDetalhesFinanceiros.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <item.icon className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatarMoeda(item.valor!)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Seção 7: Seguro */}
          {carga.seguro && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiShield className="w-5 h-5 mr-2" />
                Seguro
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                  label="Valor Segurado"
                  value={formatarMoeda(carga.seguro.valorSegurado)}
                  icon={FiShield}
                  color="purple"
                />
                
                <MetricCard 
                  label="Prêmio Final"
                  value={carga.seguro.premioFinal ? formatarMoeda(carga.seguro.premioFinal) : undefined}
                  icon={FiDollarSign}
                  color="green"
                />
                
                <MetricCard 
                  label="Taxa"
                  value={carga.seguro.taxaPercentual ? `${carga.seguro.taxaPercentual}%` : undefined}
                  icon={FiTrendingUp}
                  color="blue"
                />
                
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FiShield className={`w-8 h-8 mx-auto mb-2 ${
                    carga.seguro.statusSeguro === 'ativo' ? 'text-green-600' : 
                    carga.seguro.statusSeguro === 'pendente' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                  <h4 className="font-medium text-gray-900 dark:text-white">Status</h4>
                  <p className={`text-sm font-semibold capitalize ${
                    carga.seguro.statusSeguro === 'ativo' ? 'text-green-600' : 
                    carga.seguro.statusSeguro === 'pendente' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {carga.seguro.statusSeguro}
                  </p>
                </div>
              </div>

              {carga.seguro.apolice && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Apólice</span>
                  <p className="text-sm font-mono text-gray-600 dark:text-gray-300 mt-1">{carga.seguro.apolice}</p>
                </div>
              )}
            </div>
          )}

          {/* Seção 8: Transporte */}
          {(carga.motorista || carga.veiculo) && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiTruck className="w-5 h-5 mr-2" />
                Transporte
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {carga.motorista && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center mb-3">
                      <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <h4 className="font-medium text-gray-900 dark:text-white">Motorista</h4>
                    </div>
                    <div className="space-y-2">
                      <InfoItem label="Nome" value={carga.motorista.nome} inline />
                      <InfoItem label="Empresa" value={carga.motorista.empresaMotorista} inline />
                      <InfoItem label="Telefone" value={carga.motorista.telefone} inline />
                      {carga.motorista.avaliacao && (
                        <InfoItem 
                          label="Avaliação" 
                          value={`${carga.motorista.avaliacao}/5`} 
                          inline 
                        />
                      )}
                    </div>
                  </div>
                )}
                
                {carga.veiculo && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center mb-3">
                      <FiTruck className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                      <h4 className="font-medium text-gray-900 dark:text-white">Veículo</h4>
                    </div>
                    <div className="space-y-2">
                      <InfoItem label="Matrícula" value={carga.veiculo.matricula} inline />
                      <InfoItem label="Modelo" value={carga.veiculo.modelo} inline />
                      <InfoItem label="Ano" value={carga.veiculo.ano?.toString()} inline />
                      {carga.veiculo.seguroVeiculo && (
                        <>
                          <InfoItem 
                            label="Seguro Veículo" 
                            value={carga.veiculo.seguroVeiculo.tipo} 
                            inline 
                          />
                          <InfoItem 
                            label="Prêmio Seguro" 
                            value={carga.veiculo.seguroVeiculo.valorPremio ? formatarMoeda(carga.veiculo.seguroVeiculo.valorPremio) : undefined} 
                            inline 
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Seção 9: Ocorrências */}
          {carga.ocorrencias && carga.ocorrencias.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiAlertCircle className="w-5 h-5 mr-2" />
                Ocorrências ({carga.ocorrencias.length})
              </h3>
              
              <div className="space-y-3">
                {carga.ocorrencias.map((ocorrencia, index) => (
                  <div key={index} className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {ocorrencia.tipo}
                        </span>
                        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          ocorrencia.severidade === 'crítica' ? 'bg-red-100 text-red-800' :
                          ocorrencia.severidade === 'alta' ? 'bg-orange-100 text-orange-800' :
                          ocorrencia.severidade === 'média' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {ocorrencia.severidade}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatarData(ocorrencia.dataRegistro)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{ocorrencia.descricao}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Status: {ocorrencia.status}</span>
                      {ocorrencia.acaoTomada && (
                        <span>Ação: {ocorrencia.acaoTomada}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seção 10: Informações Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contato do Cliente */}
            {carga.contatoCliente && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                  <FiPhone className="w-5 h-5 mr-2" />
                  Contato do Cliente
                </h3>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{carga.contatoCliente}</p>
                  <p className="text-sm text-gray-500 mt-1">Telefone para contato</p>
                </div>
              </div>
            )}

            {/* Instruções Especiais */}
            {carga.instrucaoEspecial && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                  <FiAlertCircle className="w-5 h-5 mr-2" />
                  Instruções Especiais
                </h3>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{carga.instrucaoEspecial}</p>
                </div>
              </div>
            )}
          </div>

          {/* Seção 11: Partes Envolvidas */}
          {(carga.exportador || carga.importador) && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiUser className="w-5 h-5 mr-2" />
                Partes Envolvidas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {carga.exportador && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-500">Exportador</span>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{carga.exportador}</p>
                  </div>
                )}
                
                {carga.importador && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-500">Importador</span>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{carga.importador}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componentes auxiliares para melhor organização

interface InfoItemProps {
  label: string;
  value: string | number | undefined | null;
  monospace?: boolean;
  capitalize?: boolean;
  inline?: boolean;
  formatDate?: boolean;
  formatCurrency?: boolean;
  suffix?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ 
  label, 
  value, 
  monospace = false, 
  capitalize = false,
  inline = false,
  formatDate = false,
  formatCurrency = false,
  suffix = ''
}) => {
  if (value === undefined || value === null || value === '') return null;

  let displayValue: string;

  if (formatDate) {
    displayValue = formatarData(value as string);
  } else if (formatCurrency && typeof value === 'number') {
    displayValue = formatarMoeda(value);
  } else {
    displayValue = String(value) + (suffix ? ` ${suffix}` : '');
  }

  const valueClasses = [
    'text-sm',
    monospace ? 'font-mono' : '',
    capitalize ? 'capitalize' : '',
    inline ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'
  ].join(' ');

  if (inline) {
    return (
      <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-500">{label}:</span>
        <span className={valueClasses}>{displayValue}</span>
      </div>
    );
  }

  return (
    <div>
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <p className={valueClasses}>{displayValue}</p>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string | undefined;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'gray';
  large?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  color,
  large = false 
}) => {
  if (!value) return null;

  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
    orange: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20',
    red: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
    yellow: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
    gray: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700'
  };

  return (
    <div className={`text-center p-4 rounded-lg ${colorClasses[color]}`}>
      <Icon className={`w-8 h-8 mx-auto mb-2 ${large ? 'w-10 h-10' : ''}`} />
      <h4 className="font-medium text-gray-900 dark:text-white">{label}</h4>
      <p className={`font-semibold ${large ? 'text-xl' : 'text-lg'}`}>{value}</p>
    </div>
  );
};

interface LocationCardProps {
  title: string;
  location: {
    pais: string;
    cidade: string;
    local: string;
    coordenadas?: {
      lat: number;
      lng: number;
    } | null;
  };
  icon: React.ElementType;
  color: 'blue' | 'green';
  formatarCoordenadas: (coordenadas: { lat: number; lng: number } | undefined | null) => string | undefined;
}

const LocationCard: React.FC<LocationCardProps> = ({ 
  title, 
  location, 
  icon: Icon, 
  color,
  formatarCoordenadas
}) => {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
  };

  const coordenadasFormatadas = formatarCoordenadas(location.coordenadas);

  return (
    <div className={`p-4 rounded-lg ${colorClasses[color]}`}>
      <div className="flex items-center mb-3">
        <Icon className={`w-5 h-5 mr-2 ${colorClasses[color].split(' ')[0]}`} />
        <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-900 dark:text-white">{location.local}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{location.cidade}</p>
        <p className="text-sm text-gray-500">{location.pais}</p>
        {coordenadasFormatadas && (
          <p className="text-xs text-gray-400">
            {coordenadasFormatadas}
          </p>
        )}
      </div>
    </div>
  );
};

interface SensorCardProps {
  label: string;
  value: string;
  icon: React.ElementType | undefined;
  color: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  color 
}) => {
  return (
    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      {Icon && <Icon className={`w-6 h-6 mx-auto mb-1 ${color}`} />}
      <h4 className="text-xs font-medium text-gray-500 mb-1">{label}</h4>
      <p className={`text-sm font-semibold ${color}`}>{value}</p>
    </div>
  );
};