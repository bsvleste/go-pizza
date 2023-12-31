import React, { ReactNode } from 'react'
import * as S from './styles'
type ContainerProps = {
  children: ReactNode

}
export function Container({ children }: ContainerProps) {
  return (
    <S.Container >
      {children}
    </S.Container>
  )
}