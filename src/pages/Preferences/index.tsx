
import React from 'react';
import i18n from 'i18n-js';


import { 
    Container,
} from '../../styles/default';

import { 
    ContainerMenu,
    Title,
    ContainerOptions,
    Item,
    TextItem,

} from './style';

import {Header} from '../../components/Header';
import CheckBox from '../../components/CheckBox';
import { usePreferencesContext } from '../../contexts/PreferencesContext';
import { useMyCitiesContext } from '../../contexts/MyCitiesContext';




export function Preferences(){
    const preferencesContext = usePreferencesContext();
    const myCitiesContext = useMyCitiesContext();
    

    const changeDegree = (string : 'C' | 'F') =>{
        preferencesContext.setPreferences({...preferencesContext.preferences, degree:string});
        myCitiesContext.updateCities();
    }

    return(

    
        <Container>
            <Header goBack={true} title={i18n.t('preferences')}/>

            <ContainerMenu>
                <Title>{i18n.t('temperaturaDisplay')}</Title>
                <ContainerOptions>
                    <Item onPress={() =>{changeDegree('C')}}>
                        <CheckBox selected={preferencesContext.preferences?.degree == 'C'}/>
                        <TextItem>{i18n.t('celsiusDegree')}</TextItem>
                    </Item>

                    <Item onPress={() =>{changeDegree('F')}}>
                        <CheckBox selected={preferencesContext.preferences?.degree == 'F'}/>
                        <TextItem>{i18n.t('fahrenheitDegree')}</TextItem>
                    </Item>
                </ContainerOptions>
            </ContainerMenu>
        </Container>
    )
}