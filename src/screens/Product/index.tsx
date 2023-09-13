import React, { useState } from 'react';
import { View, Platform, TouchableOpacity } from 'react-native'
import * as S from './styles'
import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import * as ImagePicker from 'expo-image-picker';
import { InputPrice } from '@components/InputPrice';

export function Product() {
  const [image, setImage] = useState("")
  async function handlerPickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      })
      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    }
  }
  return (
    <S.Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <S.Header>
        <ButtonBack />
        <S.Title>Cadastrar Pizza</S.Title>
        <TouchableOpacity>
          <S.DeleteLabel>Deletar</S.DeleteLabel>
        </TouchableOpacity>
      </S.Header>
      <S.Upload>
        <Photo uri={image} />
        <S.PickImageButton title='Carregar' type='SECONDARY' onPress={handlerPickerImage} />
      </S.Upload>
      <InputPrice size='P' />
      <InputPrice size='M' />
      <InputPrice size='G' />
    </S.Container>
  );
}