import './App.css'
import Main from './components/Main'
import Records from './components/Records'
function App() {
  // Project:
  // 9 numbers
  // 
  return (
   <div className='relative flex justify-center items-center h-screen bg-zinc-800 font-mono overflow-hidden'>
     <Main/>
          
     <a href='https://ramdedomo.me' className="absolute bottom-0 hover:text-zinc-700 text-xs text-zinc-600 py-5" align="center">
        ©️ Ram Dedomo 2023
      </a>
   </div>
  )
}

export default App
