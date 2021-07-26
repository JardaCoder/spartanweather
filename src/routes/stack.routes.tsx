import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import colors from '../styles/colors';

import { Cities } from '../pages/Cities';
import { SearchCities } from '../pages/SearchCities';
import { Forecast } from '../pages/Forecast';
import { Preload } from '../pages/Preload';

const stackRoutes = createStackNavigator();

const AppRoutes : React.FC = () =>(
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle:{
                backgroundColor:colors.white
            },
        }}
    >
        
        <stackRoutes.Screen
            name="Preload"
            component={Preload}
        />
        <stackRoutes.Screen
            name="Cities"
            component={Cities}
        />
        <stackRoutes.Screen
            name="SearchCities"
            component={SearchCities}
        />

        <stackRoutes.Screen
            name="Prediction"
            component={Forecast}
        />

    </stackRoutes.Navigator>
)


export default  AppRoutes;