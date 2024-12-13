export const sunriseAndSunsetTimes = async() => {
    const latitude = -32.72014
    const longitude = 152.10846
    const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`

    return await fetch(url)
        
}