import { Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useState } from 'react'
import { api } from '../lib/axios'


const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
]

export function NewHabitForm(){
    const [title, setTitle] = useState('')
    const [ weekDays, setWeekDays ] = useState<number[]>([])

    async function createNewHabit(e: FormEvent){
        e.preventDefault()
        if(!title || weekDays.length === 0) {
            return
        }
        await api.post('habits', {
            title,
            weekDays
        })
        setTitle('')
        setWeekDays([])

        alert('Hábito criado com sucesso!')
    }
    
    function handleToggleWeekDay(weekDay: number) {
        if(weekDays.includes(weekDay)) {
          const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
          setWeekDays(weekDaysWithRemovedOne)
        } else {
          const weekDaysWithAddedOne = [...weekDays, weekDay]
          setWeekDays(weekDaysWithAddedOne)
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual sua meta?
            </label>
            <input type="text" id="title" placeholder="ex.: Treinar, codar 3h/dia, etc..." autoFocus
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 transition-colors 
                focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
                onChange={event=>setTitle(event.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-2">
                Qual a recorrência?
            </label>

            <div className='flex flex-col gap-2 mt-3'>

                {
                    availableWeekDays.map((day,index)=>{
                        return (
                            <Checkbox.Root 
                                key={day} 
                                className='flex items-center group'
                                onCheckedChange={()=>{handleToggleWeekDay(index)}}
                            >
                                <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 
                                    group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors'>
                                    <Checkbox.Indicator>
                                        <Check size={20} className='text-white'/>                      
                                    </Checkbox.Indicator>
                                </div>

                                <span className='ml-2 text-white leading-tight'>
                                    {day}
                                </span>
                            
                            </Checkbox.Root>
                        )
                    })
                }

            </div>


            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
              <Check size={20} weight="bold"/>
              Confirmar
            </button>
        </form>
    )
}