import React from "react";
import { RefreshCw } from "lucide-react";

/**
 * A simple loading indicator component for festival data.
 */
const LoadingState: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 flex items-center gap-3">
        <RefreshCw className="w-5 h-5 animate-spin text-orange-500" />
        <span className="text-sm text-gray-600">Loading festivals...</span>
      </div>
    </div>
  );
};

export default LoadingState;
