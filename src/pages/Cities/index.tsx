
import React, { useEffect, useState } from 'react';
import { Alert} from 'react-native';
import { useNavigation } from '@react-navigation/core';
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
import {Card}  from '../../components/Card';
import { Load } from '../../components/Load/Load';
import { MyCity } from '../../models/MyCity';
import { useMyCitiesContext } from '../../contexts/MyCitiesContext';
import StorageService from '../../services/StorageService';


export function Cities(){

    const navigation = useNavigation();
    const myCitiesContext = useMyCitiesContext();
    const [loading, setLoading] = useState(true);


    const searchCities = () => {
        navigation.navigate('SearchCities');
    }

    const cardPress = (city : MyCity) =>{
        navigation.navigate('Prediction', {city: city});
    }

    const favoritePress = (city : MyCity) =>{
        
        if(city.placeId){
            StorageService.changeFavorite(city.placeId).then(result =>{
                refreshList();
            })
        }
    }

    const removePress = async (city : MyCity) =>{

        await StorageService.removeCity(city).then(result => {
            Alert.alert(i18n.t('success'), i18n.t('alertSuccessRemove'));
            myCitiesContext.setMyCities([]);
            refreshList();
        }).catch(error =>{
            Alert.alert(i18n.t('ops'), i18n.t('alertErrorRemove'));
        });
        
    }

    const refreshList = () =>{
        StorageService.listCities().then(result => {
            setLoading(false);
            if(result)
                myCitiesContext.setMyCities(result);
        });
    }

    const sortFavorites = (a : MyCity, b : MyCity) =>{
        if(b.favorito){
            return 1;
        }

        if(a.favorito){
            return -1;
        }

        return 0;
    }

    useEffect(() =>{
        refreshList()
    },[])

    return(

        loading ?
            <Load/>
        :
        <Container>
            <Header pressSearch={() => searchCities()} title={i18n.t('cities')}/>

            <CustomFlatList

                data={myCitiesContext?.myCities.sort(sortFavorites)}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={({item}) =>(
                    <ContainerItem>
                        <Card 
                            type={'city'}
                            onPress={() => cardPress(item as MyCity)} 
                            myCity={item as MyCity} 
                            removePress={() => removePress(item as MyCity)}
                            favoritePress={() => favoritePress(item as MyCity)}
                        />
                    </ContainerItem>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
                ListEmptyComponent={
                    <EmptyListContainer>
                        <BoldTitle>{i18n.t('emptyListTitle')}</BoldTitle>
                        <RegularSubTitle>{i18n.t('emptyListSubTitle')}</RegularSubTitle>
                    </EmptyListContainer>
                }   
            />

        </Container>
    )
}