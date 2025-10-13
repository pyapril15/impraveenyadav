import { z } from 'zod';

/**
 * Contact form validation schema with security constraints
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' })
    .regex(/^[a-zA-Z\s'-]+$/, { message: 'Name can only contain letters, spaces, hyphens, and apostrophes' }),
  
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must be less than 255 characters' })
    .toLowerCase(),
  
  subject: z
    .string()
    .trim()
    .max(200, { message: 'Subject must be less than 200 characters' })
    .optional()
    .or(z.literal('')),
  
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(2000, { message: 'Message must be less than 2000 characters' })
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Sanitize text input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Rate limiting helper
 */
const RATE_LIMIT_KEY = 'contact_form_last_submission';
const RATE_LIMIT_COOLDOWN = 60000; // 1 minute

export const checkRateLimit = (): { allowed: boolean; remainingTime?: number } => {
  try {
    const lastSubmission = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmission) {
      const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
      if (timeSinceLastSubmission < RATE_LIMIT_COOLDOWN) {
        const remainingTime = Math.ceil((RATE_LIMIT_COOLDOWN - timeSinceLastSubmission) / 1000);
        return { allowed: false, remainingTime };
      }
    }
    return { allowed: true };
  } catch (error) {
    console.warn('Rate limit check failed:', error);
    return { allowed: true }; // Fail open for better UX
  }
};

export const setRateLimitTimestamp = (): void => {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
  } catch (error) {
    console.warn('Failed to set rate limit timestamp:', error);
  }
};
