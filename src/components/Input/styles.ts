import styled, { css } from "styled-components/native";
import {TextInput} from 'react-native'
export type TypeProps = "primary"| "secondary";
type Props ={
  type:TypeProps;
}
export const ContainerTextInput = styled(TextInput).attrs<Props>(({theme,type})=>({
    placeholderTextColor: type === 'primary' ? theme.COLORS.SECONDARY_900 : theme.COLORS.PRIMARY_50
}))<Props>`
  ${({theme,type})=>css`
    width: 100%;  
    background-color:transparent;
    color: ${theme.COLORS.TITLE};
    border-radius: 8px;
    font-size:14px;
    padding: 16px 0;
    margin-bottom: 16px;
    padding-left:20px ;
    font-family:${theme.FONTS.TEXT};
    border: 1px solid ${theme.COLORS.SHAPE};
    color: ${type === 'primary'? theme.COLORS.SECONDARY_900 : theme.COLORS.TITLE};
  `} 
`