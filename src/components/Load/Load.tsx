import React from 'react';
import LottieView from 'lottie-react-native';
import {
    LoadContainer,
    Styles
} from './style'

import loadAnimation from '../../assets/load.json';


export function Load(){

    return(
        <LoadContainer>
            <LottieView
            source={loadAnimation}
            autoPlay
            loop
            style={Styles.animation}
            />
        </LoadContainer>
    )
}