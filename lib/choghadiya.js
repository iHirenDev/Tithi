import config from './config'

export const fetchChoghadiya = async({
    endPoint = '',
    year = Number(),
    month = Number(),
    date = Number(),
    hour = Number(),
    minute = Number(),
    seconds = Number(),

  }) => {
    console.log(`Choghadiya Date:${date}-${month}-${year}`);
    
    return await fetch(`https://json.freeastrologyapi.com/${endPoint}`, {
          method:'POST',
          headers:{
              'Content-Type': 'application/json',
              'x-api-key': config.astrology_api_key,
          },
          body:JSON.stringify({
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
      })
      
      // .then(response => response.json())
      //   .then(res => {
      //       let response = res;
      //       // Step 1: Parse the output field to an object
      //       let parsedOutput = JSON.parse(response.output);
  
      //       // Step 2: Convert the parsed object values to an array
      //       let outputArray = Object.values(parsedOutput);
  
      //       // Step 3: Replace the original output with the array
      //       response.output = outputArray;
      //       return response.output;
      //       //return console.log(response.output[3].name)
      //   })
      //   .catch(err => console.log(`Error getting choghadiya:${err}`))
        
  }