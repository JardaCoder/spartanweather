import React, { } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { 
    HeaderContainer,
    GoBack,
    Search, 
    Text 
} from './style';
import colors from '../../styles/colors';

interface HeaderProps {
    pressSearch?: () => void;
    goBack?: boolean;
    title?: string
}

export function Header ({pressSearch, goBack, title = ''} : HeaderProps){

    const navigation = useNavigation();


    return(
        <HeaderContainer>

            {goBack && (
                <GoBack onPress={() => navigation.goBack()}>
                   <MaterialIcons name="west" color={colors.white} size={32} />
               </GoBack>
            )}
            <Text>{title}</Text>

            {pressSearch &&(
                <Search onPress={pressSearch}>
                    <MaterialIcons name="search" color={colors.white} size={32} />
                </Search>
            )}
           
        </HeaderContainer>
        
    )
}