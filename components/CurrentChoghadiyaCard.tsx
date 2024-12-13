import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const CurrentChoghadiyaCard = ({
    current,
    next
}) => {
  return (
    <View className='flex flex-row items-center justify-around bg-saffron rounded-lg  w-full h-16 shadow-sm shadow-dGray mt-8 mb-8'>
      <View className=''>
        <Text className='font-PTBold text-lg underline text-beige'>Current Choghadiya</Text>
        <Text className='font-PTRegular text-base text-lightBeige'>{current}</Text>
      </View>
      <FontAwesome5 name="arrow-circle-right" size={28} color="#F5F5DC" />
      <View className=''>
      <Text className='font-PTBold text-lg underline text-beige'>Next Choghadiya</Text>
        <Text className='font-PTRegular text-base text-lightBeige'>{next}</Text>
      </View>
    </View>
  )
}

export default CurrentChoghadiyaCard