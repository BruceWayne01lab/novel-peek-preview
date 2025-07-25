import DOMPurify from 'dompurify';
import { z } from 'zod';

// Content sanitization
export const sanitizeContent = (content: string): string => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'i', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
};

// Input validation schemas
export const schemas = {
  novelId: z.string().regex(/^[a-zA-Z0-9-_]+$/, 'Invalid novel ID format'),
  searchQuery: z.string().max(100).regex(/^[a-zA-Z0-9\s-_.,!?'"]+$/, 'Invalid search query'),
  pageNumber: z.number().int().min(0).max(1000),
} as const;

// Security monitoring
export const securityLogger = {
  logSuspiciousActivity: (activity: string, details?: Record<string, any>) => {
    console.warn(`[SECURITY] ${activity}`, details);
    // In production, this would send to a monitoring service
  },
  
  logXSSAttempt: (content: string, sanitized: string) => {
    if (content !== sanitized) {
      securityLogger.logSuspiciousActivity('XSS attempt detected', {
        originalLength: content.length,
        sanitizedLength: sanitized.length,
        timestamp: new Date().toISOString(),
      });
    }
  },
};

// Validate and sanitize novel content
export const processNovelContent = (content: string): string => {
  const sanitized = sanitizeContent(content);
  securityLogger.logXSSAttempt(content, sanitized);
  return sanitized;
};

// URL validation for external links
export const isValidExternalUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};