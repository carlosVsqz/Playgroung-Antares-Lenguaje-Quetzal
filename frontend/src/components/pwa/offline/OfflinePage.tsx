import React from 'react';

const OfflinePage: React.FC = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icono */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Sin conexión a internet
        </h1>

        {/* Descripción */}
        <p className="text-gray-600 mb-2">
          No podemos conectarnos a internet en este momento.
        </p>
        <p className="text-gray-600 mb-6">
          Por favor, verifica tu conexión y vuelve a intentarlo.
        </p>

        {/* Pasos de solución */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-blue-800 mb-2">¿Qué puedes hacer?</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Verifica tu conexión Wi-Fi o datos móviles</li>
            <li>• Reinicia tu router o módem</li>
            <li>• Desactiva y reactiva el modo avión</li>
            <li>• Intenta acceder más tarde</li>
          </ul>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Reintentar
          </button>

          <button
            onClick={handleGoHome}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Ir al inicio
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Mientras tanto, algunas funciones pueden no estar disponibles sin conexión.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;