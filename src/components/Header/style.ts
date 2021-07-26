import styled from 'styled-components/native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';


export const HeaderContainer = styled.View`
    width: 100%;
    min-height: 70px;
    flex-direction: row;
    align-items: center;
    padding-right:20px ;
    padding-left:20px ;
    background-color:${colors.azure};
`

export const Text = styled.Text`
    color: ${colors.white};
    font-size: 20px;
    font-family:${fonts.regular};
`

export const GoBack = styled.TouchableOpacity`
    min-height: 35px;
    min-width: 35px;
    margin-right: 10px;
`

export const Search = styled(GoBack)`
    position: absolute;
    right: 10px;
`