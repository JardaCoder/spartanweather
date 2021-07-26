import { useNavigation } from "@react-navigation/native";
import React, {  Dispatch, SetStateAction } from "react";
import {createContext, useReducer, useContext, useState} from 'react'
import { MyCity } from "../models/MyCity";
import { Prediction } from "../models/PlacesInterface";
import StorageService from "../services/StorageService";



interface MyCitiesContextInterface{
    myCities: MyCity[];
    setMyCities:Dispatch<SetStateAction<MyCity[]>>;
    updateCities:  () => Promise<void>;
}


export const MyCitiesContext = createContext<MyCitiesContextInterface>({} as MyCitiesContextInterface);

export const MyCitiesContextProvider = ({ children} : any) => {
   const [myCities, setMyCities] = useState<MyCity[]>([]);


   const updateCities = async () => {
        StorageService.listCities().then(result => {
            if(result){
                setMyCities(result);
            }
        });
   }
   
  

    return (
        <MyCitiesContext.Provider value={{myCities, setMyCities, updateCities}}>
             {children}
        </MyCitiesContext.Provider>
    );
}

export const useMyCitiesContext = () => useContext(MyCitiesContext);