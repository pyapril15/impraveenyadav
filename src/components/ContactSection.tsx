import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  MapPinIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { usePersonalInfo } from '@/hooks/usePortfolioData';
import ContactForm from './ContactForm';

const ContactSection = () => {
  const { data: personalInfo } = usePersonalInfo();

  const contactMethods = [
    {
      icon: MapPinIcon,
      label: 'Location',
      value: personalInfo?.location,
      href: undefined,
    },
  ].filter(method => method.value); // Only show methods with values

  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo?.github_url,
      icon: '🐙',
    },
    {
      name: 'LinkedIn',
      url: personalInfo?.linkedin_url,
      icon: '💼',
    },
    {
      name: 'Portfolio',
      url: personalInfo?.portfolio_url,
      icon: '🌐',
    },
  ].filter(link => link.url);

  return (
    <section className="py-20 bg-nebula-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-cosmic-gradient bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a chat about technology and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Connect With Me
            </h3>
            
            {/* Contact Methods - Only show if available */}
            {contactMethods.length > 0 && (
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  const content = (
                    <div className="flex items-center gap-4 p-4 glass-card hover-lift transition-all duration-300">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{method.label}</p>
                        <p className="text-foreground font-medium">{method.value}</p>
                      </div>
                    </div>
                  );

                  return (
                    <motion.div
                      key={method.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      {method.href ? (
                        <a href={method.href} className="block">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="pt-6">
                <h4 className="text-lg font-medium text-foreground mb-4">
                  Connect on Social
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="p-3 glass-card hover-lift text-2xl transition-all duration-300 hover:text-primary"
                      title={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Download */}
            {personalInfo?.resume_url && (
              <div className="pt-6">
                <motion.a
                  href={personalInfo.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-glass inline-flex items-center gap-2"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span>Download Resume</span>
                </motion.a>
              </div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;