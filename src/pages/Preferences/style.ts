import styled from 'styled-components/native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';


export const ContainerMenu = styled.View`
    width: 90%;
    margin-top: 20px;
    border-color:${colors.gray};
    border-bottom-width:1px;
    padding-vertical:20px;

`

export const Title = styled.Text`
    font-size: 20px;
    font-family: ${fonts.bold};
    text-align: left;

`

export const ContainerOptions = styled.View`
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-top:10px;
`
export const Item = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top:20px;
`
export const TextItem = styled.Text`
    font-size: 18px;
    font-family: ${fonts.regular};
    margin-left:10px
`


