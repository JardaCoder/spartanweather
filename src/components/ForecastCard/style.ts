import styled from 'styled-components/native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {StyleSheet } from 'react-native';


export const Container = styled.TouchableOpacity`
    width: 100%;
    min-height: 70px;
    height: 160px;
    background-color:${colors.white};
    margin-top: 10px;
    border-radius: 5px;
    padding: 20px;
`

export const ContainerMaxMin = styled.View`
   flex-direction: row;
`

export const TopHalf = styled.View`
    height: 50%;
    flex-direction: row;
    justify-content: space-between;
`

export const BottomHalf = styled.View`
    height: 50%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
 
`
export const Title = styled.Text<{textTransform?:string }>`
    color: ${colors.black};
    font-size: 24px;
    text-transform:${p => p.textTransform ? p.textTransform : 'none'};
    font-family:${fonts.regular};
`
export const Degree = styled(Title)`
    font-size: 34px;
    color: ${colors.orange};
`

export const SmallText = styled.Text<{color:string, textTransform?:string }>`
    font-size: 14px;
    color:${p => p.color};
    font-family:${fonts.regular};
    text-transform:${p => p.textTransform ? p.textTransform : 'capitalize'};
    padding: 3px
`

export const WeatherIcon = styled.Image`
    width: 35px;
    height: 20px;
    
`

export const Styles = StyleSheet.create({
    buttonRemove:{
        width:100,
        height: 160,
        backgroundColor: colors.red,
        marginTop:15,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        right:20,
        paddingLeft:15
    }

})