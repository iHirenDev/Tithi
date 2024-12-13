import { View, Text } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';


const TodayCard = ({
    today,
    sunrise,
    sunset
}) => {
  return (
    <View className='bg-saffron w-full h-24 rounded-lg shadow-sm shadow-dGray'>
      <Text className='font-PTBold text-lg underline text-beige text-center'>{today}</Text>
      <View className='flex flex-row justify-between pt-2'>
        <View className='items-center'>
            <Feather name="sunrise" size={24} color="#FBCF6E" />
            <Text className='font-PTBold text-beige text-base'>{`Sunrise at: ${sunrise}`}</Text>
        </View>
        <View className='items-center'>
            <Feather name="sunset" size={24} color="#FBCF6E" />
            <Text className='font-PTBold text-beige text-base'>{`Sunset at: ${sunset}`}</Text>
        </View>
      </View>
    </View>
  )
}

export default TodayCard