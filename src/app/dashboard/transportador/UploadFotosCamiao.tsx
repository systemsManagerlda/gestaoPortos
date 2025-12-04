/* eslint-disable @typescript-eslint/no-unused-vars */
// UploadFotosCamiao.tsx
import React, { useState, useCallback } from "react";
import {
  FiUpload,
  FiImage,
  FiX,
  FiTrash2,
  FiEye,
  FiCamera,
  FiVideo,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

interface FotoCamiao {
  url: string;
  tipo: "camião" | "gps_instalacao";
  descricao?: string;
  dataUpload: Date;
  nomeArquivo: string;
}

interface UploadFotosCamiaoProps {
  camiaoId: number;
  matricula: string;
  onUploadComplete: (fotos: FotoCamiao[]) => void;
  fotosExistentes: string[];
  fotosGPSExistentes: string[];
}

export function UploadFotosCamiao({
  camiaoId,
  matricula,
  onUploadComplete,
  fotosExistentes = [],
  fotosGPSExistentes = [],
}: UploadFotosCamiaoProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tipoUpload, setTipoUpload] = useState<"camião" | "gps_instalacao">(
    "camião"
  );
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const limparUrlFoto = (url: string): string => {
    if (!url) return "";

    // Remove aspas duplas do início e fim
    let urlLimpa = url.replace(/^"+|"+$/g, "");

    // Remove espaços em branco
    urlLimpa = urlLimpa.trim();

    // Corrige possível erro de barra dupla após https:
    urlLimpa = urlLimpa.replace("https:/", "https://");

    return urlLimpa;
  };

  const [fotos, setFotos] = useState<FotoCamiao[]>([
    ...fotosExistentes.map((url) => ({
      url,
      tipo: "camião" as const,
      dataUpload: new Date(),
      nomeArquivo: url.split("/").pop() || "foto.jpg",
    })),
    ...fotosGPSExistentes.map((url) => ({
      url,
      tipo: "gps_instalacao" as const,
      dataUpload: new Date(),
      nomeArquivo: url.split("/").pop() || "foto-gps.jpg",
    })),
  ]);

  const uploadParaS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nomeEmpresa", "Mega Centro e Logistica");

    const response = await fetch(
      "https://desktop-api-4f850b3f9733.herokuapp.com/docUpload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Erro no upload do arquivo");
    }

    const url = await response.text();
    return url;
  };
  

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);
      setError(null);
      setSuccess(null);

      try {
        const novasFotos: FotoCamiao[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if (file.size > 5 * 1024 * 1024) {
            throw new Error(`Arquivo ${file.name} excede o limite de 5MB`);
          }

          const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
          ];
          if (!validTypes.includes(file.type)) {
            throw new Error(
              `Tipo de arquivo não suportado: ${file.name}. Use apenas JPG, PNG ou GIF.`
            );
          }

          const url = await uploadParaS3(file);

          // LIMPAR A URL AQUI
      const urlLimpa = limparUrlFoto(url);

          const novaFoto: FotoCamiao = {
             url: urlLimpa,
            tipo: tipoUpload,
            descricao: descricao || undefined,
            dataUpload: new Date(),
            nomeArquivo: file.name,
          };

          novasFotos.push(novaFoto);

          setProgress(((i + 1) / files.length) * 100);
        }

        const todasFotos = [...fotos, ...novasFotos];
        setFotos(todasFotos);

        setDescricao("");
        setSuccess(`${novasFotos.length} foto(s) carregada(s) com sucesso!`);
        onUploadComplete(todasFotos);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao fazer upload das fotos"
        );
      } finally {
        setUploading(false);
        setProgress(0);
        event.target.value = "";
      }
    },
    [fotos, tipoUpload, descricao, onUploadComplete]
  );

  const handleDeleteFoto = async (index: number) => {
    try {
      const novasFotos = fotos.filter((_, i) => i !== index);
      setFotos(novasFotos);
      onUploadComplete(novasFotos);

      setSuccess("Foto removida com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao remover foto");
    }
  };

  const atualizarCamiaoNoBackend = async (
    fotosCamiao: string[],
    fotosGPS: string[]
  ) => {
    try {
      const response = await fetch(
        "https://desktop-api-4f850b3f9733.herokuapp.com/atualizarFotosCamiao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            camiaoId,
            fotos: fotosCamiao,
            fotosGPS: fotosGPS,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar fotos no sistema");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar camião:", error);
      throw error;
    }
  };

  const handleSalvarFotos = async () => {
    try {
      setUploading(true);

      const fotosCamiao = fotos
        .filter((f) => f.tipo === "camião")
        .map((f) => f.url);

      const fotosGPS = fotos
        .filter((f) => f.tipo === "gps_instalacao")
        .map((f) => f.url);

      await atualizarCamiaoNoBackend(fotosCamiao, fotosGPS);

      setSuccess("Fotos salvas no sistema com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar fotos");
    } finally {
      setUploading(false);
    }
  };

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  

  const formatarTamanhoNome = (nome: string) => {
    if (nome.length > 20) {
      return nome.substring(0, 17) + "...";
    }
    return nome;
  };

  const fotosCamiao = fotos.filter((f) => f.tipo === "camião");
  const fotosGPS = fotos.filter((f) => f.tipo === "gps_instalacao");

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Foto
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setTipoUpload("camião")}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border ${
                  tipoUpload === "camião"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <FiCamera className="w-4 h-4" />
                <span>Camião</span>
              </button>

              <button
                type="button"
                onClick={() => setTipoUpload("gps_instalacao")}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border ${
                  tipoUpload === "gps_instalacao"
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <FiVideo className="w-4 h-4" />
                <span>Instalação GPS</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descrição (opcional)
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder={`Ex: ${
                tipoUpload === "camião"
                  ? "Motor, interior cabine..."
                  : "Instalação GPS VIP..."
              }`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
            <div
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              } text-white`}
            >
              <FiUpload className="w-5 h-5" />
              <span>
                {uploading
                  ? "Enviando..."
                  : `Upload de Fotos do ${
                      tipoUpload === "camião" ? "Camião" : "GPS"
                    }`}
              </span>
            </div>
          </label>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            Formatos: JPG, PNG, GIF (Máx. 5MB por imagem)
          </p>
        </div>

        {uploading && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Upload em progresso...</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {fotos.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSalvarFotos}
              disabled={uploading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiCheck className="w-4 h-4" />
              <span>
                {uploading ? "Salvando..." : "Salvar Fotos no Sistema"}
              </span>
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-sm text-red-600 dark:text-red-400">
            {error}
          </span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-600 dark:text-green-400">
            {success}
          </span>
        </div>
      )}

      {fotosCamiao.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiCamera className="w-5 h-5 mr-2 text-blue-600" />
              Fotos do Camião ({fotosCamiao.length})
            </h3>
            <button
              onClick={() => setTipoUpload("camião")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Adicionar mais
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fotosCamiao.map((foto, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={foto.url}
                    alt={foto.descricao || `Foto do camião ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open(foto.url, "_blank")}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        title="Visualizar"
                      >
                        <FiEye className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteFoto(
                            fotos.findIndex((f) => f.url === foto.url)
                          )
                        }
                        className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                        title="Remover"
                      >
                        <FiTrash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {foto.descricao || formatarTamanhoNome(foto.nomeArquivo)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatarData(foto.dataUpload)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {fotosGPS.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FiVideo className="w-5 h-5 mr-2 text-purple-600" />
              Fotos da Instalação GPS ({fotosGPS.length})
            </h3>
            <button
              onClick={() => setTipoUpload("gps_instalacao")}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              Adicionar mais
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fotosGPS.map((foto, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={foto.url}
                    alt={
                      foto.descricao || `Foto da instalação GPS ${index + 1}`
                    }
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open(foto.url, "_blank")}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        title="Visualizar"
                      >
                        <FiEye className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteFoto(
                            fotos.findIndex((f) => f.url === foto.url)
                          )
                        }
                        className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                        title="Remover"
                      >
                        <FiTrash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {foto.descricao || formatarTamanhoNome(foto.nomeArquivo)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatarData(foto.dataUpload)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {fotos.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
          <FiImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma foto carregada
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Adicione fotos do camião e da instalação do GPS para documentação
            completa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setTipoUpload("camião")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Adicionar Fotos do Camião
            </button>
            <button
              onClick={() => setTipoUpload("gps_instalacao")}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Adicionar Fotos GPS
            </button>
          </div>
        </div>
      )}

      {fotos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {fotosCamiao.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Fotos Camião
            </div>
          </div>

          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {fotosGPS.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Fotos GPS
            </div>
          </div>

          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {fotos.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Fotos
            </div>
          </div>

          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {fotos.length > 0
                ? new Date(
                    Math.max(...fotos.map((f) => f.dataUpload.getTime()))
                  ).toLocaleDateString("pt-MZ")
                : "-"}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Última Atualização
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
