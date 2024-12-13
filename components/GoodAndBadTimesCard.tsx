import { View, Text } from 'react-native'
import React from 'react'
import { format } from 'date-fns'

const GoodAndBadTimesCard = ({
  abhijit,
  amrit,
  brahma_muhurat,
  rahu_kaalam,
  yama_gandam,
  gulika_kalam,
}) => {
  return (
    <View className='bg-saffron rounded-lg  w-full h-66 shadow-sm shadow-dGray mt-8'>
      <Text className='font-PTBold text-2xl rounded-lg rounded-b-none text-center text-beige bg-gOrange'>Panchang</Text>
      <View className='flex flex-row'>
        <View className='h-20 w-1/2 border-b border-r border-white'>
        <Text className='font-PTBold text-lg text-beige p-2 text-center'>Amrit Kaal</Text>
        <Text className='font-PTBold text-sm text-beige text-center'>{`${format(amrit.starts_at, 'hh:mm aa')} to ${format(amrit.ends_at, 'hh:mm aa')}`}</Text>
        </View>

        <View className='h-20 w-1/2 border-b border-white'>
        <Text className='font-PTBold text-lg text-beige p-2 text-center'>Abhijit Kaal</Text>
        <Text className='font-PTBold text-sm text-beige text-center'>{`${format(abhijit.starts_at, 'hh:mm aa')} to ${format(abhijit.ends_at, 'hh:mm aa')}`}</Text>
        </View>
      </View>
      <View className='flex flex-row'>
        <View className='h-20 w-1/2 border-b border-r border-white'>
        <Text className='font-PTBold text-lg text-beige p-2 text-center'>Brahma Muhurat</Text>
        <Text className='font-PTBold text-sm text-beige text-center'>{`${format(brahma_muhurat.starts_at, 'hh:mm aa')} to ${format(brahma_muhurat.ends_at, 'hh:mm aa')}`}</Text>
        </View>

        <View className='h-20 w-1/2 border-b border-white'>
        <Text className='font-PTBold text-lg text-beige p-2 text-center'>Rahu Kaal</Text>
        <Text className='font-PTBold text-sm text-beige text-center'>{`${format(rahu_kaalam.starts_at, 'hh:mm aa')} to ${format(rahu_kaalam.ends_at, 'hh:mm aa')}`}</Text>
        </View>
      </View>
      <View className='flex flex-row'>
        <View className='h-20 w-1/2 border-r border-white'>
        <Text className='font-PTBold text-lg text-beige p-2 text-center'>Yama</Text>
        <Text className='font-PTBold text-sm text-beige text-center'>{`${format(yama_gandam.starts_at, 'hh:mm aa')} to ${format(yama_gandam.ends_at, 'hh:mm aa')}`}</Text>
        </View>

        <View className='h-20 w-1/2  border-white'>
        <Text className='font-PTBold text-lg text-beige p-2 text-center'>Gulika Kalam</Text>
        <Text className='font-PTBold text-sm text-beige text-center'>{`${format(gulika_kalam.starts_at, 'hh:mm aa')} to ${format(gulika_kalam.ends_at, 'hh:mm aa')}`}</Text>
        </View>
      </View>
      {/* <Text className='font-PTBold text-2xl text-beige text-center underline'>Good and bad times</Text>
      <Text className='font-PTBold text-lg text-beige p-2'>{`Amrit Kaal from ${format(amrit.starts_at, 'hh:mm aa')} to ${format(amrit.ends_at, 'hh:mm aa')}`}</Text>
      <Text className='font-PTBold text-lg text-beige p-2'>{`Abhijit Muhurat from ${format(abhijit.starts_at, 'hh:mm aa')} to ${format(abhijit.ends_at, 'hh:mm aa')}`}</Text>
      <Text className='font-PTBold text-lg text-beige p-2'>{`Brahma Muhurat from ${format(brahma_muhurat.starts_at, 'hh:mm aa')} to ${format(brahma_muhurat.ends_at, 'hh:mm aa')}`}</Text>
      <Text className='font-PTBold text-lg text-beige p-2'>{`Rahu Kaal from ${format(rahu_kaalam.starts_at, 'hh:mm aa')} to ${format(rahu_kaalam.ends_at, 'hh:mm aa')}`}</Text>
      <Text className='font-PTBold text-lg text-beige p-2'>{`Yama from ${format(yama_gandam.starts_at, 'hh:mm aa')} to ${format(yama_gandam.ends_at, 'hh:mm aa')}`}</Text>
      <Text className='font-PTBold text-lg text-beige p-2'>{`Gulika from ${format(gulika_kalam.starts_at, 'hh:mm aa')} to ${format(gulika_kalam.ends_at, 'hh:mm aa')}`}</Text> */}
    </View>
  )
}

export default GoodAndBadTimesCard