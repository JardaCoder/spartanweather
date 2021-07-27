import React, {} from 'react';
import {View} from 'react-native';
import moment from 'moment';


import { 
    Container,
    ContainerMaxMin,
    TopHalf,
    BottomHalf,
    Title,
    Degree,
    SmallText,
    Styles,
    WeatherIcon,

} from './style';
import colors from '../../styles/colors';
import {styles} from '../../styles/default';

import { Daily} from '../../models/Weather';
import utils from '../../services/utils/utils';
import OpenweatherService from '../../services/OpenweatherService';

interface CardProps{
    prediction: Daily;
    index: number;
}

export function ForecastCard({prediction, index} : CardProps){

    const predictionDay =  moment.unix(prediction.dt);

    const formatDateHoursBetween = () : string =>{
        return predictionDay.format('D [de] MMMM');
    }

    const getDayOfWeek = () : string =>{
        return predictionDay.format('dddd');
    }

    return(
            <Container style={[styles.shadow]} activeOpacity={0.8} disabled={ true}>

                <TopHalf>
                    <View>
                        <Title textTransform={'capitalize'}>{index == 0 ? 'Hoje' : index == 1 ? 'Amanhã' : getDayOfWeek()}</Title>
                        <SmallText color={colors.black} textTransform={'none'}>{formatDateHoursBetween()}</SmallText>
                    </View>
                    
                    <Degree>{utils.roundDegrees(prediction?.temp.day)}</Degree>
                  
                </TopHalf>

                <BottomHalf>
                
                    <View>
                        {prediction?.weather ?
                            <ContainerMaxMin>
                                <SmallText color={colors.orange}>{prediction?.weather[0]?.description}</SmallText>
                                <WeatherIcon source={{uri:OpenweatherService.getIconUrl(prediction?.weather[0].icon)}} resizeMode={'cover'}></WeatherIcon>
                            </ContainerMaxMin>
                        :
                            null
                        }
                        
                        <ContainerMaxMin>
                            <SmallText color={colors.black}>{utils.roundDegrees(prediction?.temp.min)}</SmallText>
                            <SmallText color={colors.black}>- {utils.roundDegrees(prediction?.temp.max)}</SmallText>
                        </ContainerMaxMin>
                    </View>
                    
                </BottomHalf>

            </Container>
        
    )
}

