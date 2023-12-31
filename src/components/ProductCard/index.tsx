import React, { useEffect } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as S from './styles'

import { useTheme } from 'styled-components'
export type ProductProps = {
  id: string;
  photo_url: string
  name: string
  description: string
}

type Props = TouchableOpacityProps & {
  data: ProductProps
}

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme()
  return (
    <S.Container>
      <S.Content {...rest}>
        <S.Image source={{ uri: data.photo_url }} />
        <S.Details>
          <S.Identification>
            <S.Name>{data.name}</S.Name>
            <Feather color={COLORS.SHAPE} size={18} name="chevrons-right" />
          </S.Identification>
          <S.Description>{data.description}</S.Description>
        </S.Details>
      </S.Content>
      <S.Line />
    </S.Container>
  );
}