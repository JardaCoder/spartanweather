
import React, {useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { ActivityIndicator, Alert } from 'react-native';
import _ from 'lodash';
import i18n from 'i18n-js';

import { 
    Container,
    TextIput,
    BoldTitle, 

} from '../../styles/default';
import { 
    EmptyListContainer,
    CustomFlatList,
    ContainerItem,
    ContainerLoading
} from './style';
import colors from '../../styles/colors';

import {Header} from '../../components/Header';
import {Card} from '../../components/Card';
import { useMyCitiesContext } from '../../contexts/MyCitiesContext';
import {Prediction } from '../../models/GooglePlaces';
import { MyCity } from '../../models/MyCity';
import StorageService from '../../services/StorageService';
import PlacesService from '../../services/PlacesService';




export function SearchCities(){

    const navigation = useNavigation();
    const myCitiesContext = useMyCitiesContext();
    const [cities, setCities] = useState<Prediction[]>([]);
    const inputRef = useRef(null);
    const[inputSearch, setInputSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const searchCities = (text: string) => {
        setLoading(true);

        PlacesService.searchPlaces(text).then(result => {
            if(result.data.predictions){
                setCities(result.data?.predictions)    
            }
        }).finally(() =>{
            setLoading(false);
        })

    }

    const addCity = (city : Prediction) => {

        var myCity = predictionToMyCity(city);

        PlacesService.getPlaceDetail(myCity.placeId).then(result=>{
            if(result.data){
                myCity.latitude = result.data.result.geometry.location.lat;
                myCity.longitude = result.data.result.geometry.location.lng;

                StorageService.addCity(myCity).then(result => {
                    Alert.alert(i18n.t('success'), i18n.t('alertSucessAddCity'));
                    myCitiesContext.updateCities();
                }).catch((error) =>{
                    Alert.alert(i18n.t('ops'), i18n.t('errorAddCity'));
                });
            }
        }).catch((error) =>{
            Alert.alert(i18n.t('ops'), i18n.t('errorAddCity'));
        })

       
    }

    const predictionToMyCity = (prediction : Prediction) : MyCity =>{
        var myCity = {} as MyCity;

        myCity.placeId = prediction.place_id;
        myCity.cityName = prediction.structured_formatting.main_text;
        myCity.cityDescription = prediction.structured_formatting.secondary_text;

        return myCity;
    }

    const searchDebounce =  _.debounce((text : string) => searchCities(text), 600)

    const onChangeSearchText = (text : string) => {
        
        if(text && text.length > 2){
            searchDebounce(text);
        }
        setInputSearch(text);
    }
    
    return(
        <Container>
            <Header goBack={true} title={i18n.t('addCities')}/>

            <CustomFlatList
                data={cities}
                keyExtractor={(item, index) => index?.toString()}
                keyboardShouldPersistTaps={'handled'}
                ListHeaderComponent={
                    <ContainerItem>
                         <TextIput
                            placeholder={i18n.t('search')}
                            placeholderTextColor={colors.gray}
                            onChangeText={onChangeSearchText}
                            ref={inputRef}
                         />
                         {
                             loading &&(
                                 <ContainerLoading>
                                    <ActivityIndicator color={colors.azure} size="small"></ActivityIndicator>
                                </ContainerLoading>
                             )  
                         }
                    </ContainerItem>
                }
                renderItem={({item}) =>(
                    <ContainerItem>
                        <Card type={'search'} myCity={predictionToMyCity(item as Prediction)} addPress={() => addCity(item as Prediction)}></Card>
                    </ContainerItem>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
                ListEmptyComponent={
                    loading ? 
                        null
                    :
                        <EmptyListContainer>
                            <BoldTitle>{i18n.t(inputSearch  &&  inputSearch.length > 2 && cities?.length < 1 ?  'emptyResult' : 'emptyListSearch')}</BoldTitle>
                        </EmptyListContainer>
                }   
            />

        </Container>
    )
}