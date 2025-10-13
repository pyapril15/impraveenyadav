import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/outline';

const GoogleMap = () => {
  // Varanasi coordinates
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115313.38229435613!2d82.95171475820314!3d25.31668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x1e70c21c5b45c2c1!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1638234567890!5m2!1sen!2sin";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-2 rounded-xl overflow-hidden w-full"
    >
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px]">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg w-full h-full"
          title="Varanasi Location"
        />
        <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">Varanasi, UP</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GoogleMap;