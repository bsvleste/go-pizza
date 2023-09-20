import React, { useState } from 'react'
import * as S from './styles'
import { Platform, ScrollView } from 'react-native';
import { ButtonBack } from '@components/ButtonBack';
import { RadioButton } from '@components/RadioButton';
import { PIZZAS_TYPE } from '@utils/pizzaType'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
export function Order() {
  const [size, setSize] = useState("")
  return (
    <S.Container behavior={Platform.OS === 'ios' ? "padding" : undefined}   >
      <S.ContentScroll >
        <S.Header>
          <ButtonBack
            onPress={() => { }}
            style={{ marginBottom: 108 }}
          />
        </S.Header>
        <S.Photo source={{ uri: "https://github.com/bsvleste.png" }} />
        <S.Form>
          <S.Title>4 Queijos</S.Title>
          <S.Label>Selecione um tamanho</S.Label>
          <S.Sizes>
            {
              PIZZAS_TYPE.map(type => (
                <RadioButton
                  key={type.id}
                  title={type.name}
                  onPress={() => setSize(type.id)}
                  selected={size === type.id}
                />
              ))
            }
          </S.Sizes>
          <S.FormRow>
            <S.InptGroups>
              <S.Label>Numero da mesa</S.Label>
              <Input keyboardType='numeric' />
            </S.InptGroups>
            <S.InptGroups>
              <S.Label>Quantidade</S.Label>
              <Input keyboardType='numeric' />
            </S.InptGroups>
          </S.FormRow>
          <S.Price>Valor de R$ 0.00</S.Price>
          <Button title='Confirmar Pedido' />
        </S.Form>
      </S.ContentScroll>
    </S.Container>
  );
}