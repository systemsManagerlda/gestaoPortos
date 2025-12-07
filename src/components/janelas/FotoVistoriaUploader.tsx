// FotoVistoriaUploader.tsx
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

interface UploadProgress {
  [key: string]: number;
}

interface UploadedFile {
  file: File;
  previewUrl: string;
  uploadProgress: number;
  isUploading: boolean;
}

interface FotoVistoriaUploaderProps {
  onFilesUploaded: (fotos: Array<{ url: string; descricao: string }>) => void;
  onUploadProgress?: (progress: UploadProgress) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

const FotoVistoriaUploader: React.FC<FotoVistoriaUploaderProps> = ({
  onFilesUploaded,
  onUploadProgress,
  maxFiles = 10,
  maxSizeMB = 5,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [descriptions, setDescriptions] = useState<{ [key: string]: string }>(
    {}
  );
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});

  const handleFileSelect = (selectedFiles: FileList) => {
    const newFiles: UploadedFile[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (files.length + newFiles.length >= maxFiles) {
        alert(`Limite de ${maxFiles} fotos atingido`);
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`Arquivo "${file.name}" excede o limite de ${maxSizeMB}MB`);
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert(`Arquivo "${file.name}" não é uma imagem válida`);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      newFiles.push({
        file,
        previewUrl,
        uploadProgress: 0,
        isUploading: false,
      });
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    URL.revokeObjectURL(fileToRemove.previewUrl);

    setFiles((prev) => prev.filter((_, i) => i !== index));

    const newDescriptions = { ...descriptions };
    delete newDescriptions[fileToRemove.file.name];
    setDescriptions(newDescriptions);
  };

  const updateDescription = (fileName: string, desc: string) => {
    setDescriptions((prev) => ({
      ...prev,
      [fileName]: desc,
    }));
  };

  const uploadFiles = async () => {
    const uploadedFotos: Array<{ url: string; descricao: string }> = [];

    for (let i = 0; i < files.length; i++) {
      const fileData = files[i];

      setFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, isUploading: true } : f))
      );

      const formData = new FormData();
      formData.append("file", fileData.file);
      formData.append("nomeEmpresa", "Mega Centro e Logistica");

      try {
        const response = await axios.post(
          "https://desktop-api-4f850b3f9733.herokuapp.com/docUpload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
              );

              setUploadProgress((prev) => ({
                ...prev,
                [fileData.file.name]: percentCompleted,
              }));

              if (onUploadProgress) {
                onUploadProgress({
                  ...uploadProgress,
                  [fileData.file.name]: percentCompleted,
                });
              }

              setFiles((prev) =>
                prev.map((f, idx) =>
                  idx === i ? { ...f, uploadProgress: percentCompleted } : f
                )
              );
            },
          }
        );

        if (response.status === 200) {
          const link = response.data;
          uploadedFotos.push({
            url: link,
            descricao: descriptions[fileData.file.name] || "",
          });
        }
      } catch (error) {
        console.error(`Erro ao fazer upload de ${fileData.file.name}:`, error);
        alert(`Erro ao fazer upload de ${fileData.file.name}`);
      } finally {
        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, isUploading: false } : f))
        );
      }
    }

    if (uploadedFotos.length > 0) {
      onFilesUploaded(uploadedFotos);
      clearAll();
    }
  };

  const clearAll = () => {
    files.forEach((file) => URL.revokeObjectURL(file.previewUrl));
    setFiles([]);
    setDescriptions({});
    setUploadProgress({});
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
        onClick={() => document.getElementById("file-input")?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <svg
          className="w-12 h-12 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold text-blue-600">
            Clique para selecionar
          </span>{" "}
          ou arraste e solte
        </p>
        <p className="text-xs text-gray-500">
          PNG, JPG, JPEG até {maxSizeMB}MB cada • Máximo {maxFiles} fotos
        </p>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-900">
                Fotos selecionadas ({files.length}/{maxFiles})
              </h4>
              <button
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remover todas
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map((fileData, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                    <Image
                      src={fileData.previewUrl}
                      alt={fileData.file.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {fileData.isUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 mx-auto mb-2">
                            <div className="relative w-16 h-16">
                              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                              <div
                                className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent"
                                style={{
                                  transform: `rotate(${
                                    fileData.uploadProgress * 3.6
                                  }deg)`,
                                }}
                              ></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-bold">
                                  {fileData.uploadProgress}%
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs">Enviando...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 truncate mt-1">
                    {fileData.file.name}
                  </p>

                  <input
                    type="text"
                    placeholder="Descrição (opcional)"
                    value={descriptions[fileData.file.name] || ""}
                    onChange={(e) =>
                      updateDescription(fileData.file.name, e.target.value)
                    }
                    className="w-full mt-1 px-2 py-1 text-xs border rounded"
                    disabled={fileData.isUploading}
                  />

                  <p className="text-xs text-gray-500 mt-1">
                    {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  {!fileData.isUploading && (
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Limpar Tudo
            </button>
            <button
              onClick={uploadFiles}
              disabled={files.some((f) => f.isUploading)}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {files.some((f) => f.isUploading)
                ? "Enviando..."
                : "Enviar Fotos"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FotoVistoriaUploader;
