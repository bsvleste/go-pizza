import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import * as S from './styles'
import { TypeProps } from './styles'

type Props = TextInputProps & {
  type: TypeProps
}
export function Input({ type = "primary", ...rest }: Props) {
  return (
    <S.ContainerTextInput
      type={type} {...rest}
    />

  )
}