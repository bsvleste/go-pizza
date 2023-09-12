import styled, { css } from "styled-components/native";

export const HeaderHome = styled.View`
  ${({theme})=>css`
      flex-direction:row;
      background-color: ${theme.COLORS.PRIMARY_900};
      height: 149px;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      left:0;
      top:0;
      padding: 24px;
      `}
`
export const WrapperTitle = styled.View`
  ${({theme})=>css`
  flex-direction:row ;
  color: ${theme.COLORS.SHAPE};
  `}
`
export const SmalleTitle = styled.Text`
  font-size:24px;   
`
export const Title = styled.Text`
${({theme})=>css`
  color:${theme.COLORS.SHAPE};
  font-size:24px;
  font-family:${theme.FONTS.TITLE};
  margin-left: 8px;
  `}
`
export const WrapperSearch = styled.View`
  margin-top: 100px;
  justify-content:space-around;
  flex-direction:row;
  
`

export const SearchPizza = styled.TextInput.attrs({
  placeholderTextColor:"#572D31",
})`
  ${({theme})=>css`
    width: 100%;
    height: 56px;
    border-radius: 8px;
    padding: 20px;
    background-color:${theme.COLORS.TITLE};
  `}
`

export const ButtonSearch = styled.TouchableOpacity.attrs({
  activeOpacity:0.8,
})`
  ${({theme})=>css`
    background-color:${theme.COLORS.SUCCESS_900};
    width:56px;
    height: 56px;
    border-radius: 8px;
    justify-content: center;
    align-items:center;
    margin-left:12px;
    `}
`