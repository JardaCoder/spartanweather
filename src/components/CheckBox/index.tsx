import React from 'react';

import {
 CheckBoxContainer,
 Fill
} from './styles';

interface CheckBoxProps{
  selected?: boolean;
  onPress?: () => void;
}


export default function CheckBox ({ selected, onPress } : CheckBoxProps) {
  
  return (
    <CheckBoxContainer onPress={onPress} disabled={onPress ? false : true}>
      {selected &&(
         <Fill>
         </Fill>
      )}
    </CheckBoxContainer>
  )
}

