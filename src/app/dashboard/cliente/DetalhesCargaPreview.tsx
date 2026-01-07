/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DetalhesCargaPreview.tsx
import React from "react";
import { FiPackage, FiUser, FiMapPin, FiDollarSign, FiTruck, FiX } from "react-icons/fi";

interface DetalhesCargaPreviewProps {
  carga: any;
  onClose: () => void;
  onDuplicar: () => void;
}

export const DetalhesCargaPreview: React.FC<DetalhesCargaPreviewProps> = ({
  carga,
  onClose,
  onDuplicar,
}) => {
  const secoes = [
    {
      titulo: "Informações Gerais",
      icone: FiPackage,
      campos: [
        { label: "Código", valor: carga.codigo },
        { label: "Tipo", valor: carga.tipoCarga },
        { label: "Natureza", valor: carga.naturezaCarga },
        { label: "Status", valor: carga.status },
        { label: "Prioridade", valor: carga.prioridade },
      ],
    },
    {
      titulo: "Cliente",
      icone: FiUser,
      campos: [
        { label: "Cliente", valor: carga.cliente },
        { label: "Contato", valor: carga.contatoCliente },
        { label: "Exportador", valor: carga.exportador },
        { label: "Importador", valor: carga.importador },
      ],
    },
    {
      titulo: "Rota",
      icone: FiMapPin,
      campos: [
        { 
          label: "Origem", 
          valor: `${carga.origem?.cidade}, ${carga.origem?.pais}` 
        },
        { 
          label: "Destino", 
          valor: `${carga.destino?.cidade}, ${carga.destino?.pais}` 
        },
        { label: "Destino Frete", valor: carga.destinoFrete },
      ],
    },
    {
      titulo: "Financeiro",
      icone: FiDollarSign,
      campos: [
        { 
          label: "Valor Mercadoria", 
          valor: carga.valorMercadoria?.toLocaleString('pt-MZ', {
            style: 'currency',
            currency: 'MZN'
          })
        },
        { 
          label: "Valor Frete", 
          valor: carga.valorFrete?.toLocaleString('pt-MZ', {
            style: 'currency',
            currency: 'MZN'
          })
        },
      ],
    },
    {
      titulo: "Dimensões",
      icone: FiTruck,
      campos: [
        { label: "Peso Bruto", valor: `${carga.pesoBruto} kg` },
        { label: "Volume", valor: `${carga.volume} m³` },
        { label: "Volumes", valor: carga.quantidadeVolumes },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-70">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pré-visualização da Carga
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Revise os detalhes antes de duplicar
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secoes.map((secao, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <secao.icone className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {secao.titulo}
                  </h4>
                </div>
                <div className="space-y-2">
                  {secao.campos.map((campo, idx) => (
                    campo.valor && (
                      <div key={idx} className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {campo.label}:
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {campo.valor}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>Atenção:</strong> Ao duplicar, alguns campos serão resetados:
                código, status, datas e informações de rastreamento.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onDuplicar}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Confirmar Duplicação
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};