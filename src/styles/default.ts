import styled from 'styled-components/native';
import colors from './colors';
import fonts from './fonts';
import { StyleSheet } from 'react-native';

export const Container = styled.SafeAreaView`
    flex: 1;
    width: 100%;
    align-items: center;
    background-color: ${colors.background};
`

export const TextIput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: ${colors.azure};
  width: 90%;
  font-size: 18px;
  padding: 10px;
`

export const BoldTitle = styled.Text`
    font-size: 20px;
    font-family: ${fonts.bold};
    text-align: center;
`

export const RegularSubTitle = styled.Text`
    font-size: 16px;
    font-family: ${fonts.regular};
    text-align: center;
    margin-top:20px
`


export const styles = StyleSheet.create({
    shadow:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
});