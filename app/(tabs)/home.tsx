import { View, Text, Dimensions, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, SectionList } from 'react-native'
import React, {useState, useEffect} from 'react'
import {startOfWeek, endOfWeek, addDays, format, parse} from 'date-fns'
import {fetchChoghadiya} from '../../lib/choghadiya'
import {CustomButton, MyCustomSpinner, ChoghadiyaCard, Header} from '../../components'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Home = () => {

  const [width, setWidth] = useState(50)
  const [days, setDays] = useState([] as any)
  const [week, setWeek] = useState('')
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [choghadiyaDate, setChoghadiyaDate] = useState(new Date())
  const [choghadiya, setChoghadiya] = useState([] as any)

  const deviceWidth = Dimensions.get('window').width
  
  const today = new Date()
  const weekDays: string[] = []


  const headerDateFormate = (date:Date) => {
    return format(date, 'E MMM dd');
  }
  const dateFormate = (date:Date) => {
    return format(date, 'E d')
  }
  const fullDateFormate = (date:Date) => {
    return format(date,'dd MMM yyyy')
  }

  const weekStart = startOfWeek(today)
  const weekEnd = endOfWeek(today)
  
  
  const generateWeekDays = ({startOfWeek, endOfWeek}) => {
    
    console.log(`Start of the week:${startOfWeek}`);
    
    let day = startOfWeek
    while(day <= endOfWeek){
      weekDays.push(fullDateFormate(day))
      day = addDays(day,1)
    }
    setDays(weekDays)
  } 

  const generateWeek = ({weekStart, weekEnd}) => {
     setWeek(`${headerDateFormate(weekStart)} - ${headerDateFormate(weekEnd)}`)
  }

  const previousWeek = ({}) => {
    setLoading(true)
    setSelectedDay(6)
    const start = week.slice(0,10)
    
    const end = week.slice(12)
    
    const startDate = parse(start, 'EEE MMM d', new Date())
    const endDate = parse(end, 'EEE MMM d', new Date())
    

     const newStartDate = addDays(startDate,-7)
     const newEndDate = addDays(startDate,-1)
     

     generateWeek({weekStart:newStartDate, weekEnd:newEndDate})
     generateWeekDays({startOfWeek:newStartDate, endOfWeek:newEndDate})
     fetchChoghadiyaOfDate(newEndDate)
  }

  const nextWeek = () => {
    setLoading(true)
    setSelectedDay(0)
    const start = week.slice(0,10)
    
    const end = week.slice(12)
    
    const startDate = parse(start, 'EEE MMM d', new Date())
    const endDate = parse(end, 'EEE MMM d', new Date())
    

     const newStartDate = addDays(startDate,7)
     const newEndDate = addDays(startDate,13)
     

     generateWeek({weekStart:newStartDate, weekEnd:newEndDate})
     generateWeekDays({startOfWeek:newStartDate, endOfWeek:newEndDate})

     fetchChoghadiyaOfDate(newStartDate)
  }

  const fetchChoghadiyaOfDate = (date: Date) => {
    fetchChoghadiya({endPoint:'choghadiya-timings',
                     year:date.getFullYear(),
                     date:date.getDate(), 
                     month:date.getMonth()+1,
                     hour:date.getHours(),
                     minute:date.getMinutes(),
                     seconds:date.getSeconds()})
                     .then((res) => res.json())
                     .then((info) => {
                        let response = info;                        
                        let parsedOutput = JSON.parse(response.output);
                        let outputArray = Object.values(parsedOutput);

                        // Define number of Choghadiyas per period
                        const CHOGHADIYA_COUNT = 8;
                        let dayChoghadiya = outputArray.slice(0,CHOGHADIYA_COUNT)
                        
                        let nightChoghadiya = outputArray.slice(CHOGHADIYA_COUNT)

                        let dataArr = [
                          {
                            title:'🌞 Day Choghadiya',
                            data:dayChoghadiya
                          },
                          {
                            title:'🌚 Night Choghadiya',
                            data:nightChoghadiya
                          }
                        ]
                        
                        setChoghadiya(dataArr)
                        setLoading(false)   
                      } )
                      .catch((error) => {
                        console.error(`error:${error}`);
                        setChoghadiya([])
                        setLoading(false)
                      })
  }

  const daySelection = () => {
    
    // for(const day in weekDays){
      
    //   if(fullDateFormate(today) === weekDays[day]){
    //     return Number(day)
    //   }
    // }
    const index = weekDays.findIndex(day => fullDateFormate(today) === day);
    return index !== -1 ? index : 0;
  }


  useEffect(() => {
    const newWidth = deviceWidth/7
    setWidth(newWidth-2)  
    generateWeekDays({startOfWeek:weekStart, endOfWeek:weekEnd})
    generateWeek({weekStart:weekStart, weekEnd:weekEnd})
    setSelectedDay(daySelection())
    fetchChoghadiyaOfDate(today)
  }, [])

  function Item({ date, day, onPress, backgroundColor, textColor, borderColor }) {
    
    return (

      <View style={{ width: width }}>
        <TouchableOpacity
          onPress={onPress}
          className={`h-12 w-12 items-center justify-center rounded-full border-2`}
          style={[styles.item, backgroundColor, borderColor]}>
          <View>
            <Text className='font-PTBold text-center' style={textColor}>{date}</Text>
            <Text className='font-PTBold mr-1 mb-1' style={textColor}>{day}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

const handleItemPress = (item,index) => {
  setLoading(true)
  setSelectedDay(index)
  
  const date = parse(item,'dd MMM yyyy', new Date())
  fetchChoghadiyaOfDate(date)
};

const renderItem = ({ item, index }) => {
  
   const backgroundColor = index === selectedDay ? "#F96E46" : "#ffffff";
   const color = index === selectedDay ? 'white' : 'black';
   const borderColor = index === selectedDay ? 'white' : '#F85325'
   const date = item.slice(0,2)
   const day = item.slice(2,6)
   
  return (
    
    <Item
      date={date}
      day={day}
      onPress={() => {handleItemPress(item,index)}}
      backgroundColor={{ backgroundColor }}
      textColor={{ color }}
      borderColor={{borderColor}}
    />
  );
};

  return (
    <View className='flex-1'>
    <Header title='Choghadiya'/>
    <View className='p-2 mt-2'>
      <View className='flex flex-row items-center justify-center'>
          <CustomButton handlePress={previousWeek} className='w-8 shadow-sm shadow-saffron2 border-1 border-mistyRose' title='<'/>
          <Text className='text-center text-xl w-10/12 font-PTBold pb-2 pt-2'>{week}</Text>
          <CustomButton handlePress={nextWeek} className='w-8 shadow-sm shadow-saffron2 border-1 border-mistyRose' title='>'/>
      </View>

      <FlatList 
          className='w-full rounded-md shadow-2xl mt-2'
          data={days}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
          horizontal
        />
      </View>

    <View className='flex-1 items-center'>
    {loading ? 
          <View className=''>
            <MyCustomSpinner message='Fetching choghadiya'/>
          </View> :
          choghadiya.length === 0 ?
          <View className='flex-1 items-center justify-center'>
            <Text className='text-2xl font-PTBold'>Error fetching choghadiya</Text>
          </View> :
          <SectionList className='w-full shadow-2xl'
          sections={choghadiya}
          keyExtractor={(item,index) => item + index}
          renderItem={({item}) => (
            <ChoghadiyaCard 
                  
                  name={item.name}
                  start={item.starts_at}
                  end={item.ends_at}/>
          )}
          renderSectionHeader={({section:{title}})=>(
            <View className='bg-beige'>
              <Text className='text-lg font-PTBold'>{title}</Text>
            </View>
          )}
          // ListHeaderComponent={<View className='h-1'></View>}
        />
        }
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 2,
    // borderColor: '#4682B4',
  },
  title: {
    fontSize: 32,
  },
});

export default Home

