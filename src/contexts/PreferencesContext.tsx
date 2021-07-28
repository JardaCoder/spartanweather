import React, {  Dispatch, SetStateAction, useEffect } from "react";
import {createContext, useContext, useState} from 'react'
import { Preferences } from "../models/Preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OpenweatherService from "../services/OpenweatherService";



interface PreferencesContextInterface{
    preferences: Preferences;
    setPreferences:Dispatch<SetStateAction<Preferences>>;
    getPreferences:  () => Promise<void>;
}


export const PreferencesContext = createContext<PreferencesContextInterface>({} as PreferencesContextInterface);

export const PreferencesContextProvider = ({ children} : any) => {
   const [preferences, setPreferences] = useState<Preferences>({language:'pt-BR', degree:'F'});


    const getPreferences = async () =>{
        var preferences = await AsyncStorage.getItem('@spartanWeather:preferences');
       
        if(preferences){
            var preferencesObject : Preferences= JSON.parse(preferences) as Preferences;
            
            setPreferences({
                language: preferencesObject.language ?  preferencesObject.language : 'pt-BR',
                degree: preferencesObject.degree ?  preferencesObject.degree : 'C',
            })
        }
    }


   
   useEffect(() =>{
        AsyncStorage.setItem('@spartanWeather:preferences', JSON.stringify(preferences));
        OpenweatherService.refreshUnits(preferences.degree);
   },[preferences])
  

    return (
        <PreferencesContext.Provider value={{preferences, setPreferences, getPreferences}}>
             {children}
        </PreferencesContext.Provider>
    );
}

export const usePreferencesContext = () => useContext(PreferencesContext);