import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';


const AppTab = createBottomTabNavigator();


export const AuthRoutes = () => {
    return(
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor:colors.green,
                inactiveTintColor:colors.heading,
                labelPosition:'beside-icon',
                style:{
                    paddingVertical: Platform.OS == 'android' ? 0 : 20,
                    height: 88
                }
            }}
        >

            {/* <AppTab.Screen 
                name="Nova planta"
                component={PlantSelect}
                options={{
                    tabBarIcon:(({size, color})=>(
                        <MaterialIcons 
                            name="add-circle-outline"
                            size={size}
                            color={color}
                        />

                    ))
                }}

            />

            <AppTab.Screen 
                name="Minhas plantas"
                component={MyPlants}
                options={{
                    tabBarIcon:(({size, color})=>(
                        <MaterialIcons 
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />

                    ))
                }}

            /> */}

        </AppTab.Navigator>
    )
}
