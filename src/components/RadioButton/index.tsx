import React, { useState } from 'react'
import * as S from './styles'
import { TouchableOpacityProps } from 'react-native'
type Props = TouchableOpacityProps & S.RadioButtonProps & {
  title: string
}
export function RadioButton({ title, selected = false, ...rest }: Props) {

  return (
    <S.Container selected={selected} {...rest}>
      <S.Radio>
        {selected &&
          <S.Selected />
        }
      </S.Radio>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}