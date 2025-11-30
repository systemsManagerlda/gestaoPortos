// components/NoticiaForm.tsx
import React, { useState, useEffect } from "react";
import { Noticia, NoticiaFormData } from "@/types/noticia";
import { UploadMidia } from "../janelas/UploadMidia";

interface NoticiaFormProps {
  noticia?: Noticia;
  onSubmit: (data: NoticiaFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string | null;
  onAdicionarArquivos?: (
    noticiaId: string,
    arquivos: File[]
  ) => Promise<{ success: boolean; error?: string }>;
  onRemoverArquivo?: (
    noticiaId: string,
    arquivoId: string
  ) => Promise<{ success: boolean; error?: string }>;
}

const ENTIDADES = [
  "Cornelder",
  "CFM",
  "Polícia P.T",
  "Astro",
  "INGD",
  "Município",
  "Governador",
  "Ministério de Transporte",
  "Imigração",
  "Outros",
];

const SETORES = [
  "transportes",
  "logistica",
  "portuario",
  "ferroviario",
  "seguranca",
  "imigracao",
  "governacao",
  "emergencia",
  "infraestrutura",
  "outros",
];

const FONTES = [
  "Comunicado Oficial",
  "Assessoria de Imprensa",
  "Portal do Governo",
  "Site Institucional",
  "Rede Social Oficial",
  "Coletiva de Imprensa",
  "Documento Interno",
  "Outra",
];

export const NoticiaForm: React.FC<NoticiaFormProps> = ({
  noticia,
  onSubmit,
  onCancel,
  loading = false,
  error = null,
  onAdicionarArquivos,
  onRemoverArquivo,
}) => {
  const [formData, setFormData] = useState<NoticiaFormData>({
    titulo: "",
    resumo: "",
    conteudo: "",
    entidade: "",
    setor: "",
    autor: {
      nome: "",
      departamento: "",
      cargo: "",
    },
    fonte: "",
    prioridade: "media",
    visibilidade: "publico",
    dataPublicacao: new Date().toISOString().split("T")[0],
    dataExpiracao: "",
    tags: "",
    arquivos: [], // INICIALIZAR COM ARRAY VAZIO
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [outraFonte, setOutraFonte] = useState("");

  useEffect(() => {
    if (noticia) {
      setFormData({
        titulo: noticia.titulo,
        resumo: noticia.resumo,
        conteudo: noticia.conteudo,
        entidade: noticia.entidade,
        setor: noticia.setor,
        autor: {
          nome: noticia.autor.nome,
          departamento: noticia.autor.departamento || "",
          cargo: noticia.autor.cargo || "",
        },
        fonte: noticia.fonte || "",
        prioridade: noticia.prioridade,
        visibilidade: noticia.visibilidade,
        dataPublicacao: noticia.dataPublicacao.split("T")[0],
        dataExpiracao: noticia.dataExpiracao?.split("T")[0] || "",
        tags: noticia.tags.join(", "),
        arquivos: [], // INICIALIZAR COM ARRAY VAZIO TAMBÉM NA EDIÇÃO
      });

      // Se a fonte não está na lista predefinida, definir como "Outra"
      if (noticia.fonte && !FONTES.includes(noticia.fonte)) {
        setFormData((prev) => ({ ...prev, fonte: "Outra" }));
        setOutraFonte(noticia.fonte);
      }
    }
  }, [noticia]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.titulo.trim()) errors.titulo = "Título é obrigatório";
    if (!formData.resumo.trim()) errors.resumo = "Resumo é obrigatório";
    if (formData.resumo.length > 200)
      errors.resumo = "Resumo deve ter no máximo 200 caracteres";
    if (!formData.conteudo.trim()) errors.conteudo = "Conteúdo é obrigatório";
    if (!formData.entidade) errors.entidade = "Entidade é obrigatória";
    if (!formData.setor) errors.setor = "Setor é obrigatório";
    if (!formData.autor.nome.trim())
      errors.autor_nome = "Nome do autor é obrigatório";
    if (!formData.dataPublicacao)
      errors.dataPublicacao = "Data de publicação é obrigatória";
    if (!formData.fonte) errors.fonte = "Fonte é obrigatória";
    if (formData.fonte === "Outra" && !outraFonte.trim())
      errors.outraFonte = "Especifique a fonte";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Limpar erro do campo quando usuário começar a digitar
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name.startsWith("autor.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        autor: {
          ...prev.autor,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Se mudar para "Outra", limpar o campo de outra fonte se estiver vazio
      if (name === "fonte" && value !== "Outra") {
        setOutraFonte("");
      }
    }
  };

  const handleOutraFonteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOutraFonte(value);

    // Limpar erro se existir
    if (formErrors.outraFonte) {
      setFormErrors((prev) => ({ ...prev, outraFonte: "" }));
    }
  };

  const handleArquivosChange = (arquivos: File[]) => {
    setFormData((prev) => ({ ...prev, arquivos }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("✅ Formulário válido, enviando dados...");

      // Preparar dados finais - se fonte for "Outra", usar o campo personalizado
      const dadosEnvio: NoticiaFormData = {
        ...formData,
        fonte: formData.fonte === "Outra" ? outraFonte : formData.fonte,
        arquivos: formData.arquivos || [], // Garantir que arquivos sempre exista
      };

      onSubmit(dadosEnvio);
    } else {
      console.log("❌ Formulário inválido, corrija os erros");
    }
  };

  // FUNÇÃO PARA ADICIONAR ARQUIVOS A NOTÍCIA EXISTENTE
  const handleAdicionarArquivos = async (
    arquivos: File[]
  ): Promise<boolean> => {
    if (!noticia?._id || !onAdicionarArquivos) return false;

    try {
      const result = await onAdicionarArquivos(noticia._id, arquivos);
      return result.success;
    } catch (error) {
      console.error("Erro ao adicionar arquivos:", error);
      return false;
    }
  };

  // FUNÇÃO PARA REMOVER ARQUIVO DE NOTÍCIA EXISTENTE
  const handleRemoverArquivo = async (arquivoId: string): Promise<void> => {
    if (!noticia?._id || !onRemoverArquivo) return;

    try {
      await onRemoverArquivo(noticia._id, arquivoId);
    } catch (error) {
      console.error("Erro ao remover arquivo:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md text-gray-950"
    >
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 font-medium">Erro: {error}</p>
          <p className="text-red-600 text-sm mt-1">
            Verifique se todos os campos obrigatórios foram preenchidos
            corretamente.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Título */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.titulo ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Digite o título da notícia"
          />
          {formErrors.titulo && (
            <p className="text-red-500 text-sm mt-1">{formErrors.titulo}</p>
          )}
        </div>

        {/* Resumo */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resumo *
          </label>
          <textarea
            name="resumo"
            value={formData.resumo}
            onChange={handleChange}
            required
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.resumo ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Digite um resumo da notícia (máx. 200 caracteres)"
            maxLength={200}
          />
          <div className="flex justify-between mt-1">
            {formErrors.resumo ? (
              <p className="text-red-500 text-sm">{formErrors.resumo}</p>
            ) : (
              <p className="text-gray-500 text-sm">
                {formData.resumo.length}/200 caracteres
              </p>
            )}
          </div>
        </div>

        {/* Entidade e Setor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entidade *
          </label>
          <select
            name="entidade"
            value={formData.entidade}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.entidade ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Selecione uma entidade</option>
            {ENTIDADES.map((entidade) => (
              <option key={entidade} value={entidade}>
                {entidade}
              </option>
            ))}
          </select>
          {formErrors.entidade && (
            <p className="text-red-500 text-sm mt-1">{formErrors.entidade}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Setor *
          </label>
          <select
            name="setor"
            value={formData.setor}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.setor ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Selecione um setor</option>
            {SETORES.map((setor) => (
              <option key={setor} value={setor}>
                {setor.charAt(0).toUpperCase() + setor.slice(1)}
              </option>
            ))}
          </select>
          {formErrors.setor && (
            <p className="text-red-500 text-sm mt-1">{formErrors.setor}</p>
          )}
        </div>

        {/* Fonte */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fonte da Notícia *
          </label>
          <select
            name="fonte"
            value={formData.fonte}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.fonte ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Selecione a fonte</option>
            {FONTES.map((fonte) => (
              <option key={fonte} value={fonte}>
                {fonte}
              </option>
            ))}
          </select>
          {formErrors.fonte && (
            <p className="text-red-500 text-sm mt-1">{formErrors.fonte}</p>
          )}
        </div>

        {/* Campo para fonte personalizada */}
        {formData.fonte === "Outra" && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Especifique a fonte *
            </label>
            <input
              type="text"
              value={outraFonte}
              onChange={handleOutraFonteChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.outraFonte ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Digite a fonte da notícia"
            />
            {formErrors.outraFonte && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.outraFonte}
              </p>
            )}
          </div>
        )}

        {/* Informações do Autor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Autor *
          </label>
          <input
            type="text"
            name="autor.nome"
            value={formData.autor.nome}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.autor_nome ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nome completo do autor"
          />
          {formErrors.autor_nome && (
            <p className="text-red-500 text-sm mt-1">{formErrors.autor_nome}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departamento
          </label>
          <input
            type="text"
            name="autor.departamento"
            value={formData.autor.departamento}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Departamento do autor"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cargo
          </label>
          <input
            type="text"
            name="autor.cargo"
            value={formData.autor.cargo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cargo do autor"
          />
        </div>

        {/* Prioridade e Visibilidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prioridade
          </label>
          <select
            name="prioridade"
            value={formData.prioridade}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visibilidade
          </label>
          <select
            name="visibilidade"
            value={formData.visibilidade}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="publico">Público</option>
            <option value="interno">Interno</option>
            <option value="restrito">Restrito</option>
          </select>
        </div>

        {/* Datas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data de Publicação *
          </label>
          <input
            type="date"
            name="dataPublicacao"
            value={formData.dataPublicacao}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.dataPublicacao ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.dataPublicacao && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.dataPublicacao}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data de Expiração
          </label>
          <input
            type="date"
            name="dataExpiracao"
            value={formData.dataExpiracao}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Separe as tags por vírgula (ex: transporte, porto, logística)"
          />
          <p className="text-gray-500 text-sm mt-1">
            Tags ajudam na busca e categorização das notícias
          </p>
        </div>

        {/* Conteúdo */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conteúdo *
          </label>
          <textarea
            name="conteudo"
            value={formData.conteudo}
            onChange={handleChange}
            required
            rows={10}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.conteudo ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Digite o conteúdo completo da notícia"
          />
          {formErrors.conteudo && (
            <p className="text-red-500 text-sm mt-1">{formErrors.conteudo}</p>
          )}
        </div>

        {/* Upload de Mídia */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Arquivos de Mídia
          </label>
          <UploadMidia
            arquivos={formData.arquivos || []}
            onArquivosChange={handleArquivosChange}
            midiasExistentes={noticia?.midia || []} // Usar o campo midia unificado
            onRemoverMidia={
              noticia && onRemoverArquivo
                ? (midiaId) => {
                    handleRemoverArquivo(midiaId);
                  }
                : undefined
            }
            noticiaId={noticia?._id}
            onAdicionarArquivos={
              noticia && onAdicionarArquivos
                ? handleAdicionarArquivos
                : undefined
            }
          />
          <p className="text-gray-500 text-sm mt-2">
            Adicione imagens, vídeos ou documentos PDF para enriquecer a notícia
          </p>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Salvando..." : noticia ? "Atualizar" : "Criar"} Notícia
        </button>
      </div>
    </form>
  );
};
