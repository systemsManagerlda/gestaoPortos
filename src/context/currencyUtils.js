/* eslint-disable @typescript-eslint/no-unused-vars */
// Códigos de moeda ISO 4217 válidos
export const VALID_CURRENCY_CODES = ['MZN', 'USD', 'EUR', 'ZAR', 'GBP', 'CNY'];

// Formatação de moeda com fallback
export const formatCurrency = (value, currencyCode = 'MZN', locale = 'pt-MZ') => {
  const validCurrency = VALID_CURRENCY_CODES.includes(currencyCode) ? currencyCode : 'MZN';
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: validCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value || 0);
  } catch (error) {
    console.warn(`Erro ao formatar moeda ${validCurrency}:`, error);
    
    // Fallback para formatação simples
    const formattedNumber = (value || 0).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    return `${formattedNumber} ${validCurrency}`;
  }
};

// Formatação de números grandes (milhares, milhões)
export const formatCompactCurrency = (value, currencyCode = 'MZN', locale = 'pt-MZ') => {
  const validCurrency = VALID_CURRENCY_CODES.includes(currencyCode) ? currencyCode : 'MZN';
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: validCurrency,
      notation: 'compact',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(value || 0);
  } catch (error) {
    // Fallback para formatação normal
    return formatCurrency(value, validCurrency, locale);
  }
};

// Validação de código de moeda
export const isValidCurrencyCode = (code) => {
  return VALID_CURRENCY_CODES.includes(code?.toUpperCase());
};

// Obter código de moeda válido
export const getValidCurrencyCode = (code, defaultCode = 'MZN') => {
  return isValidCurrencyCode(code) ? code.toUpperCase() : defaultCode;
};