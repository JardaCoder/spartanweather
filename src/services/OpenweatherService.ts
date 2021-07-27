import {openWeatherKey } from "./utils/keys";
import axios, { AxiosResponse } from 'axios';
import { OneCallResponse, WeatherResponse} from "../models/Weather";

var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
var baseUrlOneCall= 'https://api.openweathermap.org/data/2.5/onecall?'

const getWeather = async (latitude : number, longitude : number): Promise<AxiosResponse<WeatherResponse>> =>{
    return await axios.get<WeatherResponse>(baseUrl + formatParams(latitude, longitude)); 
}

const getListWeather = async (latitude : number, longitude : number): Promise<AxiosResponse<OneCallResponse>> =>{
    return await axios.get<OneCallResponse>(baseUrlOneCall + formatOneCallParams(latitude, longitude)); 
}

const getIconUrl = (icon : string): string =>{
    return `http://openweathermap.org/img/wn/${icon}@2x.png`  
}

const formatParams = (latitude : number, longitude : number ) =>{
    return `lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}&lang=pt_br&units=metric`
}

const formatOneCallParams = (latitude : number, longitude : number ) =>{
    return `lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts,current&appid=${openWeatherKey}&lang=pt_br&units=metric`
}



export default {
    getWeather : getWeather,
    getListWeather: getListWeather,
    getIconUrl:getIconUrl
}