import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'

const PreviousNext = ({
    titleText,
    className='',
    handlePress,
    ...props
}) => {
  return (
    <View className='flex flex-row items-center justify-center'>
        <CustomButton className='w-8' title='<' handlePress={handlePress}/>
        <Text className='text-2xl text-center font-PTBold p-2 w-10/12'>{titleText}</Text>
        <CustomButton className='w-8' title='>' handlePress={handlePress}/>
    </View>
  )
}

export default PreviousNext