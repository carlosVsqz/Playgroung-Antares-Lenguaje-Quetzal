import './App.css'
import CodePlayground from "./components/playground/playground.tsx";

function App() {
  return (
    <main className="min-h-screen bg-[#0d1117] dark flex flex-col">
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center justify-center ">
            <img className="w-[300px]"
                 src="https://raw.githubusercontent.com/AntaresGT/lenguaje-quetzal/main/imagenes/logo_lenguaje_quetzal.png"
                 alt="defaultimg"/>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance text-[#e6edf3]">Patio de Juego Quetzal 🚀</h1>
            <p className="text-[#7d8590] text-base">El Patio de Juego Quetzal es un (playground) en ingles o entorno de
              desarrollo interactivo diseñado específicamente para experimentar con el Lenguaje Quetzal, un lenguaje de
              programación innovador. Su objetivo es permitir a desarrolladores, estudiantes y entusiastas explorar las
              características del lenguaje, escribir código y ver resultados en tiempo real, sin necesidad de configurar
              un entorno complejo.</p>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <CodePlayground/>
        </div>
      </div>

      <footer className="border-t border-[#30363d] bg-[#0d1117]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-[#7d8590]">
            <p>Creado con ❤️</p>
            <p>© 2025 <a href="http://escod.com.gt/" target="_blank">escodod.com.gt</a></p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
