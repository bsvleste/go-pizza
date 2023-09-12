import React from 'react';
import { View, Platform, TouchableOpacity } from 'react-native'
import * as S from './styles'
import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
export function Product() {
  return (
    <S.Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <S.Header>
        <ButtonBack />
        <S.Title>Cadastrar Pizza</S.Title>
        <TouchableOpacity>
          <S.DeleteLabel>Deletar</S.DeleteLabel>
        </TouchableOpacity>
      </S.Header>
      <View>
        <Photo uri="https://github.com/bsvleste.png" />
      </View>
    </S.Container>
  );
}