import React, { useState } from 'react'
import "./WeatherApp.css"
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

const WeatherApp =  () => {
  let api_key='aa773488447041f6b6fce7ac217325c2'
  const [wicon,setWicon]=useState(wind_icon)
  const [tempval ,setTempVal]=useState(0)
  const [ humidity , setHumidity]=useState(0)
  const [ windVal, setWindVal]=useState(0)
  const [locationVal ,setLocationVal] =useState('Serach City')
  const [isLoading , setIsLoading]=useState(null)
  const [IsData ,setIsdata]=useState(false)
  const [IsError , setIsError]=useState(false)
  const [errorMsg,setErrorMsg]=useState('')

  const searchHandler = async() => {
    setIsError(false)
    const cityInput=document.getElementsByClassName("cityInput")
    console.log(cityInput[0].value,"CI")
    setIsLoading(true)
    setIsdata(false)
    if (cityInput[0].value===''){
      setIsLoading(false)
      setErrorMsg("Please Enter a City Name ")
      setIsError(true)
      return 0
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityInput[0].value}&units=metric&appid=${api_key}`
    
    try {
      let response = await fetch(url);

      if (!response.ok){
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      let data= await response.json();
      let temp_val=data.main.temp
      setHumidity(data.main.humidity)
      setWindVal(data.wind.speed)
      setTempVal(Math.trunc(data.main.temp))
      setLocationVal(data.name)

      if(data.weather[0].icon ==='01d' || data.weather[0].icon==="01n"){
        setWicon(clear_icon)
      }
      else if(data.weather[0].icon ==='02d' || data.weather[0].icon==="02n"){
        setWicon(cloud_icon)
      }
      else if(data.weather[0].icon ==='03d' || data.weather[0].icon==="03n"){
        setWicon(drizzle_icon)
      }
      else if(data.weather[0].icon ==='04d' || data.weather[0].icon==="04n"){
        setWicon(drizzle_icon)
      }
      else if(data.weather[0].icon ==='09d' || data.weather[0].icon==="09n"){
        setWicon(rain_icon)
      }
      else if(data.weather[0].icon ==='10d' || data.weather[0].icon==="10n"){
        setWicon(rain_icon)
      }
      else if(data.weather[0].icon ==='13d' || data.weather[0].icon==="13n"){
        setWicon(snow_icon)
      }else{
        setWicon(clear_icon)
      }
      setIsError(false)
      setIsdata(true)
      setIsLoading(false)


    }catch(error){
      setIsLoading(false)
      console.log(error.message)

      setErrorMsg('Invalid City Name')

      setIsError(true)
    }
  }
      
  

  return (
    <div className='container'>
       <div className='top-bar'>
        <div className='input-wrapper'>
          <input type='text' className='cityInput' placeholder='Search City Name' />
        </div>
         <div className='search-icon' onClick={searchHandler}>
           <img src={search_icon} alt="" />
         </div>
       </div>
       {IsError && <p className='error-msg'>{errorMsg}</p>}
     {isLoading && <div className='loader-div'><div className="custom-loader"></div> </div>}
     { IsData && (
       <div>
       <div className='weather-image'>
         <img src={wicon} alt="" />
       </div>
       <div className='weather-temp'>{tempval}°C</div>
       <div className='weather-location'>{locationVal}</div>
       <div className='data-container'>
         <div className='element'>
           <img src={humidity_icon} alt="" className='icon' />
           <div className='data'>
             <div className='humidity-percent'>{humidity}%</div>
             <div className='text'>Humidity</div>
           </div>
         </div>
         <div className='element'>
           <img src={wind_icon} alt="" className='icon' />
           <div className='data'>
             <div className='wind-rate'>{windVal}km/h</div>
             <div className='text'>Win Speed</div>
           </div>
         </div>
       </div>
     </div>
   ) }
    </div>
  )
}

export default WeatherApp;