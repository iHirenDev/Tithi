import config from './config'

// export const fetchChoghadiya = async({
//     endPoint = '',
//     year = Number(),
//     month = Number(),
//     date = Number(),
//     hour = Number(),
//     minute = Number(),
//     seconds = Number(),

//   }) => {
//     console.log(`Choghadiya Date:${date}-${month}-${year}`);
    
//     return await fetch(`https://json.freeastrologyapi.com/${endPoint}`, {
//           method:'POST',
//           headers:{
//               'Content-Type': 'application/json',
//               'x-api-key': config.astrology_api_key,
//           },
//           body:JSON.stringify({
//           "year": year,
//           "month": month,
//           "date": date,
//           "hours": hour,
//           "minutes": minute,
//           "seconds": seconds,
//           "latitude": -32.7171,
//           "longitude": 152.1130,
//           "timezone": 11,
//           "config": {
//           "observation_point": "topocentric",
//           "ayanamsha": "lahiri"
//           }
//     })
//       })
        
//   }


  

//   TS CONVERSION


interface FetchChoghadiyaParams {
    endPoint?: string;
    year?: number;
    month?: number;
    date?: number;
    hour?: number;
    minute?: number;
    seconds?: number;
}

export const fetchChoghadiya = async ({
    endPoint = '',
    year = 0,
    month = 0,
    date = 0,
    hour = 0,
    minute = 0,
    seconds = 0,
}: FetchChoghadiyaParams): Promise<Response> => {
    console.log(`Choghadiya Date:${date}-${month}-${year}`);
    
    return await fetch(`https://json.freeastrologyapi.com/${endPoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.astrology_api_key as string,
        } as HeadersInit,
        body: JSON.stringify({
            "year": year,
            "month": month,
            "date": date,
            "hours": hour,
            "minutes": minute,
            "seconds": seconds,
            "latitude": -32.7171,
            "longitude": 152.1130,
            "timezone": 11,
            "config": {
                "observation_point": "topocentric",
                "ayanamsha": "lahiri"
            }
        })
    });
}




  