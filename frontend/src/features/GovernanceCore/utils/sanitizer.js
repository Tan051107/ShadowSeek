export function sanitizeText(text) {
  if (!text) return text;
  let sanitized = text;
  
  const patterns = [
    { regex: /(Name:\s*)(.+)/gi, replacement: "$1[EMPLOYEE_NAME]" },
    { regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, replacement: "[EMAIL_REMOVED]" },
    { regex: /(Phone:\s*)\+?[\d\s-]{7,15}/gi, replacement: "$1[PHONE_REMOVED]" },
    { regex: /\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d\b/g, replacement: "[PHONE_REMOVED]" },
    { regex: /(API_KEY\s*=\s*["'])([^"']+)(["'])/gi, replacement: "$1[API_KEY_REMOVED]$3" },
    { regex: /(IC Number:\s*)([\d-]+)/gi, replacement: "$1[IC_REMOVED]" },
    { regex: /(Passport Number:\s*)([A-Za-z0-9]+)/gi, replacement: "$1[PASSPORT_REMOVED]" },
    { regex: /(Bank Account:\s*)([\d-]+)/gi, replacement: "$1[ACCOUNT_REMOVED]" },
    { regex: /\b\d{6}-\d{2}-\d{4}\b/g, replacement: "[IC_REMOVED]" }, // Fallback for raw IC format
    { regex: /\b\d{3}-\d{2}-\d{4}\b/g, replacement: "[REDACTED SSN]" },
    { regex: /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g, replacement: "[REDACTED CARD]" }
  ];

  // Specific keywords based on policies (removed 'ic', 'passport', 'bank account' from blind replacement)
  const keywordReplacements = [
    { word: "salary", replacement: "[REDACTED]" },
    { word: "password", replacement: "[REDACTED]" },
  ];
  
  patterns.forEach(({ regex, replacement }) => {
    sanitized = sanitized.replace(regex, replacement);
  });
  
  keywordReplacements.forEach(({ word, replacement }) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    sanitized = sanitized.replace(regex, replacement);
  });

  return sanitized;
}
