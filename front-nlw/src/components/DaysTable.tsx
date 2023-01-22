import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDaysFromYearBeginning } from "../utils/generate-days-from-year-beginning"
import { HabitDayComponent } from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDaysFromYearBeginning()

const minimunSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minimunSummaryDatesSize - summaryDates.length

type Summary = Array<{
    id: string,
    date: string,
    amount: number,
    completed: number,
}>

export function DaysTable(){
    const [ summary, setSummary ] = useState<Summary>([])

    useEffect(() => {
        api.get('summary').then(response=>{
            setSummary(response.data)
        })
    }, [])
    
    
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, index)=>{
                    return(
                        <div key={index} className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold ">
                            {weekDay}
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDates.length > 0 && summaryDates.map(date=>{
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day')
                    })

                    return <HabitDayComponent 
                            key={date.toString()}
                            date={date}
                            amount={dayInSummary?.amount} 
                            defaultCompleted={dayInSummary?.completed} 
                            />
                    })
                }

                {amountOfDaysToFill > 0 ? Array.from({length: amountOfDaysToFill}).map((_,i)=>{
                    return <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
                }) : null}
            </div>
        </div>
    )
}