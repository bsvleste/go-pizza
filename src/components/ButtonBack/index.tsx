import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as S from './styles'
import { useTheme } from 'styled-components';
export function ButtonBack({ ...rest }: TouchableOpacityProps) {
  const { COLORS } = useTheme();
  return (
    <S.Container {...rest}>
      <MaterialIcons name="chevron-left" size={32} color={COLORS.TITLE} />
    </S.Container>
  );
}