// src/components/NetworkBanner.tsx
import React from 'react';
import {useNetworkStatus} from "../../../hooks/useNetworkStatus.ts";

const NetworkBanner: React.FC = () => {
  const { isOnline, wasOffline } = useNetworkStatus();

  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-red-500 text-white py-3 px-4 text-center z-50">
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="font-medium">Sin conexión a internet</span>
        </div>
        <p className="text-sm mt-1 opacity-90">
          Algunas funciones pueden no estar disponibles
        </p>
      </div>
    );
  }

  if (wasOffline) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-3 px-4 text-center z-50 animate-slide-down">
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Conexión restaurada</span>
        </div>
      </div>
    );
  }

  return null;
};

export default NetworkBanner;