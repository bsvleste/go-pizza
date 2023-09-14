import React from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as S from './styles'
import { useTheme } from 'styled-components'

type Props = TextInputProps & {
  onSearch: () => void
  onClear: () => void
}

export function Search({ onSearch, onClear, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <S.Container>
      <S.InputArea>
        <S.Input placeholder='Pesquisar' {...rest} />
        <S.ButtonClear onPress={onClear}>
          <Feather name="x" size={16} />
        </S.ButtonClear>
      </S.InputArea>
      <S.Button>
        <Feather name="search" size={16} color={COLORS.SHAPE} />
      </S.Button>
    </S.Container>
  );
}