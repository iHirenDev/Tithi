import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { format } from 'date-fns'

const ChoghadiyaCard = ({
    className='',
    name='',
    start='',
    end=''
}) => {

    const dateFormate = (date:Date) => {
        return format(date, 'hh:mm aa')
      }

    const choghadiyaType = (name) => {
      if(name === 'Amrit') {
        return 'Good'
    } else if(name === 'Shubh') {
        return 'Good'
    } else if(name === 'Labh') {
        return 'Good'
    } else if(name === 'Char') {
        return 'Neutral'
    } else if(name === 'Udveg') {
        return 'Bad'
    } else if(name === 'Kaal') {
      return 'Loss'
    } else if(name === 'Rog') {
      return 'Evil'
    }
  }
    
      const st = new Date(start)
      const et = new Date(end)
    
      const startTime = dateFormate(st)
      const endTime = dateFormate(et)

  return (
    <View className='bg-mistyRose h-10 flex flex-row items-center shadow-black mb-1'>
      <View className={`w-1/2 h-10 pl-1 mr-2 flex flex-row items-center justify-between rounded-r-sm bg-saffron`}>
        <Text className='text-base font-PTBold text-white'>{name}</Text>
        <View className='rounded-lg mr-2 h-6 w-20 text-center items-center justify-center border border-lightBeige'>
          <Text className='font-PTBold text-sm text-beige'>{choghadiyaType(name)}</Text>
        </View>
      </View>

      <View className='rounded-sm flex flex-row items-center'>
        <AntDesign  name="clockcircleo" size={20} color="black" />
        <Text className='text-base font-PTRegular ml-1'>{`${startTime} to ${endTime}`}</Text>
      </View>
    </View>
  )
}

export default ChoghadiyaCard