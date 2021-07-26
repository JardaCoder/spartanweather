import React, { useEffect } from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold

} from '@expo-google-fonts/roboto';

import AppLoading from 'expo-app-loading';
import Routes  from './src/routes';

import * as Notification from 'expo-notifications';
import i18n from 'i18n-js';
import { ptBr } from './src/services/utils/translation';
import * as Localization from 'expo-localization';
import moment from 'moment';



export default function App(){

  i18n.translations = {
    'pt-BR': ptBr,    
  };

  i18n.locale = 'pt-BR'

  const [fontsLoaded] = useFonts({
      Roboto_400Regular,
      Roboto_700Bold
  })

  moment.updateLocale('pt-br', require('moment/locale/pt-br'));


  return(
    !fontsLoaded ?
      <AppLoading/> 
    :
      <Routes />
  )
}


const style = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }


})