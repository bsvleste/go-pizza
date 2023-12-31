import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { Button } from "@components/Button";

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
  
    padding: ${getStatusBarHeight() + 33}px 20px 58px;
  `
export const Greeting = styled.View`
  flex-direction: row;
  align-items: center;
`  
export const GreetinEmoji = styled.Image`
    width:32px;
    height:32px;
    margin-right: 12px;
`

export const GreetingText = styled.Text`
  font-size: 20px;
  ${({theme})=>css`
    font-family: ${theme.FONTS.TITLE};
    color:${theme.COLORS.TITLE};
  `}
`
export const MenuHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 24px 0;
  padding-bottom: 22px;
  border-bottom-width:1px;
  border-bottom-color: ${({theme})=>theme.COLORS.SHAPE};
`
export const MenuTitle = styled.Text`
  font-size: 20px;
  line-height:20px;
  ${({theme})=>css`
    font-family:${theme.FONTS.TEXT} ;
    color:${theme.COLORS.SECONDARY_900};
  `}
`
export const MenuItemsNumber = styled.Text`
  font-size: 14px;
  ${({theme})=>css`
    font-family:${theme.FONTS.TEXT} ;
    color:${theme.COLORS.SECONDARY_900};
  `}
`
export const NewProduct= styled(Button)`
  margin: 0 24px;
  margin-bottom: ${getBottomSpace() +12}px; 
`