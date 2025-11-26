/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FiMapPin,
  FiNavigation,
  FiTruck,
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiX,
  FiClock,
  FiAlertCircle
} from "react-icons/fi";
import { formatarData } from "./cargaUtils";

// Interface para o modal de rastreamento
interface RastreamentoModalProps {
  show: boolean;
  onClose: () => void;
  carga: any;
}
// Componente Modal para Rastreamento
export const RastreamentoModal: React.FC<RastreamentoModalProps> = ({
  show,
  onClose,
  carga,
}) => {
  if (!show || !carga) return null;

  // Verificar se a carga tem motorista associado
  const temMotoristaAssociado = carga.motorista && carga.motorista.nome && carga.motorista.id;

  if (!temMotoristaAssociado) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Rastreamento Indisponível
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            <div className="text-center">
              <FiAlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Transporte Não Associado
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Esta carga ainda não foi aceite por nenhum motorista. 
                O rastreamento estará disponível após a associação do transporte.
              </p>
            </div>
          </div>
          <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Simulação de dados de rastreamento (em uma aplicação real, viria da API)
  const dadosRastreamento = {
    posicaoAtual: carga.pontoAtual || {
      descricao: "Em trânsito - N1 EN1",
      lat: -25.9689,
      lng: 32.5699,
      data: new Date()
    },
    proximoCheckpoint: "Posto Fiscal de Ressano Garcia",
    distanciaPercorrida: "245 km",
    distanciaRestante: "155 km",
    velocidadeAtual: "78 km/h",
    tempoEstimado: "2 horas",
    ultimaAtualizacao: new Date(),
    historicoPosicoes: [
      { descricao: "Porto de Maputo", data: new Date(Date.now() - 4 * 60 * 60 * 1000) },
      { descricao: "Saída Cidade de Maputo", data: new Date(Date.now() - 3 * 60 * 60 * 1000) },
      { descricao: "Posto de Combustível Moamba", data: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { descricao: "Em trânsito - N1 EN1", data: new Date() }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Rastreamento - {carga.codigo}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Monitoramento em tempo real da carga
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Informações do Transporte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiUser className="w-5 h-5 mr-2" />
                Motorista Responsável
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Nome:</span>
                  <span className="text-sm text-gray-900 dark:text-white">{carga.motorista.nome}</span>
                </div>
                
                {carga.motorista.empresaMotorista && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Empresa:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{carga.motorista.empresaMotorista}</span>
                  </div>
                )}
                
                {carga.motorista.telefone && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Telefone:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{carga.motorista.telefone}</span>
                  </div>
                )}
                
                {carga.motorista.cartaConducaoNumero && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Carta Condução:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{carga.motorista.cartaConducaoNumero}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FiTruck className="w-5 h-5 mr-2" />
                Veículo
              </h3>
              
              <div className="space-y-3">
                {carga.veiculo?.matricula && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Matrícula:</span>
                    <span className="text-sm text-gray-900 dark:text-white font-mono">{carga.veiculo.matricula}</span>
                  </div>
                )}
                
                {carga.veiculo?.modelo && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Modelo:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{carga.veiculo.modelo}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <FiCheckCircle className="w-3 h-3 mr-1" />
                    Em Movimento
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Posição Atual */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <FiMapPin className="w-5 h-5 mr-2" />
              Posição Atual
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center mb-2">
                  <FiNavigation className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="font-medium text-gray-900 dark:text-white">Localização</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {dadosRastreamento.posicaoAtual.descricao}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {dadosRastreamento.posicaoAtual.data ? 
                    formatarData(dadosRastreamento.posicaoAtual.data) : 
                    'Última atualização'
                  }
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center mb-2">
                  <FiClock className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  <span className="font-medium text-gray-900 dark:text-white">Próximo Checkpoint</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {dadosRastreamento.proximoCheckpoint}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Chegada em ~{dadosRastreamento.tempoEstimado}
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center mb-2">
                  <FiTruck className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <span className="font-medium text-gray-900 dark:text-white">Velocidade</span>
                </div>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {dadosRastreamento.velocidadeAtual}
                </p>
                <p className="text-xs text-gray-500 mt-1">Velocidade atual</p>
              </div>
            </div>
          </div>

          {/* Progresso da Viagem */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <FiNavigation className="w-5 h-5 mr-2" />
              Progresso da Viagem
            </h3>
            
            <div className="space-y-4">
              {/* Barra de Progresso */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: '61%' }} // 245km de 400km total
                ></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-sm font-medium text-gray-500">Percorrido</span>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {dadosRastreamento.distanciaPercorrida}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Restante</span>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {dadosRastreamento.distanciaRestante}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Progresso</span>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">61%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico de Posições */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <FiClock className="w-5 h-5 mr-2" />
              Histórico de Trajeto
            </h3>
            
            <div className="space-y-3">
              {dadosRastreamento.historicoPosicoes.map((posicao, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                    <FiMapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {posicao.descricao}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatarData(posicao.data)}
                    </p>
                  </div>
                  {index === 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Atual
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FiPhone className="w-4 h-4 mr-2" />
              Contactar Motorista
            </button>
            <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FiMapPin className="w-4 h-4 mr-2" />
              Ver no Mapa
            </button>
            <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FiClock className="w-4 h-4 mr-2" />
              Atualizar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
