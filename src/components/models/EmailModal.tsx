/* eslint-disable @typescript-eslint/no-unused-vars */
// EmailModal.tsx
import React, { useState } from 'react';
import { X, Send, Paperclip, AlertCircle, CheckCircle } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: (emailData: {
    emailTo: string;
    emailSubject: string;
    emailBody: string;
    attachments?: File[];
  }) => Promise<boolean>;
  defaultRecipient?: string;
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onSendEmail,
  defaultRecipient = '',
}) => {
  const [emailTo, setEmailTo] = useState(defaultRecipient);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Notificação Padrão', subject: 'Notificação do Sistema', body: 'Prezado(a),\n\nSegue a informação solicitada.\n\nAtenciosamente,\nEquipe Mega Centro de Logística' },
    { id: 2, name: 'Suporte Técnico', subject: 'Suporte Técnico - Ticket', body: 'Olá,\n\nIdentificamos sua solicitação de suporte. Nossa equipe técnica está analisando.\n\nProtocolo: #TICKET-001\n\nEquipe de Suporte' },
    { id: 3, name: 'Confirmação', subject: 'Confirmação de Recebimento', body: 'Confirmamos o recebimento de sua mensagem/documento.\n\nAguarde nosso retorno em até 24 horas.\n\nAtenciosamente,' },
  ]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const applyTemplate = (template: typeof templates[0]) => {
    setEmailSubject(template.subject);
    setEmailBody(template.body);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(emailTo)) {
      setMessage({ text: 'Por favor, insira um e-mail válido', type: 'error' });
      return;
    }

    if (!emailSubject.trim() || !emailBody.trim()) {
      setMessage({ text: 'Assunto e corpo do e-mail são obrigatórios', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const success = await onSendEmail({
        emailTo,
        emailSubject,
        emailBody,
        attachments: attachments.length > 0 ? attachments : undefined,
      });

      if (success) {
        setMessage({ text: 'E-mail enviado com sucesso!', type: 'success' });
        setTimeout(() => {
          onClose();
          resetForm();
        }, 2000);
      } else {
        setMessage({ text: 'Erro ao enviar e-mail. Tente novamente.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Erro ao enviar e-mail. Tente novamente.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmailTo(defaultRecipient);
    setEmailSubject('');
    setEmailBody('');
    setAttachments([]);
    setMessage(null);
  };

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto text-gray-950">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Enviar E-mail</h2>
                <p className="text-sm text-gray-600">Sistema de Comunicação Administrativa</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Templates */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Modelos Rápidos</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  disabled={isLoading}
                  className="flex-shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors disabled:opacity-50"
                >
                  <span className="text-sm font-medium text-gray-700">{template.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {message && (
              <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">{message.text}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Destinatário */}
              <div>
                <label htmlFor="emailTo" className="block text-sm font-medium text-gray-700 mb-1">
                  Para
                </label>
                <input
                  type="email"
                  id="emailTo"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="destinatario@exemplo.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Assunto */}
              <div>
                <label htmlFor="emailSubject" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  id="emailSubject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Assunto do e-mail"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Corpo do E-mail */}
              <div>
                <label htmlFor="emailBody" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="emailBody"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Digite sua mensagem aqui..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Anexos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anexos
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="file-upload"
                      className={`flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Paperclip className="w-4 h-4" />
                      <span className="text-sm font-medium">Adicionar Arquivo</span>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isLoading}
                      />
                    </label>
                    {attachments.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {attachments.length} arquivo(s) selecionado(s)
                      </span>
                    )}
                  </div>
                  
                  {/* Lista de anexos */}
                  {attachments.length > 0 && (
                    <div className="space-y-1">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Paperclip className="w-3 h-3 text-gray-500" />
                            <span className="text-sm truncate max-w-xs">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            disabled={isLoading}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar E-mail
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;