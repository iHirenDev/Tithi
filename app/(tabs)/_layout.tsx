import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import images from '../../constants/images'
import { format } from 'date-fns'

const TabIcon = ({icon, color, name, focused}) => {
    return(
      <View className='flex items-center justify-center pt-6'>
        <Image 
          source={icon}
          resizeMode='contain'
          tintColor={color}
          className='w-8 h-8 '
        />
        <Text className={`text-sm w-full ${focused ? 'font-PTBold text-[#F85325]' : 'font-PTRegular text-[#FB8A03]' }`}>{name}</Text>
      </View>
    )
  } 

const TabsLayout = () => {

  const dt = new Date()
  const today = format(dt, 'EEE MMM d')
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor:'#F85325',
        tabBarInactiveTintColor:'#FB8A03',
        tabBarShowLabel:false,
        tabBarStyle:{
          backgroundColor:'#F5F5DC',
          height:84,
        }
      }}
    >

        <Tabs.Screen 
              name='today'
              options={{
                title:new Date().toDateString(),
                headerShown:false,
                tabBarIcon:({color, focused}) => (
                  <TabIcon 
                    icon={images.calendar}
                    color={color}
                    name='Tithi'
                    focused={focused}
                  />
                )
              }}
            />

      <Tabs.Screen 
        name='home'
        options={{
          title:'Choghadiya',
          headerShown:false,
          tabBarIcon:({color, focused}) => (
            <TabIcon 
              icon={images.swastika}
              color={color}
              name='Choghadiya'
              focused={focused}
            />
          )
        }}
      />

      

      <Tabs.Screen 
              name='hora'
              options={{
                title:'Hora',
                headerShown:false,
                tabBarIcon:({color, focused}) => (
                  <TabIcon 
                    icon={images.hora}
                    color={color}
                    name='Hora'
                    focused={focused}
                  />
                )
              }}
            />

      <Tabs.Screen 
              name='match'
              options={{
                title:'Match Making',
                headerShown:false,
                tabBarIcon:({color, focused}) => (
                  <TabIcon 
                    icon={images.matchMaking}
                    color={color}
                    name='Match Making'
                    focused={focused}
                  />
                )
              }}
            />

    </Tabs>
  )
}

export default TabsLayout

