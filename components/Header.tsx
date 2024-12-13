import { View, Text } from 'react-native'
import React from 'react'

const Header = ({
    title
}) => {
  return (
    <View className='bg-gOrange rounded-t-md -m-2'>
        <Text className='font-PTBold text-2xl p-2 mt-12 text-center text-beige'>{title}</Text>
    </View>
  )
}

export default Header