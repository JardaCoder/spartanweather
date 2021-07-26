import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

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

} from './style';
import {styles} from '../../styles/default';
import { TouchableOpacity, View, Animated } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import OpenweatherService from '../../services/OpenweatherService';
import { WeatherResponse } from '../../models/Weather';
import utils from '../../services/utils/utils';
import i18n from 'i18n-js';
import { MyCity } from '../../models/MyCity';


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
    const [iconUrl, setIconUrl] = useState('');

    useEffect(() =>{
        if(type == 'city'){
            OpenweatherService.getWeather(myCity.latitude, myCity.longitude).then(result =>{
                setWeatherBase(result.data);
            })
        }      
    }, [])

    return(

        <Swipeable
            containerStyle={{paddingHorizontal:15, paddingVertical:10, width:'100%', backgroundColor:'transparent'}}
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
                            <Degree>{utils.roundDegrees(weatherBase.main?.temp)}</Degree>
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
                                    <SmallText color={colors.black}>{utils.roundDegrees(weatherBase.main?.temp_min)}</SmallText>
                                    <SmallText color={colors.black}>- {utils.roundDegrees(weatherBase.main?.temp_max)}</SmallText>
                                </ContainerMaxMin>
                            </View>
                        )
                    }

                    {
                        type == 'search' &&(
                            <TouchableOpacity onPress={addPress}> 
                                <SmallText color={colors.azure} textTransform={'uppercase'} >{i18n.t('add')}</SmallText>
                            </TouchableOpacity>
                        )
                    }

                    {
                        type == 'city' &&(
                            <TouchableOpacity onPress={favoritePress}>
                                
                                {myCity?.favorito ?
                                    <MaterialIcons name={'favorite'} size={30} color={colors.red}/>
                                    :
                                    <MaterialIcons name={'favorite-border'} size={30} color={colors.red}/>
                                }
                                
                            </TouchableOpacity>
                        )
                    }

                </BottomHalf>

            </Container>
        </Swipeable>
        
    )
}

