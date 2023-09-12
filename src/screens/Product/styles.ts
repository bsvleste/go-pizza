import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
 
export const Container = styled.KeyboardAvoidingView`
  ${({theme})=>css`
    flex: 1;
    background-color: ${theme.COLORS.BACKGROUND};
  `}
`
export const Header = styled(LinearGradient).attrs(({theme})=>({
  colors:theme.COLORS.GRADIENT,
  start:{x:1,y:1},
  end:{x:0.2,y:0.2}
}))`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: ${getStatusBarHeight() + 33}px 20px 24px;
`

export const Title = styled.Text`
  ${({theme})=>css`
    font-size: 24px;
    font-family:${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`

export const DeleteLabel = styled.Text`
  ${({theme})=>css`
    font-size: 14px;
    font-family:${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
`