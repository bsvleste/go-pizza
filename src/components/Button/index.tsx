import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { TouchableOpacityProps } from 'react-native'
import * as S from './styles'

type Props = TouchableOpacityProps & {
  title: string
  type?: S.ButtonTypesStyleProps
  isLoading?: boolean;
}
export function Button({
  title,
  type = "PRIMARY",
  isLoading = false,
  ...rest
}: Props) {
  return (
    <S.ContainerButton type={type} disabled={isLoading} {...rest}>
      {isLoading ? <S.Load /> : <S.Title>{title}</S.Title>}
    </S.ContainerButton>
  )
}