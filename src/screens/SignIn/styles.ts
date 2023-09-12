import styled, { css } from "styled-components/native";
import {LinearGradient} from 'expo-linear-gradient'
import {getBottomSpace} from 'react-native-iphone-x-helper'
type PropImagem={
  tamanho:number
}
export const ContainerSignIn = styled(LinearGradient).attrs(({theme})=>({
  colors:theme.COLORS.GRADIENT,
  start:{x:1,y:1},
  end:{x:0.2,y:0.2}
}))`
  flex:1;
  justify-content: center;
  padding-bottom: 16px;  
`
export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator:false,
  contentContainerStyle:{
    paddingBottom:getBottomSpace() + 48
  }
})`
  width:100%;
  padding: 0 32px;

`
export const Brand = styled.Image.attrs({
  resizeMode:'contain',
})`
    height: 340px;
    margin-top: 64px;
    margin-bottom: 32px;
  `

export const Title = styled.Text`
  ${({theme})=>css`
    font-size: 32px;
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
    margin-bottom: 24px;
    align-self: flex-start;
  `}
`
export const LinkForgotPassword = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom:2px;  
  margin-top:16px;
`
export const ForgotPasswordLabel = styled.Text`
  ${({theme})=>css`
    font-size: 14px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
` 