import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StackRoutes from './stack.routes'
import StatusBar from '../components/StatusBar';
import { MyCitiesContextProvider } from '../contexts/MyCitiesContext';
import { PreferencesContextProvider } from '../contexts/PreferencesContext';

const Routes = () =>(
    
    <NavigationContainer>
        <PreferencesContextProvider>
            <MyCitiesContextProvider>
                <StatusBar/>
                <StackRoutes/>
            </MyCitiesContextProvider>
        </PreferencesContextProvider>
    </NavigationContainer>
)


export default Routes;


