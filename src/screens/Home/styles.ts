import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled, { css } from "styled-components/native";

  export const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=>theme.COLORS.BACKGROUND};
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
export const Greeting = styled.View`
  flex-direction: row;
  align-items: center;
`  
export const GreetinEmoji = styled.Text`
    font-size:32px;
    margin-right: 12px;
`

export const GreetingText = styled.Text`
  font-size: 20px;
  ${({theme})=>css`
    font-family: ${theme.FONTS.TITLE};
    color:${theme.COLORS.TITLE};
  `}
`
