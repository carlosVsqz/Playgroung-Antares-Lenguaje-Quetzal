import './App.css'
import CodePlayground from "./components/playground/playground.tsx";
import {TooltipContent} from "@radix-ui/react-tooltip";
import {Tooltip, TooltipProvider, TooltipTrigger} from "./components/ui/tooltip.tsx";

function App() {
  return (
    <main className="h-screen bg-[#0d1117] dark flex flex-col overflow-hidden">
      <div className="container mx-auto px-3 py-2 flex-1 flex flex-col min-h-0">
        <div className="mb-2 flex flex-col sm:flex-row items-center sm:items-start gap-2">
          <div className="flex items-center justify-center">

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="/">
                    <img
                      className="w-[100px]"
                      src="https://raw.githubusercontent.com/AntaresGT/lenguaje-quetzal/main/imagenes/logo_lenguaje_quetzal.png"
                      alt="Logo Lenguaje Quetzal"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-[#161b22] border-[#30363d] text-[#e6edf3]">
                  <p className="text-sm mx-2">No nací para jaulas, nací para cielos abiertos. 💚🦜</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="container flex items-center justify-between">
              <h1 className="text-lg sm:text-xl md:text-2xl mr-3 font-bold text-[#e6edf3]">
                Patio de Juego Quetzal 🚀
              </h1>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://github.com/escod-com/Playgroung-Antares-Lenguaje-Quetzal.git" target="_blank"
                       rel="noopener noreferrer">
                      <div className="text-[#7d8590] hover:text-[#e6edf3] transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 sm:w-8 sm:h-8"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.25 1.84 1.25 1.07 1.83 2.81 1.31 3.5 1.01.11-.77.42-1.31.76-1.61-2.67-.3-5.46-1.34-5.46-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-.91-.1-1.87 0 0 1.01-.31 3.3 1.25.96-.27 2-.4 3.03-.4 1.03 0 2.06.13 3.02.4 2.3-1.56 3.3-1.25 3.3-1.25.44.96.02 1.57-.1 1.87.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.88-.01 3.28 0 .32.21.68.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </div>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="bg-[#161b22] border-[#30363d] text-[#e6edf3]">
                    <p className="text-sm mx-2">🙌 ¡Nos encantaría que nos acompañaras en este viaje!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-[#7d8590] text-shadow-md mt-1 hidden sm:block">
              El Patio de Juego Quetzal es un (playground) en inglés o entorno de
              desarrollo interactivo diseñado específicamente para experimentar con el
              <span className="wave-text ml-1">
                <a href="https://lenguaje-quetzal.antaresgt.com/introduccion/bienvenido/"
                   target="_blank">
                  Lenguaje Quetzal
                </a>
              </span>
              , un lenguaje de programación innovador. Su objetivo es permitir a desarrolladores,
              estudiantes y entusiastas explorar las características del lenguaje, escribir código
              y ver resultados en tiempo real, sin necesidad de configurar un entorno complejo.
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <CodePlayground/>
        </div>
      </div>

      <footer className="border-t border-[#30363d] bg-[#0d1117] py-1 flex-shrink-0">
        <div className="container mx-auto px-3">
          <div className="text-center">
            <p className="text-[10px] sm:text-xs text-[#7d8590]">
              © 2025 Creado con ❤️ por
              <a href="http://escod.com.gt/"
                 target="_blank"
                 className="ml-1 hover:text-[#e6edf3] transition-colors">
                escod.com.gt
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App