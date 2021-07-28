import styled from 'styled-components/native';
import colors from '../../styles/colors';



export const CheckBoxContainer = styled.TouchableOpacity`
    width:20px;
    height:20px;
    background-color:#fff;
    border-width:2px;
    border-radius:2px;
    border-color:${colors.azure};
    padding:2px
`;

export const Fill = styled.View`
    background-color:${colors.azure};
    flex:1
`;


