import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useContactForm, type ContactFormData } from '@/hooks/useContactForm';
import { contactFormSchema, checkRateLimit, setRateLimitTimestamp } from '@/lib/validations/contact';
import { z } from 'zod';
import { debounce } from '@/utils/performance';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitRemaining, setRateLimitRemaining] = useState(0);

  const contactMutation = useContactForm();

  // Character counts for UX feedback
  const characterCounts = useMemo(() => ({
    name: formData.name.length,
    message: formData.message.length,
    subject: formData.subject?.length || 0,
  }), [formData]);

  // Reset form on successful submission
  useEffect(() => {
    if (contactMutation.isSuccess) {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTouched({});
    }
  }, [contactMutation.isSuccess]);

  // Debounced validation
  const validateField = useCallback(
    debounce((fieldName: keyof ContactFormData, value: string) => {
      try {
        const fieldSchema = contactFormSchema.shape[fieldName];
        fieldSchema.parse(value);
        setErrors(prev => ({ ...prev, [fieldName]: undefined }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(prev => ({ 
            ...prev, 
            [fieldName]: error.errors[0]?.message 
          }));
        }
      }
    }, 300),
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Check rate limiting
      const rateLimitCheck = checkRateLimit();
      if (!rateLimitCheck.allowed) {
        setIsRateLimited(true);
        setRateLimitRemaining(rateLimitCheck.remainingTime || 0);
        setTimeout(() => setIsRateLimited(false), rateLimitCheck.remainingTime! * 1000);
        return;
      }

      // Validate all fields
      const validatedData = contactFormSchema.parse(formData);
      
      // Create mailto URL with sanitized data
      const subject = validatedData.subject 
        ? encodeURIComponent(validatedData.subject) 
        : encodeURIComponent('Contact from Portfolio');
      const body = encodeURIComponent(
        `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`
      );
      const mailtoUrl = `mailto:praveen885127@gmail.com?subject=${subject}&body=${body}`;
      
      // Save to database first - convert to ContactFormData type
      const formDataToSubmit: ContactFormData = {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || '',
        message: validatedData.message,
      };
      await contactMutation.mutateAsync(formDataToSubmit);
      
      // Set rate limit timestamp
      setRateLimitTimestamp();
      
      // Open mailto after successful save
      window.location.href = mailtoUrl;
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        // Mark all fields as touched to show errors
        setTouched({
          name: true,
          email: true,
          message: true,
          subject: true,
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change if field was touched
    if (touched[name]) {
      validateField(name as keyof ContactFormData, value);
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName as keyof ContactFormData, formData[fieldName as keyof ContactFormData] as string);
  };

  const isFormValid = useMemo(() => {
    return formData.name && formData.email && formData.message && Object.keys(errors).length === 0;
  }, [formData, errors]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-4 sm:p-6 lg:p-8 space-y-6 w-full max-w-none"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-foreground">
          Send me a message
        </h3>
        <AnimatePresence>
          {contactMutation.isSuccess && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2 text-green-500"
            >
              <CheckCircleIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Sent!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rate Limit Warning */}
      <AnimatePresence>
        {isRateLimited && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3"
          >
            <ExclamationCircleIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-500">Please wait before sending another message</p>
              <p className="text-xs text-yellow-500/80 mt-1">
                You can submit again in {rateLimitRemaining} seconds
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name * <span className="text-xs text-muted-foreground">({characterCounts.name}/100)</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            className={`w-full px-4 py-3 bg-secondary/50 border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
              errors.name && touched.name
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-primary/20 focus:ring-primary/50 focus:border-primary/50'
            }`}
            placeholder="Your name"
            maxLength={100}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          <AnimatePresence>
            {errors.name && touched.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                id="name-error"
                className="text-xs text-red-500 flex items-center gap-1"
              >
                <ExclamationCircleIcon className="w-3 h-3" />
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-3 bg-secondary/50 border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
              errors.email && touched.email
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-primary/20 focus:ring-primary/50 focus:border-primary/50'
            }`}
            placeholder="your.email@example.com"
            maxLength={255}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          <AnimatePresence>
            {errors.email && touched.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                id="email-error"
                className="text-xs text-red-500 flex items-center gap-1"
              >
                <ExclamationCircleIcon className="w-3 h-3" />
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subject <span className="text-xs text-muted-foreground">(optional, {characterCounts.subject}/200)</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={() => handleBlur('subject')}
          className={`w-full px-4 py-3 bg-secondary/50 border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
            errors.subject && touched.subject
              ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
              : 'border-primary/20 focus:ring-primary/50 focus:border-primary/50'
          }`}
          placeholder="What's this about?"
          maxLength={200}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        <AnimatePresence>
          {errors.subject && touched.subject && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              id="subject-error"
              className="text-xs text-red-500 flex items-center gap-1"
            >
              <ExclamationCircleIcon className="w-3 h-3" />
              {errors.subject}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message * <span className="text-xs text-muted-foreground">({characterCounts.message}/2000)</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          onBlur={() => handleBlur('message')}
          className={`w-full px-4 py-3 bg-secondary/50 border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all resize-none ${
            errors.message && touched.message
              ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
              : 'border-primary/20 focus:ring-primary/50 focus:border-primary/50'
          }`}
          placeholder="Tell me about your project or just say hello..."
          maxLength={2000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        <AnimatePresence>
          {errors.message && touched.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              id="message-error"
              className="text-xs text-red-500 flex items-center gap-1"
            >
              <ExclamationCircleIcon className="w-3 h-3" />
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        disabled={contactMutation.isPending || isRateLimited || !isFormValid}
        whileHover={{ scale: (contactMutation.isPending || isRateLimited || !isFormValid) ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`btn-cosmic w-full flex items-center justify-center gap-2 ${
          (contactMutation.isPending || isRateLimited || !isFormValid) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-busy={contactMutation.isPending}
      >
        {contactMutation.isPending ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <PaperAirplaneIcon className="w-5 h-5" />
            <span>Send Message</span>
          </>
        )}
      </motion.button>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p>Your information is secure and will only be used to respond to your message.</p>
      </div>
    </motion.form>
  );
};

export default ContactForm;