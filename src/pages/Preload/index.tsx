import React, {useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { useMyCitiesContext } from "../../contexts/MyCitiesContext";
import colors from "../../styles/colors";
import { usePreferencesContext } from "../../contexts/PreferencesContext";


export function Preload(){

    const navigation = useNavigation();
    const myCitiesContext = useMyCitiesContext();
    const preferencesContext = usePreferencesContext();

    useEffect(() =>{
        myCitiesContext.updateCities().then(result =>{
            
        }).finally(() =>{
            navigation.reset({
                routes: [{ name:'Cities'}],
              });
        })
        preferencesContext.getPreferences();
    },[])

    return(
        <SafeAreaView style={{flex:1, backgroundColor: colors.azure}}>

        </SafeAreaView>
    )
}