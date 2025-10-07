import {useRegisterSW} from 'virtual:pwa-register/react';

export function PWAUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(r) {
      console.log('SW Registered: ', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setNeedRefresh(false);
  };

  if (needRefresh) {
    return (
      <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded shadow-lg">
        <p>¡Nueva versión disponible!</p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => updateServiceWorker(true)}
            className="bg-green-500 px-3 py-1 rounded"
          >
            Actualizar
          </button>
          <button
            onClick={close}
            className="bg-gray-500 px-3 py-1 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return null;
}