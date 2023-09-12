import {RectButton} from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import{TouchableOpacity} from 'react-native'

export type ButtonTypesStyleProps= "PRIMARY" | "SECONDARY"

type ButtonProps={
  type:ButtonTypesStyleProps
}
export const ContainerButton = styled(TouchableOpacity)<ButtonProps>`
  
    flex:1;
    min-height: 56px;
    max-height: 56px;
    background-color:${({theme,type})=> type === "PRIMARY"? theme.COLORS.SUCCESS_900: theme.COLORS.PRIMARY_800} ;
    justify-content:center;
    align-items: center;
    border-radius: 12px;
`;
export const Title = styled.Text`
  ${({theme})=>css`
    font-size: 14px;
    font-family: ${theme.FONTS.TITLE};
    color:${theme.COLORS.BACKGROUND};
  `}
`
export const Load = styled.ActivityIndicator.attrs(({theme})=>({
  color:theme.COLORS.TITLE
}))``;