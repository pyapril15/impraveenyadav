// src/components/modals/CertificationModal.tsx

import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AcademicCapIcon,
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface Certification {
  id: string;
  name: string;
  organization: string;
  date: string;
  description: string;
  link?: string;
}

interface CertificationModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificationModal = ({
  certification,
  isOpen,
  onClose,
}: CertificationModalProps) => {
  if (!certification) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card">
        <DialogHeader>
          {/* Modal Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold bg-cosmic-gradient bg-clip-text text-transparent">
                {certification.name}
              </DialogTitle>
              <DialogDescription className="text-primary font-medium">
                {certification.organization}
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Certification Details Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 p-4 glass-card bg-primary/5"
          >
            <div className="p-3 bg-primary/10 rounded-xl">
              <AcademicCapIcon className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">
                Certification Details
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <CalendarIcon className="w-4 h-4" />
                <span>Earned on {certification.date}</span>
              </div>
            </div>
          </motion.div>

          {/* Description Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              About This Certification
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {certification.description}
            </p>
          </div>

          {/* Issuing Organization and Date Earned */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <h5 className="font-semibold text-foreground mb-2">
                Issuing Organization
              </h5>
              <p className="text-primary font-medium">
                {certification.organization}
              </p>
            </div>
            <div className="glass-card p-4">
              <h5 className="font-semibold text-foreground mb-2">
                Date Earned
              </h5>
              <p className="text-muted-foreground">{certification.date}</p>
            </div>
          </div>

          {/* Skills Validated Section */}
          <div className="glass-card p-4 border-l-4 border-primary">
            <h5 className="font-semibold text-foreground mb-2">
              Skills Validated
            </h5>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This certification validates expertise and knowledge in the
              specified domain, demonstrating proficiency through rigorous
              assessment and practical application.
            </p>
          </div>

          {/* Action Button to View Certificate */}
          {certification.link && (
            <div className="pt-2">
              <a
                href={certification.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cosmic w-full flex items-center justify-center gap-2"
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                <span>View Certificate</span>
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificationModal;
