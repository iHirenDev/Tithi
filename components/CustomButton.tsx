import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({
    title,
    className='',
    textStyle='',
    handlePress,
    ...props
}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      className={`bg-saffron h-12 rounded-lg justify-center shadow-lg ${className}`}
      {...props}
      >
      <Text className={`font-PTBold text-lg text-white text-center ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton