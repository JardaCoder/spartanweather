import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {View, Animated } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import i18n from 'i18n-js';

import colors from '../../styles/colors';
import { 
    Container,
    ContainerMaxMin,
    TopHalf,
    BottomHalf,
    CityName,
    Degree,
    SmallText,
    Styles,
    WeatherIcon,
    FavoriteIcon,
    AddIcon

} from './style';
import {styles} from '../../styles/default';

import { WeatherResponse } from '../../models/Weather';
import { MyCity } from '../../models/MyCity';
import utils from '../../services/utils/utils';
import OpenweatherService from '../../services/OpenweatherService';
import { usePreferencesContext } from '../../contexts/PreferencesContext';



interface CardProps{
    type: 'city' | 'search';
    onPress?: () => void;
    addPress?: () => void;
    removePress?:() => void;
    favoritePress?:() => void;
    myCity: MyCity;
}

export function Card({type, onPress, addPress, removePress, favoritePress, myCity} : CardProps){

    const [weatherBase, setWeatherBase] = useState<WeatherResponse>({} as WeatherResponse);
    const preferencesContext = usePreferencesContext();

    useEffect(() =>{
        if(type == 'city'){
            OpenweatherService.getWeather(myCity.latitude, myCity.longitude).then(result =>{
                setWeatherBase(result.data);
               
            })
        }      
    }, [])

    return(

        <Swipeable
            containerStyle={Styles.swipeable}
            enabled={removePress ? true : false}
            overshootRight={false}
            renderRightActions={() =>(
                <Animated.View>
                    <View>
                        <RectButton
                            style={Styles.buttonRemove}
                            onPress={removePress}
                        >
                        <MaterialIcons name="delete" size={32} color={colors.white}>

                        </MaterialIcons>
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <Container style={[styles.shadow]} activeOpacity={0.8} onPress={onPress} disabled={onPress ? false : true}>

                <TopHalf>
                    <View>
                        <CityName>{myCity?.cityName}</CityName>
                        <SmallText color={colors.black}>{myCity?.cityDescription}</SmallText>
                    </View>
                    {
                        (type == 'city') &&(
                            <Degree>{utils.roundDegrees(weatherBase.main?.temp, preferencesContext.preferences.degree)}</Degree>
                        )
                    }
                
                </TopHalf>

                <BottomHalf>
                    {   
                        (type == 'city') &&(
                            <View>
                                {weatherBase?.weather ?
                                    <ContainerMaxMin>
                                        <SmallText color={colors.orange}>{weatherBase?.weather[0]?.description}</SmallText>
                                        <WeatherIcon source={{uri:OpenweatherService.getIconUrl(weatherBase?.weather[0].icon)}} resizeMode={'cover'}></WeatherIcon>
                                    </ContainerMaxMin>
                                :
                                    null
                                }
                                
                                <ContainerMaxMin>
                                    <SmallText color={colors.black}>{utils.roundDegrees(weatherBase.main?.temp_min, preferencesContext.preferences.degree)}</SmallText>
                                    <SmallText color={colors.black}>- {utils.roundDegrees(weatherBase.main?.temp_max, preferencesContext.preferences.degree)}</SmallText>
                                </ContainerMaxMin>
                            </View>
                        )
                    }

                    {
                        type == 'search' &&(
                            <AddIcon onPress={addPress}> 
                                <SmallText color={colors.azure} textTransform={'uppercase'} >{i18n.t('add')}</SmallText>
                            </AddIcon>
                        )
                    }

                    {
                        type == 'city' &&(
                            <FavoriteIcon  onPress={favoritePress}>
                                
                                {myCity?.favorito ?
                                    <MaterialIcons name={'favorite'} size={30} color={colors.red}/>
                                    :
                                    <MaterialIcons name={'favorite-border'} size={30} color={colors.red}/>
                                }
                                
                            </FavoriteIcon>
                        )
                    }

                </BottomHalf>

            </Container>
        </Swipeable>
        
    )
}

