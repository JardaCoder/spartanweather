
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {useRoute } from '@react-navigation/native';
import i18n from 'i18n-js';


import { 
    Container,
    RegularSubTitle,
    BoldTitle,
} from '../../styles/default';

import { 
    EmptyListContainer,
    CustomFlatList,
    ContainerItem

} from './style';

import {Header} from '../../components/Header';
import {ForecastCard} from '../../components/ForecastCard';
import { Load } from '../../components/Load/Load';
import { Daily } from '../../models/Weather';
import { MyCity } from '../../models/MyCity';
import OpenweatherService from '../../services/OpenweatherService';




export function Forecast(){
    const navigation = useNavigation();
    const route = useRoute<any>();
    const [citySelected, setCitySelected] = useState<MyCity>(route.params?.city as MyCity);
    const [weatherList, setWeatherList] = useState<Daily[]>([] as Daily[]);
    const [loading, setLoading] = useState(true);
    


    useEffect(() =>{

        if(citySelected){
            OpenweatherService.getListWeather(citySelected.latitude, citySelected.longitude ).then(result =>{
                if(result.data){
                    setWeatherList(result.data.daily) 
                }
            }).finally(()=>{
                setLoading(false);
            })
        }
    },[])
    return(

        loading ?
            <Load/>
        :
        <Container>
            <Header goBack={true} title={citySelected.cityName}/>

            <CustomFlatList
                data={weatherList}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={({item, index}) =>(
                    <ContainerItem>
                        <ForecastCard index={index} prediction={item as Daily}/>
                    </ContainerItem>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
                ListHeaderComponent={
                    weatherList.length > 0 ?
                        <RegularSubTitle>{i18n.t('nextPredictions')}</RegularSubTitle>
                    :
                        null
                }
                ListEmptyComponent={
                    <EmptyListContainer>
                        <BoldTitle>{i18n.t('errorPredictions')}</BoldTitle>
                    </EmptyListContainer>
                }   
            />

        </Container>
    )
}