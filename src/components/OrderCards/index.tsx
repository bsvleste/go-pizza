import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import * as S from './styles'
import { StatusTypeProps } from './styles'

export type OrderProps = {
  id: string
  pizza: string
  image: string
  table_number: string
  quantity: number
  status: StatusTypeProps
}
type Props = TouchableOpacityProps & {
  index: number
  data: OrderProps
}
export function OrderCards({ index, data, ...rest }: Props) {
  return (
    <S.Container index={index} {...rest}>
      <S.Image source={{ uri: data.image }} />
      <S.Name>{data.pizza}</S.Name>
      <S.Description>Mesa {data.table_number} - Quantidade:{data.quantity}</S.Description>
      <S.StatusContainer status={data.status}>
        <S.StatusLabel status={data.status}>
          {data.status}
        </S.StatusLabel>
      </S.StatusContainer>
    </S.Container>
  );
}