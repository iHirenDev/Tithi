import { View, Text } from 'react-native'
import React,{useEffect, useState} from 'react'
import {startOfWeek, endOfWeek, addDays, format, parseISO, toDate, parse, set} from 'date-fns'
import {fetchChoghadiya} from '../../lib/choghadiya'
import {sunriseAndSunsetTimes} from '../../lib/sunriseSunset'
import {CustomButton,GoodAndBadTimesCard, MyCustomSpinner, ChoghadiyaCard, PreviousNext, CurrentChoghadiyaCard, TodayCard, Header} from '../../components'
import Feather from '@expo/vector-icons/Feather';

const Today = () => {

  const [loading, setLoading] = useState(true)
  const [nakshatraStartTime,setNakshatraStartTime] = useState(new Date())
  const [nakshatraEndTime,setNakshatraEndTime] = useState(new Date())
  const [nakshatraName, setNakshatraName] = useState('')
  const [yoga,setYoga] = useState([] as any)
  const [currentChoghadiya, setCurrentChoghadiya] = useState('');
  const [nextChoghadiya, setNextChoghadiya] = useState('');
  const [sunrise, setSunrise] = useState('')
  const [sunset, setSunset] = useState('')
  const [goodAndBadTimes, setGoodAndBadTimes] = useState({} as any)
  const today = new Date()

  const timeFormate = (date:Date) => {
    return format(date,'dd MMM hh:mm aa')
  }


  const choghadiyaMethod = (response: any) => {
    const keys = Object.keys(response);
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const choghadiya = response[key];
  
      const choghadiyaStartTime = new Date(choghadiya.starts_at);
      const choghadiyaEndTime = new Date(choghadiya.ends_at);
  
      if (today >= choghadiyaStartTime && today <= choghadiyaEndTime) {
        setCurrentChoghadiya(choghadiya.name);
  
        const nextKey = keys[i + 1]; // Get the key for the next Choghadiya
        if (nextKey) {
          const nextChoghadiya = response[nextKey];
          setNextChoghadiya(nextChoghadiya.name);
        } else {
          // If there is no next Choghadiya (e.g., it's the last one)
          setNextChoghadiya("No next Choghadiya");
        }
        break;
      }
    }
  };
  

  const yogaDurationMethod = (response:any) => {
    
    const yogaArray = Object.values(response);
    setYoga(yogaArray);
    
    // Check if yogaArray has items before accessing
    if (yogaArray.length > 0) {
        setLoading(false)
        console.log(`First yoga: ${yogaArray}`);
    } else {
        console.log("Yoga data is empty or incomplete.");
    }
    
  }

  const nakshatraDurationMethod = (response:any) => {
   
   const startTime = new Date(response.starts_at)
   const endTime = new Date(response.ends_at)
   setNakshatraName(response.name)
   setNakshatraStartTime(startTime)
   setNakshatraEndTime(endTime)
   setLoading(false)
  }

  const goodAndBadTimesMethod = (response: any) => {
    setGoodAndBadTimes(response)
    setLoading(false)
  }

  const fetchSunriseSunsetTimes = () => {
    sunriseAndSunsetTimes()
            .then(res => res.json())
            .then(data => {
              const sr = String(data.results.sunrise)
              const ss = String(data.results.sunset)
              const formatString = 'hh:mm:ss a'
              const sunriseDate = parse(sr, formatString, new Date())
              const sunsetDate = parse(ss, formatString, new Date())
              
              setSunrise(format(sunriseDate,'hh:mm aa'))
              setSunset(format(sunsetDate,'hh:mm aa'))
            })
            .catch(error => console.log(`Error fetching data.`)
            )
  }

  const fetchChoghadiyaOfDate = (date: Date, endPoint:String) => {

    fetchChoghadiya({endPoint:`${endPoint}`,
                     year:date.getFullYear(),
                     date:date.getDate(), 
                     month:date.getMonth()+1,
                     hour:date.getHours(),
                     minute:date.getMinutes(),
                     seconds:date.getSeconds()})
                     .then((res) => res.json())
                     .then((info) => {
                        let response = info; 
                        if(endPoint === 'good-bad-times') {
                            const parsedData = {
                              abhijit_data:JSON.parse(response.abhijit_data),
                              amrit_kaal_data:JSON.parse(response.amrit_kaal_data),
                              brahma_muhurat_data:JSON.parse(response.brahma_muhurat_data),
                              rahu_kaalam_data:JSON.parse(response.rahu_kaalam_data),
                              yama_gandam_data:JSON.parse(response.yama_gandam_data),
                              gulika_kalam_data:JSON.parse(response.gulika_kalam_data)
                            }
                            setGoodAndBadTimes(parsedData)
                        }
                                               
                        let parsedOutput;
                        try {
                            parsedOutput = typeof response.output === "string" ? JSON.parse(response.output) : response.output;
                        } catch (error) {
                            console.error("Error parsing JSON:", error);
                            return; // Exit the function if parsing fails
                        }
                        
                        // let parsedOutput = JSON.parse(response.output);
                        let outputArray = Object.values(parsedOutput) as any;
                        
                        if (endPoint === 'choghadiya-timings') {
                          console.log(`Choghadiya RES:${JSON.stringify(outputArray)}`);
                          
                          choghadiyaMethod(outputArray);
                        } else if (endPoint === 'yoga-durations') {
                          
                          yogaDurationMethod(parsedOutput);
                        } else if (endPoint === 'nakshatra-durations') {
                          
                          nakshatraDurationMethod(parsedOutput);
                        } 
                      } )
                      .catch(error => console.log(`Error fetching data.`))
  }

  useEffect(() => {
    fetchSunriseSunsetTimes()
    fetchChoghadiyaOfDate(today,'choghadiya-timings')
    fetchChoghadiyaOfDate(today,'yoga-durations')
    fetchChoghadiyaOfDate(today,'nakshatra-durations')
    fetchChoghadiyaOfDate(today,'good-bad-times')
  }, [])
  

  return (
    loading ? <MyCustomSpinner message=''/> :
    <View className='p-2 bg-gray-200 h-full'>
      <View>
        {/* <View className='bg-gOrange rounded-t-md -m-2'>
          <Text className='font-PTBold text-2xl p-2 mt-12 text-center text-beige'>{format(today,'EEEE MMM dd, yyyy')}</Text>
        </View> */}
        <Header title={format(today,'EEEE MMM dd, yyyy')}/>
        <View className='flex flex-row justify-between mt-8'>
          {/* Row for sunrise and sunset cards */}
          <View className='w-small-card h-16 bg-saffron flex items-center justify-evenly mt-2 rounded-lg shadow-sm shadow-dGray'>
            <Feather name="sunrise" size={24} color="#FBCF6E" />
            <Text className='font-PTBold text-beige text-base'>{`Sunrise at: ${sunrise}`}</Text>
          </View>
          <View className='w-small-card h-16 bg-gray-400 flex items-center justify-evenly rounded-lg mt-2 shadow-sm shadow-dGray'>
            <Feather name="sunset" size={24} color="#545863" />
            <Text className='font-PTBold text-beige text-base'>{`Sunset at: ${sunset}`}</Text>
          </View>
        </View>
        {/* <TodayCard sunrise={sunrise} sunset={sunset} today={format(today,'EEEE MMM dd, yyyy')}/> */}

        <CurrentChoghadiyaCard current={currentChoghadiya} next={nextChoghadiya}/>
        {/* <Text className='font-PTBold text-2xl p-2'>{`Current choghadiya: ${currentChoghadiya}`}</Text> */}
        
        <View className='flex flex-row justify-between shadow-sm shadow-dGray'>
          <View className='bg-saffron rounded-lg h-32 w-small-card'>
            <Text className='font-PTBold text-2xl text-beige text-center underline'>Nakshatra</Text>
            <Text className='font-PTRegular text-sm text-beige text-center mt-3'>{nakshatraName}</Text>
       

            <Text className='font-PTRegular text-sm text-beige text-center'>{`${format(nakshatraStartTime,'hh:mm aa')} to ${format(nakshatraEndTime,'hh:mm aa')}`}</Text>
          </View>
          <View className='bg-saffron rounded-lg h-32 w-small-card'>
            <Text className='font-PTBold text-2xl text-center text-beige underline mb-3'>Yoga</Text>
            
            <Text className='font-PTRegular text-sm text-beige text-center'>{`${yoga[0] ? yoga[0].name : ''} until ${yoga[0] ? format(yoga[0].completion,'hh:mm aa') : ''}`}</Text>
            <Text className='font-PTRegular text-sm text-beige text-center'>{`${yoga[1] ? yoga[1].name : ''} until ${yoga[1] ? format(yoga[1].completion,'hh:mm aa') : ''}`}</Text>

            {/* <Text className='font-PTBold text-base text-center'>{`${yoga[0].name} until ${format(yoga[0].completion,'hh:mm aa')}`}</Text>
            <Text className='font-PTBold text-base text-center'>{`${yoga[1].name} until ${format(yoga[1].completion,'hh:mm aa')}`}</Text> */}
          </View>
        </View>

      </View>
      {/* Card below for good and bad times of the day */}
      <GoodAndBadTimesCard 
        amrit={goodAndBadTimes.amrit_kaal_data}
        abhijit={goodAndBadTimes.abhijit_data}
        yama_gandam={goodAndBadTimes.yama_gandam_data}  
        rahu_kaalam={goodAndBadTimes.rahu_kaalam_data}
        gulika_kalam={goodAndBadTimes.gulika_kalam_data}
        brahma_muhurat={goodAndBadTimes.brahma_muhurat_data}/>
    </View>
  )
}

export default Today