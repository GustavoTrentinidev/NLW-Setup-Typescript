import { DaysTable } from './components/DaysTable'
import { Header } from './components/Header'
import './styles/global.css'
import './lib/dayjs'
// import { HabitComponent } from "./components/Habit"


function App() {

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header/>
        <DaysTable/>
      </div>
    </div>
  )
}

export default App
