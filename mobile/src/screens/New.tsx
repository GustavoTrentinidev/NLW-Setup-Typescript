import { useState } from "react";
import { Alert, View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { BackButton } from '../components/BackButton'
import { CheckBox } from '../components/CheckBox'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { api } from "../lib/axios";


const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New(){
    const [weekDays, setWeekDays] = useState<number[]>([])
    const [title, setTitle] = useState('')


    async function handleCreateNewHabit() {
        try {
          if (!title.trim() || weekDays.length === 0) {
            return Alert.alert('Novo hábito', 'Informe o nome do hábito e escolha a periodicidade.')
          }
          
        await api.post('/habits', { title, weekDays })
        setTitle('');
        setWeekDays([]);
        Alert.alert('Novo hábito', 'Hábito criado com sucesso!');  
        
        } catch (error) {
          console.log(error)
          Alert.alert('Ops', 'Não foi possível criar o novo hábito')
        }
      }


    function handleToggleWeekDay(weekDayIndex: number){
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter(weekDay => weekDay != weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 20}}
            >
                <BackButton/>
                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual sua meta?
                </Text>

                <TextInput 
                    placeholder="ex.: Treinar, codar 3h/dia, etc." 
                    placeholderTextColor={colors.zinc[400]}
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-green-600 focus:border-2"
                    onChangeText={setTitle}    
                    value={title}
                />
                
                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>
                {
                    availableWeekDays.map((day, index)=>{
                        return <CheckBox 
                            key={day}
                            title={day} 
                            onPress={()=>{handleToggleWeekDay(index)}}
                            checked={weekDays.includes(index)}
                        />
                    })
                }
                <TouchableOpacity onPress={handleCreateNewHabit} activeOpacity={0.5} className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6">
                    <Feather name="check" color={colors.white} size={20}/>
                    <Text className="font-semibold text-base text-white ml-2">Confirmar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}