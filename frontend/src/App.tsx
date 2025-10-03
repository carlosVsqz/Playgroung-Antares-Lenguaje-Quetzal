import './App.css'
import CodePlayground from "./components/playground/playground.tsx";

function App() {
  return (
    <main className="min-h-screen bg-[#0d1117] dark flex flex-col">
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col min-h-0">
        <div className="mb-6 flex flex-col md:flex-row items-center md:items-start gap-4">
          <div className="flex items-center justify-center">
            <img
              className="w-[200px] md:w-[300px] max-w-full"
              src="https://raw.githubusercontent.com/AntaresGT/lenguaje-quetzal/main/imagenes/logo_lenguaje_quetzal.png"
              alt="Logo Lenguaje Quetzal"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-balance text-[#e6edf3]">
              Patio de Juego Quetzal 🚀
            </h1>
            <p className="text-[#7d8590] text-sm md:text-base mt-2">
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

      <footer className="border-t border-[#30363d] bg-[#0d1117] mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-[#7d8590] text-center sm:text-left">
            <p className="mb-2 sm:mb-0">
              © 2025 Creado con ❤️ por <a href="http://escod.com.gt/" target="_blank" className="hover:text-[#e6edf3] transition-colors">escod.com.gt</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App