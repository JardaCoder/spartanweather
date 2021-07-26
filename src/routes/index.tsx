import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StackRoutes from './stack.routes'
import StatusBar from '../components/StatusBar';
import { MyCitiesContextProvider } from '../contexts/MyCitiesContext';

const Routes = () =>(
    
    <NavigationContainer>
        <MyCitiesContextProvider>
            <StatusBar/>
            <StackRoutes/>
        </MyCitiesContextProvider>
    </NavigationContainer>
)


export default Routes;


