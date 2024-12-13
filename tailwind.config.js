/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width:{
        'small-card':'48%'
      },
      colors:{
        primary:'#077244FF',
        secondary:'#FB8A03',
        saffron: '#FF9933',
        gold: '#FFD700',
        maroon: '#800000',
        deepBlue: '#4682B4',
        uranianBlue:'#B5E2FA',
        beige: '#F5F5DC',
        earthyBrown: '#8B4513',
        jasmine:'#FBCF6E',
        sunset:'#FCD695',
        mistyRose:'#FFE3E3',
        saffron2:'#F9C846',
        gOrange:'#F85325',
        dGray:'#545863',
        electricBlue:'#00E8FC',
        burntSienna:'#F96E46',
        sandyBrown:'#F99B46',
        hunyadiYellow:'#F9B246',
        lightOrange:'#FFA500',
        coral:'#FF7F50',
        // Inactive date: #C0E4ED, #76D7C4
        // Borders - Accent colors --> #F8C8DC, #FAD9A1
        accBlue:'#003366',
        navyBlue:'#4B9CD3',
        //Background 
        lightCream:'#FDF4E3',
        lightBeige:'#F4F1EC',
        // For text --> #666666, #444444
        //For amrit or good --> #F2C94C, #F1C232
        // For night choghadiya --> #2C3E50, #3A2F54
      },
      fontFamily:{
        PTBold:['PTSerif-Bold','sans-serif'],
        PTRegular:['PTSerif-Regular','sans-serif']
      }
    },
  },
  plugins: [],
}

