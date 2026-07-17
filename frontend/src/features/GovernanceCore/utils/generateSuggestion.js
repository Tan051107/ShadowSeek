import { sanitizeText } from "./sanitizer";

export function generateSuggestion(originalPrompt) {
  if (!originalPrompt) return "";
  
  const sanitized = sanitizeText(originalPrompt);
  
  // If it's identical, just return it. 
  // If it was changed, provide the suggested sanitized version.
  if (sanitized.toLowerCase() === originalPrompt.toLowerCase()) {
      return originalPrompt;
  }
  
  return sanitized;
}

