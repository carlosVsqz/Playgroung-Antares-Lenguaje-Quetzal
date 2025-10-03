import './App.css'
import CodePlayground from "./components/playground/playground.tsx";

function App() {
  return (
    <main className="h-screen bg-[#0d1117] dark flex flex-col overflow-hidden">
      <div className="container mx-auto px-3 py-2 flex-1 flex flex-col min-h-0">
        <div className="mb-2 flex flex-col sm:flex-row items-center sm:items-start gap-2">
          <div className="flex items-center justify-center">
            <img
              className="w-[100px]"
              src="https://raw.githubusercontent.com/AntaresGT/lenguaje-quetzal/main/imagenes/logo_lenguaje_quetzal.png"
              alt="Logo Lenguaje Quetzal"
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#e6edf3]">
              Patio de Juego Quetzal 🚀
            </h1>
            <p className="text-[#7d8590] text-xs mt-1 hidden sm:block">
              El Patio de Juego Quetzal es un (playground) en inglés o entorno de
              desarrollo interactivo diseñado específicamente para experimentar con el Lenguaje Quetzal,
              un lenguaje de programación innovador. Su objetivo es permitir a desarrolladores,
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
              © 2025 Creado con ❤️ por <a href="http://escod.com.gt/" target="_blank" className="hover:text-[#e6edf3] transition-colors">escod.com.gt</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App