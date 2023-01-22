import { View, Text, ScrollView, Alert} from "react-native";
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { daySize, HabitDay } from '../components/HabitDay'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useState, useEffect, useCallback } from "react";
import dayjs from 'dayjs'


import { api } from '../lib/axios'

import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'


const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimunSummaryDatesSizes = 13 * 7
const amountOfDaysToFill = minimunSummaryDatesSizes - datesFromYearStart.length

type SummaryProps = {
    id: string,
    date: string,
    amount: number,
    completed: number,
}[]

export function Home(){
    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState<SummaryProps | null>(null)
    const { navigate } = useNavigation()
    

    async function fetchData() {
        try {
          setLoading(true)
          const response = await api.get('/summary');
          setSummary(response.data)
          console.log(summary)
        } catch (error) {
          Alert.alert('Vish', 'Não foi possível carregar o App.')
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      useFocusEffect(useCallback(()=>{
        fetchData()
      }, []))

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header/>
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, index)=>{
                        return(
                        <Text 
                            key={index} 
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{width: daySize, height: daySize}}
                        >
                            {weekDay}
                        </Text> 
                    )})
                }
            </View>
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 20}}
            >
                {
                    summary &&
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date=>{
                            
                            const dayWithHabits = summary.find(day=>{
                                return dayjs(date).isSame(day.date, 'day')
                            })
                        

                            return <HabitDay 
                                    key={date.toISOString()}
                                    date={date}
                                    amountOfHabits={dayWithHabits?.amount}
                                    amountCompleted={dayWithHabits?.completed}
                                    onPress={() => navigate('Habit', {date: date.toISOString()})}    
                                />
                        })
                    }

                    {
                        amountOfDaysToFill > 0 && Array
                        .from({length: amountOfDaysToFill})
                        .map((_,index)=>{
                            return <View 
                                key={index}    
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                style={{width: daySize, height: daySize}}
                            />
                        })
                    }
                </View>
                }
            </ScrollView>
        </View>
    )
}