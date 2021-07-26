import AsyncStorage from "@react-native-async-storage/async-storage"
import { MyCity } from "../models/MyCity";
import { Prediction } from "../models/PlacesInterface";

const addCity = async (city : MyCity): Promise<void> =>{

    try {
        let cities = await listCities();
        if(cities){
            let existingCity = cities?.find(c => c.placeId == city.placeId);
            if(!existingCity){
                cities.push(city);
                saveCities(cities);
            }
        } else{
           
            cities = [] as MyCity[];
            cities.push(city);
            saveCities(cities);
        }
    } catch (error) {
        console.log(error)
    }
   
}

const removeCity = async (city : MyCity) =>{
    
    try {
        let cities = await listCities();

        if(cities){
            let index = cities?.findIndex(c => c.placeId == city.placeId);
            if(index >= 0){
                cities.splice(index, 1); 
                saveCities(cities);
            }
        }
        
    } catch (error) {
        console.log(error)
    }    
}

const changeFavorite = async (placeId : string) =>{
    try {
        let cities = await listCities();

        if(cities){
            let index = cities?.findIndex(c => c.placeId == placeId);
            if(index >= 0){
                cities[index].favorito = !cities[index].favorito ? true : false;
                saveCities(cities);
            }
        }
        
    } catch (error) {
        console.log(error)
    }    
}

const listCities = async (): Promise<MyCity[] | undefined> =>{

    let cities = await AsyncStorage.getItem('@spartanWeather:Cities');

    if(cities){
        return JSON.parse(cities);
    }else{
        return undefined;
    }
}

const saveCities = async (cities : MyCity[] ): Promise<void> =>{
    await AsyncStorage.setItem('@spartanWeather:Cities', JSON.stringify(cities));
}


export default {
    addCity : addCity,
    removeCity : removeCity,
    listCities : listCities,
    saveCities: saveCities,
    changeFavorite: changeFavorite,
}