import * as Checkbox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { Check } from 'phosphor-react'
import { useEffect } from 'react'

import { useState } from 'react'

import { api } from '../lib/axios'

interface HabitsListProps{
    date: Date,
    onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
    habitsInDateQueried: {
      id: string;
      title: string;
      created_at: string
    }[]
    completedHabits: string[]
}

export function HabitsList({onCompletedChanged, date}: HabitsListProps){

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    async function handleToggleHabit(habitId: string) {
        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)
        await api.patch(`/habits/${habitId}/toggle`)

        let completedHabits: string[] = []
        if(isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabitsInfo({
            habitsInDateQueried: habitsInfo!.habitsInDateQueried,
            completedHabits
        })
        onCompletedChanged(completedHabits.length)
    
    }

    useEffect(() => {
        api.get('day', {
          params:{
            date: date.toISOString()
          }
        }).then(response => {
          setHabitsInfo(response.data)
        })
      },[])

    return (
        <div className='mt-6 flex flex-col gap-3'>

            {
                habitsInfo?.habitsInDateQueried.map(habit=>{
                    return (
                        <Checkbox.Root 
                            key={habit.id}
                            className='flex items-center group'
                            checked={habitsInfo.completedHabits.includes(habit.id)}   
                            onCheckedChange={() => handleToggleHabit(habit.id)}
                            disabled={isDateInPast} 
                        >
                            
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 
                                group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                                <Checkbox.Indicator>
                                    <Check size={20} className='text-white'/>                      
                                </Checkbox.Indicator>
                            </div>

                            <span className='font-semibold ml-2 text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                                {habit.title}
                            </span>
                        
                        </Checkbox.Root>
                    )
                })
            }

        </div>
    )
}