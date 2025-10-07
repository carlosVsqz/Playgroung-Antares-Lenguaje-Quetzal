import React from 'react';
import {useNetworkStatus} from "../../../hooks/useNetworkStatus.ts";
import OfflinePage from "../offline/OfflinePage.tsx";

interface NetworkStatusProps {
  children: React.ReactNode;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({children}) => {
  const {isOnline, wasOffline} = useNetworkStatus();

  if (!isOnline) {
    return <OfflinePage/>;
  }

  return (
    <>
      {wasOffline && (
        <div
          className="fixed top-0 left-0 right-0 bg-green-500 text-white py-2 px-4 text-center z-50 animate-slide-down">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
            </svg>
            <span className="text-sm font-medium">Conexión restaurada</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default NetworkStatus;