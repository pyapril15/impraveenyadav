import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { sanitizeInput } from '@/lib/validations/contact';

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface ContactFormError {
  message: string;
  code?: string;
}

export const useContactForm = () => {
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      try {
        // Sanitize all inputs before sending
        const sanitizedData = {
          name: sanitizeInput(formData.name),
          email: sanitizeInput(formData.email.toLowerCase()),
          subject: formData.subject ? sanitizeInput(formData.subject) : undefined,
          message: sanitizeInput(formData.message),
        };

        // Insert into database with timeout
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('TIMEOUT')), 10000);
        });

        const insertPromise = supabase
          .from('contact_requests')
          .insert([sanitizedData])
          .select()
          .single();

        const { data, error } = await Promise.race([
          insertPromise,
          timeoutPromise
        ]) as any;

        if (error) {
          throw {
            message: error.message,
            code: error.code,
          } as ContactFormError;
        }

        return data;
      } catch (error: any) {
        // Handle different types of errors
        if (error.name === 'AbortError') {
          throw {
            message: 'Request timeout - please try again',
            code: 'TIMEOUT',
          } as ContactFormError;
        }
        
        if (error.code === '23505') {
          throw {
            message: 'Duplicate submission detected',
            code: 'DUPLICATE',
          } as ContactFormError;
        }

        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        duration: 5000,
      });
    },
    onError: (error: ContactFormError) => {
      console.error('Contact form error:', error);
      
      const errorMessages: Record<string, string> = {
        'TIMEOUT': 'Request timed out. Please check your connection and try again.',
        'DUPLICATE': 'This message was already sent. Please wait before sending another.',
        '23514': 'Invalid data provided. Please check your inputs.',
        'PGRST116': 'Service temporarily unavailable. Please try again later.',
      };

      const description = error.code && errorMessages[error.code]
        ? errorMessages[error.code]
        : 'Unable to send message. Please try again or contact me directly via email.';

      toast({
        title: "Failed to send message",
        description,
        variant: "destructive",
        duration: 6000,
      });
    },
  });
};